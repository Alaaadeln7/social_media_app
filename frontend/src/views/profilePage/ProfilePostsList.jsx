import { Loader } from "lucide-react";
import { useCheckQuery } from "../../store/api/authApiSlice";
import { useGetAllPostsFromUserQuery } from "../../store/api/postsApiSlice";
import Post from "../posts/Post";

export default function ProfilePostsList() {
  const { data: user } = useCheckQuery();
  const userId = user._id;
  const { data, isLoading } = useGetAllPostsFromUserQuery(userId);
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-10 animate-spin" />
      </div>
    );
  }
  // console.log(data.data);
  return (
    <div>
      {data.data.map((post) => (
        <Post post={post} author={user} />
      ))}
    </div>
  );
}
