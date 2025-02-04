import {
  Bookmark,
  Calendar,
  ChevronDown,
  Clock,
  Flag,
  Users,
} from "lucide-react";
import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <div className="hidden lg:block space-y-2 py-4 w-1/4">
      <Link
        to={"/"}
        className="flex items-center space-x-3 p-2 transition-colors rounded-lg"
      >
        <img
          src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80"
          alt="Profile"
          className="h-9 w-9 rounded-full"
        />
        <span className="font-medium">John Doe</span>
      </Link>
      <Link to={"/"} className="flex items-center space-x-3 p-2 0 rounded-lg">
        <Users className="h-9 w-9 p-2 bg-gray-900 text-blue-500 rounded-full" />
        <span>Friends</span>
      </Link>
      <Link
        to={"/"}
        className="flex items-center space-x-3 p-2 hover:bg-gray-100 rounded-lg"
      >
        <Clock className="h-9 w-9 p-2 bg-gray-900 text-blue-500 rounded-full" />
        <span>Memories</span>
      </Link>
      <Link
        to={"/"}
        className="flex items-center space-x-3 p-2 hover:bg-gray-100 rounded-lg"
      >
        <Bookmark className="h-9 w-9 p-2 bg-gray-900 text-purple-500 rounded-full" />
        <span>Saved</span>
      </Link>
      <Link
        to={"/"}
        className="flex items-center space-x-3 p-2 hover:bg-gray-100 rounded-lg"
      >
        <Flag className="h-9 w-9 p-2 bg-gray-900 text-orange-500 rounded-full" />
        <span>Pages</span>
      </Link>
      <Link
        to={"/"}
        className="flex items-center space-x-3 p-2 hover:bg-gray-100 rounded-lg"
      >
        <Calendar className="h-9 w-9 p-2 bg-gray-900 text-red-500 rounded-full" />
        <span>Events</span>
      </Link>

      <button className="flex items-center space-x-3 p-2 hover:bg-gray-100 rounded-lg w-full">
        <ChevronDown className="h-9 w-9 p-2 bg-gray-900 rounded-full" />
        <span>See more</span>
      </button>
    </div>
  );
}
