export default function PostsSkeleton() {
  return (
    <div className="rounded-xl shadow shadow-gray-600 my-7 sm:w-full lg:w-3/4">
      {[...Array(3)].map((_, index) => (
        <div
          key={index}
          className="flex flex-col gap-4 p-4 border rounded-2xl shadow-sm animate-pulse m-3"
        >
          <div className="flex items-center gap-4">
            <div className="skeleton h-14 w-14 shrink-0 rounded-full "></div>
            <div className="flex flex-col gap-2">
              <div className="skeleton h-4 w-32  rounded"></div>
              <div className="skeleton h-3 w-24  rounded"></div>
            </div>
          </div>

          <div className="skeleton h-48 w-full  rounded-lg"></div>

          <div className="flex items-center justify-between gap-4">
            <div className="skeleton h-6 w-20  rounded"></div>
            <div className="skeleton h-6 w-20  rounded"></div>
            <div className="skeleton h-6 w-20  rounded"></div>
          </div>
        </div>
      ))}
    </div>
  );
}
