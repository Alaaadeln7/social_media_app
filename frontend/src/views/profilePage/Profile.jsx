import { Camera } from "lucide-react";
import toast from "react-hot-toast";
import {
  useCheckQuery,
  useUpdateProfileMutation,
} from "../../store/api/authApiSlice";
import { useState } from "react";
import LazyImage from "../../components/LazyImage";
import ActionsProfile from "./ActionsProfile";
import ProfileNavigation from "./ProfileNavigation";
import { Outlet } from "react-router-dom";
import Navbar from "../Navbar";
function Profile() {
  const [updateProfile, { isLoading }] = useUpdateProfileMutation();
  const { data: user } = useCheckQuery();
  const [selectedImg, setSelectedImg] = useState(null);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onload = async () => {
      const base64Image = reader.result;
      setSelectedImg(base64Image);
      await updateProfile({ avatar: base64Image });
      toast.success("updating successfully");
    };
  };
  return (
    <>
      <Navbar />
      <div className="min-h-screen">
        {/* Cover Photo Section */}
        <div
          className="relative h-96 bg-cover bg-center"
          style={{
            backgroundImage: `url(${user.cover})`,
          }}
        >
          <button className="sm:flex absolute bottom-4 right-4 flex items-center space-x-2  px-4 py-2 rounded-lg shadow hover:bg-gray-50">
            <Camera className="h-5 w-5" />
            <span>Edit Cover Photo</span>
          </button>
        </div>

        {/* Profile Section */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative -m-y-10">
            <div className="flex flex-col md:flex-row items-start md:items-end space-y-4 md:space-y-0 md:space-x-6">
              {/* Profile Picture */}
              <div className="relative">
                <LazyImage
                  src={selectedImg || user?.avatar}
                  alt="Profile"
                  className="size-32 rounded-full object-cover border-4 "
                />
                <label
                  htmlFor="avatar-upload"
                  className={`
                  absolute bottom-0 right-0 
                  bg-base-content hover:scale-105
                  p-2 rounded-full cursor-pointer 
                  transition-all duration-200
                  ${isLoading ? "animate-pulse pointer-events-none" : ""}
                `}
                >
                  <Camera className="w-5 h-5 text-base-200" />
                  <input
                    type="file"
                    id="avatar-upload"
                    className="hidden"
                    accept="image/*"
                    onChange={handleImageUpload}
                    disabled={isLoading}
                  />
                </label>
              </div>

              {/* Profile Info */}
              <div className="flex-1 pb-4">
                <h1 className="text-3xl font-bold">{user.fullName}</h1>
                <p className="text-gray-600 mt-1">1.2K Friends</p>
              </div>

              <ActionsProfile />
            </div>

            <ProfileNavigation />
          </div>
          <Outlet />
        </div>
      </div>
    </>
  );
}

export default Profile;
