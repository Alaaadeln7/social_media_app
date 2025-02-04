export default function CreatePostSkeleton() {
  return (
    <div className="rounded-lg shadow p-4 sm:w-full lg:w-3/4">
      <div className="flex space-x-4">
        <div className="skeleton h-10 w-10 rounded-full"></div>
        <div className="relative w-full">
          <div className="skeleton h-24 w-full rounded-md bg-base-300"></div>
        </div>
      </div>
      <div className="mt-4 flex justify-between pt-4 border-t">
        <div className="flex items-center space-x-2">
          <div className="skeleton h-10 w-28 rounded-lg"></div>
        </div>
        <div className="skeleton h-10 w-28 rounded-lg"></div>
        <div className="hidden lg:flex items-center space-x-2">
          <div className="skeleton h-10 w-28 rounded-lg"></div>
        </div>
      </div>
    </div>
  );
}
