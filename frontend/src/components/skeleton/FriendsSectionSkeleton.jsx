
export default function FriendsSectionSkeleton() {
  return (
    <div className="bg-white rounded-lg shadow p-6">
  <div className="flex justify-between items-center mb-4">
    <div className="h-7 w-24 bg-gray-300 rounded animate-pulse"></div> 
    <div className="h-4 w-16 bg-gray-300 rounded animate-pulse"></div>
  </div>


  <div className="grid grid-cols-3 gap-4">
    {[1, 2, 3, 4, 5, 6].map((_, index) => (
      <div key={index} className="text-center">
        <div className="aspect-square rounded-lg overflow-hidden mb-2 bg-gray-300 animate-pulse"></div>
        <div className="h-4 w-3/4 mx-auto bg-gray-300 rounded animate-pulse"></div>
      </div>
    ))}
  </div>
</div>
  )
}
