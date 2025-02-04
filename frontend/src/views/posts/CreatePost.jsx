import { useFormik } from "formik";
import { useCallback, useMemo, useRef, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useCreatePostMutation } from "../../store/api/postsApiSlice";
import { Image, Loader2, X } from "lucide-react";
import { useCheckQuery } from "../../store/api/authApiSlice";
import Emojis from "./Emojis";
import { Calendar, Video } from "lucide-react";
import LazyImage from "../../components/LazyImage";
import imageCompression from "browser-image-compression";
import { validationCreatePost } from "../../utils/validation";
export default function CreatePost() {
  const [visiable, setVisiable] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);
  const navigate = useNavigate();
  const [createPost, { isLoading }] = useCreatePostMutation();
  const { data: user } = useCheckQuery(undefined, {
    refetchOnMountOrArgChange: false,
  });
  const userId = useMemo(() => user?._id, [user]);

  const handleEmojiClick = (emojiObject) => {
    formik.setFieldValue("content", formik.values.content + emojiObject.emoji);
  };

  const formik = useFormik({
    initialValues: { content: "", image: null },
    validationSchema: validationCreatePost,
    onSubmit: async (values, { resetForm }) => {
      if (!userId) return toast.error("User not authenticated");
      values.image = imagePreview;
      try {
        await createPost({ ...values, author: userId }).unwrap();
        toast.success("Post created successfully!");
        resetForm();
        navigate("/");
        removeImage();
      } catch (error) {
        console.error(error);
        toast.error(error?.data?.message || "An error occurred");
      }
    },
  });
  const handleImageChange = useCallback(async (e) => {
    const file = e.target.files[0];
    if (
      file &&
      file.type.startsWith("image/") &&
      file.size <= 2 * 1024 * 1024
    ) {
      try {
        const options = {
          maxSizeMB: 1,
          maxWidthOrHeight: 800,
          useWebWorker: true,
        };
        const compressedFile = await imageCompression(file, options);
        const reader = new FileReader();
        reader.onloadend = () => setImagePreview(reader.result);
        reader.readAsDataURL(compressedFile);
      } catch (error) {
        toast.error("Failed to compress image");
      }
    } else {
      toast.error("Invalid file. Please select an image under 2MB.");
    }
  }, []);

  const removeImage = () => {
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };
  return (
    <>
      <div className="rounded-lg shadow p-4 sm:w-full lg:w-3/4">
        <form onSubmit={formik.handleSubmit}>
          <div className="flex space-x-4">
            <LazyImage
              src={user.avatar}
              alt="Profile"
              className="h-10 w-10 rounded-full object-cover"
            />
            <div className="relative w-full">
              <textarea
                onFocus={() => setVisiable(true)}
                placeholder={`What's on your mind, alaa?`}
                id="content"
                name="content"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.content}
                className="w-full rounded-md outline-none p-4 text-left text-gray-500 bg-base-300"
              ></textarea>
              <Emojis
                className={"absolute bottom-3 right-3"}
                handleEmojiClick={handleEmojiClick}
              />
            </div>
          </div>
          {imagePreview && (
            <div className="relative">
              <img
                src={imagePreview}
                alt="Preview"
                className="w-80 h-80 object-fill rounded-lg border border-white"
              />
              <button
                onClick={removeImage}
                className="absolute top-0 left-0 flex justify-center items-center w-10 h-10 bg-gray-300 rounded-full"
              >
                <X className="size-5 text-black" />
              </button>
            </div>
          )}
          <div className="mt-4 flex justify-between pt-4 border-t">
            <button className="flex items-center space-x-2 text-gray-500 hover:bg-gray-100 px-4 py-2 rounded-lg">
              <Video className="h-5 w-5 text-red-500" />
              <span>Live Video</span>
            </button>
            <input
              type="file"
              accept="image/*"
              className="hidden"
              ref={fileInputRef}
              onChange={handleImageChange}
            />
            <button
              type="button"
              className="text-green-400 flex items-center gap-2"
              onClick={() => fileInputRef.current?.click()}
            >
              <Image size={20} />
              <span>Photo/Video</span>
            </button>
            <button className="hidden lg:flex items-center space-x-2 text-gray-500 hover:bg-gray-100 px-4 py-2 rounded-lg">
              <Calendar className="h-5 w-5 text-yellow-500" />
              <span>Life Event</span>
            </button>
          </div>
          {visiable && (
            <div className="text-center flex gap-3 justify-center">
              <button
                disabled={isLoading || !formik.values.content.trim()}
                type="submit"
                className="btn btn-primary text-white"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="size-3 animate-spin" />
                    <p>processing...</p>
                  </>
                ) : (
                  "Publish"
                )}
              </button>
              <button
                onClick={() => {
                  formik.resetForm();
                  removeImage();
                  setVisiable(false);
                }}
                className="btn text-white"
              >
                Cancel
              </button>
            </div>
          )}
        </form>
      </div>
    </>
  );
}
