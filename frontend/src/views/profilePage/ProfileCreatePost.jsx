import { Calendar, ImageIcon, Video } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function ProfileCreatePost(props) {
  const navigate = useNavigate();
  return (
    <div className="rounded-lg shadow p-4">
      <div className="flex space-x-4">
        <img
          src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80"
          alt="Profile"
          className="h-10 w-10 rounded-full"
        />
        <button
          onClick={() => navigate("/create-post")}
          className="flex-1 bg-gray-100 rounded-full px-4 text-left text-gray-500 hover:bg-gray-200"
        >
          What is on your mind, {props.fullName}?
        </button>
      </div>
      <div className="mt-4 flex justify-between pt-4 border-t">
        <button className="flex items-center space-x-2 text-gray-500 hover:bg-gray-100 px-4 py-2 rounded-lg">
          <Video className="h-5 w-5 text-red-500" />
          <span>Live Video</span>
        </button>
        <button className="flex items-center space-x-2 text-gray-500 hover:bg-gray-100 px-4 py-2 rounded-lg">
          <ImageIcon className="h-5 w-5 text-green-500" />
          <span>Photo/Video</span>
        </button>
        <button className="lg:hidden sm:inline flex items-center space-x-2 text-gray-500 hover:bg-gray-100 px-4 py-2 rounded-lg">
          <Calendar className="h-5 w-5 text-yellow-500" />
          <span>Life Event</span>
        </button>
      </div>
    </div>
  );
}
