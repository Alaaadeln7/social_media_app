import { useEffect, useRef, useState } from "react";
import { Image, Send, X } from "lucide-react";
import toast from "react-hot-toast";
import { useFormik } from "formik";
import * as yup from "yup";
import { useSendMessageMutation } from "../../store/api/messageApiSlice";
import { useSelector } from "react-redux";
import { subscribeToMessages, unsubscribeFromMessages } from "../../utils/socket";
export default function MessageInput() {
  const { selectedUser } = useSelector((state) => state.user);
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);
  const [sendMessage, { isLoading }] = useSendMessageMutation();
  const receiverId = selectedUser?._id;
  useEffect(() => {
    subscribeToMessages(receiverId);
  return () => {
    unsubscribeFromMessages();
  };
}, [selectedUser]);
  const formik = useFormik({
    initialValues: { text: "" },
    validationSchema: yup.object({
      text: yup
        .string()
        .required("Message cannot be empty")
        .test("text-or-image", "Message cannot be empty", function (value) {
          return value.trim() || imagePreview;
        }),
    }),
    onSubmit: async (values, { resetForm }) => {
      try {
        await sendMessage({
          text: values.text,
          receiverId,
          image: imagePreview,
        });
        resetForm();
        setImagePreview(null);
        if (fileInputRef.current) fileInputRef.current.value = "";
      } catch (error) {
        toast.error("Failed to send message");
        console.error("Failed to send message:", error);
      }
    },
  });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result);
      reader.readAsDataURL(file);
    } else {
      toast.error("Please select an image file");
    }
  };
  const removeImage = () => {
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <div className="p-4 w-full">
      {imagePreview && (
        <div className="mb-3 flex items-center gap-2">
          <div className="relative">
            <img
              src={imagePreview}
              alt="Preview"
              className="w-20 h-20 object-cover rounded-lg border border-zinc-700"
            />
            <button
              onClick={removeImage}
              className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-base-300 flex items-center justify-center"
              type="button"
            >
              <X className="size-3" />
            </button>
          </div>
        </div>
      )}

      <form onSubmit={formik.handleSubmit} className="flex items-center gap-2">
        <div className="flex-1 flex gap-2">
          <input
            type="text"
            className="w-full input input-bordered rounded-lg input-sm sm:input-md"
            placeholder="Type a message..."
            name="text"
            value={formik.values.text}
            onChange={formik.handleChange}
          />
          <input
            type="file"
            accept="image/*"
            className="hidden"
            ref={fileInputRef}
            onChange={handleImageChange}
          />
          <button
            type="button"
            className={`hidden sm:flex btn btn-circle ${
              imagePreview ? "text-emerald-500" : "text-zinc-400"
            }`}
            onClick={() => fileInputRef.current?.click()}
          >
            <Image size={20} />
          </button>
        </div>
        <button
          type="submit"
          className="btn btn-circle bg-primary text-white"
          disabled={isLoading || (!formik.values.text.trim() && !imagePreview)}
        >
          {isLoading ? (
            <span className="loading loading-dots loading-md"></span>
          ) : (
            <Send size={22} />
          )}
        </button>
      </form>
    </div>
  );
}
