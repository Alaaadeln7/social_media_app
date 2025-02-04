import { useCheckQuery } from "../../store/api/authApiSlice";

export default function General() {
  const { data: user } = useCheckQuery();
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">General Account Settings</h2>
      <div className="flex items-center justify-between p-4 rounded-lg transition-colors">
        <div>
          <h3 className="font-medium">Name</h3>
          <p className="text-sm text-gray-500">{user.fullName}</p>
        </div>
        <button className="text-blue-600 hover:text-blue-700">Edit</button>
      </div>

      {/* Contact */}
      <div className="flex items-center justify-between p-4 rounded-lg transition-colors">
        <div>
          <h3 className="font-medium">Contact</h3>
          <p className="text-sm text-gray-500">{user.email}</p>
          <p className="text-sm text-gray-500">{user.phone}</p>
        </div>
        <button className="text-blue-600 hover:text-blue-700">Edit</button>
      </div>

      {/* Password */}
      <div className="flex items-center justify-between p-4 rounded-lg transition-colors">
        <div>
          <h3 className="font-medium">Password</h3>
          <p className="text-sm text-gray-500">Last changed 3 months ago</p>
        </div>
        <button className="text-blue-600 hover:text-blue-700">Change</button>
      </div>

      {/* Language */}
      <div className="flex items-center justify-between p-4 rounded-lg transition-colors">
        <div>
          <h3 className="font-medium">Language</h3>
          <p className="text-sm text-gray-500">English (US)</p>
        </div>
        <button className="text-blue-600 hover:text-blue-700">Edit</button>
      </div>
    </div>
  );
}
