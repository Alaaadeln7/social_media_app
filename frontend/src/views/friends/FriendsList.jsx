import FriendsSectionSkeleton from "../../components/skeleton/FriendsSectionSkeleton";
import { useGetSuggestionsQuery } from "../../store/api/friendsApiSlice";
import Friend from "./Friend";    
export default function FriendsList() {
  const { data: suggestions = [] , isLoading: suggestionsLoader } = useGetSuggestionsQuery();
  
  if (suggestionsLoader) {
    return (
      <div className="flex items-center justify-center h-screen">
        <FriendsSectionSkeleton/>
      </div>
    );
  }
  return (
    <div className="hidden md:block ">
        {suggestions.map((item) => (
            <Friend
              key={item._id}
              receiverId={item._id}
              fullName={item.fullName}
              avatar={item.avatar}
            />
        ))}
    </div>
  );
}
