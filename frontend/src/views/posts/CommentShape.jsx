import { Ellipsis, Pen, Trash2 } from "lucide-react";
import { useCheckQuery } from "../../store/api/authApiSlice";
import {
  useDeleteCommentMutation,
  useUpdateCommentMutation,
} from "../../store/api/postsApiSlice";
import { useMemo } from "react";

export default function CommentShape({ userId, content, commnetId, key }) {
  const { data: user } = useCheckQuery();
  const [deleteComment, { isLoading }] = useDeleteCommentMutation();
  const [updateCommentContent, { isLoading: updateLoading }] =
    useUpdateCommentMutation();
  const userIdFromComment = useMemo(() => user._id, [user]);
  const handleUpdateComment = async () => {
    await updateCommentContent({ content, commnetId });
  };
  const handleDeleteComment = async () => {
    await deleteComment(commnetId);
  };
  return (
    <div className=" flex flex-col " key={key}>
      <div className="flex items-start space-x-2">
        <img
          className="w-10 h-10 rounded-full object-cover"
          src={userId.avatar}
          alt={userId.fullName}
        />
        <div>
          <div className="flex flex-col items-start">
            <div className="flex flex-col bg-base-300 p-4 rounded-2xl">
              <span className="text-sm font-semibold">{userId.fullName}</span>
              <span className="text-xs text-gray-500">2h ago</span>
              <p className="w-full mt-3">{content}</p>
            </div>
          </div>
          <div className="flex space-x-4 text-sm text-gray-500">
            <button className="hover:underline">Like</button>
            <button className="hover:underline">Reply</button>
            {userIdFromComment == user._id && (
              <details className="dropdown">
                <summary className="btn m-1 bg-transparent border-none shadow-none">
                  <Ellipsis size={15} />
                </summary>
                <ul className="menu dropdown-content bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
                  <li>
                    <button onClick={() => handleUpdateComment()}>
                      {updateLoading ? (
                        <span className="loading loading-dots loading-md"></span>
                      ) : (
                        <span className="flex gap-2">
                          <Pen className="size-4 text-primary" /> update
                        </span>
                      )}
                    </button>
                  </li>
                  <li>
                    <button onClick={() => handleDeleteComment(commnetId)}>
                      {isLoading ? (
                        <span className="loading loading-dots loading-md"></span>
                      ) : (
                        <span className="flex gap-2">
                          <Trash2 className="size-4 text-red-700" /> delete
                        </span>
                      )}
                    </button>
                  </li>
                </ul>
              </details>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
