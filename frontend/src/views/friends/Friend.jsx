import toast from "react-hot-toast";
import {
  useAddFriendMutation,
} from "../../store/api/friendsApiSlice";
export default function Friend(props) {
  const { key, fullName, avatar, receiverId } = props;
  const [addFriend, { isLoading: addingFriendLoading , isSuccess }] = useAddFriendMutation();
  const handleAddFriend = async () => {
    try {
      const { isSuccess } = await addFriend({ receiverId });
      if (isSuccess) {
        toast.success("send friend request");
      }
    } catch (error) {
      toast.error("faild add friend");
      throw new Error("faild add friend");
    }
  };
  return (
    <div
      key={key}
      className="flex w-80 justify-between items-center gap-3 m-4"
    >
      <div className="flex gap-4">
      <figure>
        <img className="w-10 h-10 object-cover rounded-full" src={avatar } alt="Shoes" />
      </figure>
        <h5 className="text-md font-bold">{fullName}</h5>
        
      </div>
      <div className="flex gap-4">
          <button className="btn btn-primary text-white" 
          onClick={handleAddFriend}
          > 
            {addingFriendLoading ? 
              <span className="loading loading-dots loading-md"></span> 
              :
              isSuccess ? "cancel Request" : "add friend"
              }
            </button>
        </div>
    </div>
  );
}

