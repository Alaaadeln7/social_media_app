import { useGetFriendsQuery } from "../../store/api/friendsApiSlice";
import LazyImage from "../../components/LazyImage";
import FriendsSectionSkeleton from "../../components/skeleton/FriendsSectionSkeleton";
import { Link } from "react-router-dom";

export default function FriendsSection() {
  const { data: friends = [] , isLoading } = useGetFriendsQuery();
  if(isLoading) {
    return <FriendsSectionSkeleton/>
  }
  if(friends.length === 0) return null;
  return (
    <div className="bg-base-200 rounded-lg shadow p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Friends</h2>
        <Link to="/" className="text-blue-600 text-sm btn">
          See All Friends
        </Link>
      </div>
      <div className="grid grid-cols-3 gap-4">
        {friends.map((item) => (
          <div key={item._id} className="text-center">
            <div className="aspect-square rounded-lg overflow-hidden mb-2">
              <LazyImage
                src={item.avatar}
                alt={item.fullName}
                className="h-full w-full object-cover"
              />
            </div>
            <p className="text-sm font-medium truncate">{item.fullName}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
