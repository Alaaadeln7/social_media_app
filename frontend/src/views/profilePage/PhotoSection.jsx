export default function PhotoSection() {
  const photos = []
  // const { data: photos = [] , isLoading } = useGetPhotosQuery();
  // if(isLoading) {
  //   return <PhotoSectionSkeleton/>
  // }
  if(photos.length === 0) return null;
  return (
    <div className="bg-base-200 rounded-lg shadow p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Photos</h2>
        <a href="#" className="text-blue-600 text-sm">
          See All Photos
        </a>
      </div>
      <div className="grid grid-cols-3 gap-2">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => (
          <div key={i} className="aspect-square rounded-lg overflow-hidden">
            <img
              src={`https://images.unsplash.com/photo-${
                1500000000000 + i
              }?auto=format&fit=crop&q=80`}
              alt={`Photo ${i}`}
              className="h-full w-full object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
