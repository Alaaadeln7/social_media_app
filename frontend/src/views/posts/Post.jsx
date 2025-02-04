import {
  Globe,
  MessageCircle,
  MoreHorizontal,
  Share2,
  ThumbsUp,
  Trash2,
} from "lucide-react";
import {
  useCheckFollowingQuery,
  useDeletePostMutation,
  useMakeFollowMutation,
  useToggleLikeMutation,
} from "../../store/api/postsApiSlice";
import { useCheckQuery } from "../../store/api/authApiSlice";
import { useMemo, useState } from "react";
import Comment from "./Comment";

export default function Post({ post }) {
  const { _id: postId, likes, comments, shares, content, image, author } = post;
  const [showComments, setShowComments] = useState(false);
  const [showFullContent, setShowFullContent] = useState(false);
  const { data: user } = useCheckQuery();
  const [deletePost, { isLoading: deletePostLoading }] = useDeletePostMutation();
  const [toggleLike, { data: likeData, isLoading: likeLoading }] = useToggleLikeMutation();
  const [makeFollow, { isLoading: followLoading }] = useMakeFollowMutation();
  const { data: following } = useCheckFollowingQuery(author?._id);

  const userId = useMemo(() => user?._id, [user]);
  const handleMakeLike = async () => {
    try {
      await toggleLike({ postId, userId });
    } catch (error) {
      console.error("Error liking post:", error);
    }
  };

  const handleFollow = async () => {
    try {
      await makeFollow(author?._id);
    } catch (error) {
      console.error("Error following user:", error);
    }
  };
  console.log(following?.following);

  const handleDeletePost = async () => {
    try {
      await deletePost(postId);
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  if (!author) {
    return <div className="text-2xl text-red-600 text-center m-3">Author not found</div>;
  }

  if (!post) {
    return <div>Post not found</div>;
  }


  return (
    <div className="rounded-xl shadow shadow-gray-600 my-7 sm:w-full lg:w-3/4">
      <div className="p-4">

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <img
              src={author.avatar}
              alt="User"
              className="h-10 w-10 rounded-full object-cover"
            />
            <div>
              <p className="font-medium">{author.fullName}</p>
              <div className="flex items-center space-x-2 text-gray-500 text-sm">
                <span>h ago</span>
                <span>•</span>
                <Globe className="h-4 w-4" />
              </div>
            </div>
            <button
              onClick={handleFollow}
              className="btn btn-primary h-4"
              disabled={followLoading}
            >
              {following?.following ? "Unfollow" : "Follow"}
              {followLoading && <span className="loading loading-dots loading-sm"></span>}
            </button>
          </div>
          <details className="dropdown">
            <summary className="btn m-1 border-none outline-none bg-transparent">
              <MoreHorizontal className="h-5 w-5 text-gray-500" />
            </summary>
            <ul className="menu dropdown-content bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
              {userId === author._id && (
                <li>
                  <button onClick={handleDeletePost} disabled={deletePostLoading}>
                    {deletePostLoading ? (
                      <span className="loading loading-dots loading-md"></span>
                    ) : (
                      <>
                        <Trash2 className="text-red-600 size-4" />
                        Delete
                      </>
                    )}
                  </button>
                </li>
              )}
              <li><a>Item 2</a></li>
            </ul>
          </details>
        </div>


        <p className={`mt-4 ${image && "border-b-2 py-3"}`}>
          {showFullContent ? content : `${content.substring(0, 100)}`}
          {content.length > 100 && (
            <button
              className="btn-link"
              onClick={() => setShowFullContent(!showFullContent)}
            >
              {showFullContent ? "Show Less" : "Show More"}
            </button>
          )}
        </p>

        {image && (
          <img
            src={image}
            alt="post content"
            className="mt-4 object-cover w-full max-w-lg mx-auto rounded-lg"
          />
        )}
        <div className={`mt-4 flex items-center justify-between text-gray-500 text-sm ${image && "border-t-2 py-3"}`}>
          {likes.length > 0 && (
            <div className="flex items-center space-x-2">
              <span className="bg-blue-500 p-1 rounded-full">
                <ThumbsUp className="h-3 w-3 text-white" />
              </span>
              <span>{likes.length}</span>
            </div>
          )}
          <div className="flex space-x-4">
            <span>{comments.length} Comments</span>
            <span>{shares.length} Shares</span>
          </div>
        </div>
      </div>

      <div className="border-t border-b border-base-300 px-4 py-2">
        <div className="flex space-x-1">
          <button
            disabled={likeLoading}
            onClick={handleMakeLike}
            className={`flex-1 flex items-center justify-center gap-3 p-2 rounded-lg ${
              likeData?.like && "text-blue-500 font-bold"
            } ${likeLoading ? "opacity-50" : "hover:bg-gray-100"}`}
          >
            <span>Like</span>
            {likeLoading ? (
              <span className="loading loading-dots loading-md"></span>
            ) : (
              <ThumbsUp className="h-5 w-5" />
            )}
          </button>

          <button
            onClick={() => setShowComments(!showComments)}
            className="flex-1 flex items-center justify-center space-x-2 p-2 hover:bg-gray-100 rounded-lg text-gray-500"
          >
            <MessageCircle className="h-5 w-5" />
            <span>Comment</span>
          </button>

          <button className="flex-1 flex items-center justify-center space-x-2 p-2 hover:bg-gray-100 rounded-lg text-gray-500">
            <Share2 className="h-5 w-5" />
            <span>Share</span>
          </button>
        </div>
      </div>
      {showComments && <Comment postId={postId} comments={comments} />}
    </div>
  );
}