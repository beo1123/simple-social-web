import PostListLoading from "@/components/Loading/PostListLoading";
import PostsList from "@/components/Post/PostsList";
import { fetchPosts } from "@/services";
import { Suspense } from "react";

export default async function Home() {
  const { posts } = await fetchPosts(1, 10);

  return (
    <div className="container mx-auto max-w-2xl py-8 px-4">
      <h1 className="text-2xl font-bold mb-6">News Feed</h1>
      <Suspense fallback={<PostListLoading />}>
        <PostsList initialPosts={posts} />
      </Suspense>
    </div>
  );
}
