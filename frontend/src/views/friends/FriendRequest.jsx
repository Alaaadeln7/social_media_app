import toast from "react-hot-toast";
import { useUpdateFriendStatusMutation } from "../../store/api/friendsApiSlice";
import { Check, X } from "lucide-react";
export default function FriendRequest(props) {
  const { key, fullName, avatar } = props.sender;
  const {id} = props;
  const [updateStatus, { isLoading: updatingStatusLoading }] = useUpdateFriendStatusMutation()
  const handleUpdateStatus = async (status) => {
    try {
      const {isSuccess} = await updateStatus({ status ,id });
      if(isSuccess){
        toast.success("update status success");
      }
    } catch (error) {
      console.log(error);
      toast.error("update status failed");
    }
  }
  return (
    <div key={key} >
      <div className="divide-y divide-gray-200">
        <div className="flex items-center px-6 py-4">
          <img className="w-12 h-12 object-cover rounded-full" src={avatar} alt="Shoes" />
          <div className="ml-4 flex-1">
            <h3 className="text-lg font-semibold text-gray-800">{fullName}</h3>
          </div>
          <div className="flex space-x-2">
            <button disabled={updatingStatusLoading} className="btn btn-success text-white " onClick={() => handleUpdateStatus("accepted")}> {updatingStatusLoading ? <span className="loading loading-dots loading-md"></span> : <Check/> }</button>
            <button disabled={updatingStatusLoading} className="btn btn-error text-white" onClick={() => handleUpdateStatus("rejected")}> {updatingStatusLoading ? <span className="loading loading-dots loading-md"></span> :<X /> }</button>
          </div>
        </div>
      </div>
    </div>
  );
}
