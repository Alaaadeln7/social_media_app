import { useGetFriendRequestsQuery } from "../../store/api/friendsApiSlice"
import FriendRequestSkeleton from "../../components/skeleton/FriendRequestSkeleton";
import FriendRequest from './FriendRequest';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
export default function RequestesFriendsList() {
  const { data: requests = [], isLoading } = useGetFriendRequestsQuery();
  
  if(requests.length === 0) return null;
  
  if (isLoading) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md">
        <FriendRequestSkeleton />
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white">Friend Requests</h2>
        <span className="px-3 py-1 text-sm text-white bg-red-600 rounded-full">
          {requests?.length}
        </span>
      </div>
      
      <div className="p-4">
        <Swiper
          modules={[Navigation, Pagination]}
          spaceBetween={20}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          className="friend-requests-swiper"
        >
          {requests?.map((item) => (
            <SwiperSlide key={item._id}>
              <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <FriendRequest
                  sender={item.sender}
                  id={item._id}
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
