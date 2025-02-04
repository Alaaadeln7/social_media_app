import { Edit3, MoreHorizontal, Plus } from "lucide-react";

export default function ActionsProfile() {
  return (
    <div className="flex">
      <div className="flex space-x-2 ">
        <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 flex items-center space-x-2">
          <Plus className="h-5 w-5" />
          <span className="hidden sm:inline">Add Story</span>
        </button>
        <button className="bg-gray-200 px-6 py-2 rounded-lg hover:bg-gray-300 flex items-center space-x-2">
          <Edit3 className="h-5 w-5 " />
          <span className="hidden sm:inline">Edit Profile</span>
        </button>
        <button className="bg-gray-200 p-2 rounded-lg hover:bg-gray-300">
          <MoreHorizontal className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}
