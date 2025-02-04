import { Link, useLocation } from "react-router-dom";

export default function ProfileNavigation() {
  const location = useLocation();
  return (
    <div className="hidden sm:block mt-6 border-t border-b border-gray-200">
      <nav className="heddin flex space-x-8">
        <Link
          to="/profile/"
          className={`px-4 py-4 text-sm font-medium ${
            location.pathname === "/profile/"
              ? "text-blue-600 border-b-2 border-blue-600"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          Timeline
        </Link>
        <Link
          to="/profile/about"
          className={`px-4 py-4 text-sm font-medium ${
            location.pathname === "/profile/about"
              ? "text-blue-600 border-b-2 border-blue-600"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          About
        </Link>
        <Link
          to="/profile/friends"
          className={`px-4 py-4 text-sm font-medium ${
            location.pathname === "/profile/friends"
              ? "text-blue-600 border-b-2 border-blue-600"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          Friends
        </Link>
        <Link
          to="/profile/photos"
          className={`px-4 py-4 text-sm font-medium ${
            location.pathname === "/profile/photos"
              ? "text-blue-600 border-b-2 border-blue-600"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          Photos
        </Link>
        <Link
          to="/profile/videos"
          className={`px-4 py-4 text-sm font-medium ${
            location.pathname === "/profile/videos"
              ? "text-blue-600 border-b-2 border-blue-600"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          Videos
        </Link>
      </nav>
    </div>
  );
}
