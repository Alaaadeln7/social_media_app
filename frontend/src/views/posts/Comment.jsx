import { useFormik } from "formik";
import { Send } from "lucide-react";
import { useCheckQuery } from "../../store/api/authApiSlice";
import Emojis from "./Emojis";
import { useCreateCommentMutation } from "../../store/api/postsApiSlice";
import CommentShape from "./CommentShape";
import { commentValidationSchema } from "../../utils/validation";

export default function Comment(props) {
  const [createComment, { isLoading: isCreatingComment }] =
    useCreateCommentMutation();
  const { data: user } = useCheckQuery();
  const userId = user?._id;
  const postId = props.postId;
  const formik = useFormik({
    initialValues: {
      comment: "",
    },
    validationSchema: commentValidationSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        await createComment({
          content: values.comment,
          userId,
          postId,
        }).unwrap();
        resetForm();
      } catch (error) {
        console.error("Failed to create comment:", error);
      }
    },
  });
  const handleEmojiClick = (emojiObject) => {
    formik.setFieldValue("comment", formik.values.comment + emojiObject.emoji);
  };
  return (
    <div className="mx-auto p-4 rounded-lg shadow-md">
      <div className="space-y-4">
        {props?.comments?.map((item) => (
          <CommentShape
            commnetId={item._id}
            key={item._id}
            userId={item.userId}
            content={item.content}
          />
        ))}

        <form onSubmit={formik.handleSubmit}>
          <div className="flex items-center space-x-3 mt-4 ">
            <img
              className="w-10 h-10 rounded-full"
              src={user.avatar}
              alt="User Avatar"
            />
            <div className="w-full relative">
              <input
                type="text"
                placeholder="Write a comment..."
                className="w-full p-2 border rounded-full bg-transparent"
                id="comment"
                name="comment"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.comment}
              />
              <Emojis
                className={"absolute right-2 bottom-2"}
                handleEmojiClick={handleEmojiClick}
              />
            </div>
            <button
              type="submit"
              disabled={isCreatingComment}
              className="btn btn-primary text-white "
            >
              {isCreatingComment ? (
                <span className="loading loading-dots loading-sm"></span>
              ) : (
                <Send className="size-5" />
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
