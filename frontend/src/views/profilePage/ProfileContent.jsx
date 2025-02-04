import { Briefcase } from "lucide-react";
import FriendsSection from "./FriendsSection";
import PhotoSection from "./PhotoSection";
import ProfileCreatePost from "./ProfileCreatePost";
import ProfilePostsList from "./ProfilePostsList";
import { useCheckQuery } from "../../store/api/authApiSlice";

export default function ProfileContent() {
  const { data: user } = useCheckQuery();
  console.log();
  return (
    <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Left Sidebar */}
      <div className="space-y-6">
        {user.work.length !== 0 && <div className=" rounded-lg shadow p-6">
          <h2 className="text-xl font-bold mb-4">Intro</h2>
          <div className="space-y-4">
            {user.work.map((item) => (
              <>
                <div key={item._id} className="flex items-start space-x-3">
                  <Briefcase className="h-5 w-5 text-gray-500" />
                  <div className="flex flex-col">
                    <span>
                      Works at
                      <span className="text-gray-600">{item.company}</span>{" "}
                      company
                    </span>
                    <span>job title : {item.job}</span>
                  </div>
                </div>
              </>
            ))}
          </div>
        </div>}
        {/* Photos Card */}
        <PhotoSection />

        {/* Friends Card */}
        <FriendsSection />
      </div>

      {/* Main Timeline */}
      <div className="lg:col-span-2 space-y-6">
        {/* Create Post */}
        <ProfileCreatePost fullName={user.fullName} />
        {/* Posts */}
        <ProfilePostsList />
      </div>
    </div>
  );
}
