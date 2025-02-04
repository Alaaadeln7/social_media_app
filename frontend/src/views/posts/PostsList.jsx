import { useGetAllPostsQuery } from "../../store/api/postsApiSlice";
import Post from "./Post";
import PostsSkeleton from "../../components/skeleton/PostsSkeleton";
import { useEffect, useRef, useState } from "react";

export default function PostsList() {
  const [page, setPage] = useState(1);
  const observerRef = useRef(null);
  const { data = [], isLoading,isFetching } = useGetAllPostsQuery({ page, limit: 5 });
  const posts = data?.posts || [];
  useEffect(() => {
    if (!data?.hasMore) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !isFetching) {
          setPage((prevPage) => prevPage + 1); 
        }
      },
      { threshold: 1 }
    );

    if (observerRef.current) observer.observe(observerRef.current);

    return () => observer.disconnect();
  }, [data, isFetching]);
  const printPosts = posts.map((post) => (
    <Post key={post._id} post={post} />
  ));
  if (isLoading) {
    return <PostsSkeleton />;
  }
  return <>
  {printPosts} 
  {data?.hasMore && <div ref={observerRef} className="h-10" />}
  </>;
}
