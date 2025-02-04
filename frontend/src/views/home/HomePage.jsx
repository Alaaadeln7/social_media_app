import Sidebar from "../Sidebar";
import Navbar from "../Navbar";
import CreatePost from "../posts/CreatePost";
import PostsList from "../posts/PostsList";
import { useGetAllPostsQuery } from "../../store/api/postsApiSlice";
import CreatePostSkeleton from "../../components/skeleton/CreatePostSkeleton";
import FriendsList from "../friends/FriendsList";
import RequestesFriendsList from "../friends/RequestesFriendsList";

export default function HomePage() {
  const { isLoading } = useGetAllPostsQuery();
  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      <Navbar />
      <Sidebar />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative top-20 flex-grow">
        <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className=" lg:col-span-3 space-y-6">
            {isLoading ? <CreatePostSkeleton /> : <CreatePost />}
            <PostsList />
          </div>
          <div className="space-y-6 lg:col-span-1">
            <RequestesFriendsList />
            <FriendsList />
          </div>
        </div>
      </div>
    </div>
  );
}
