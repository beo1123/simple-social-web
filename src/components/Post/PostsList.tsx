'use client';

import { Post } from '@/type/Post';
import PostCard from './PostCard';
import { usePosts } from '@/hook/post/usePosts';
import PostListLoading from '../Loading/PostListLoading';

export default function PostsList({ initialPosts }: { initialPosts: Post[] }) {
    const { posts, isLoading, isError, error, fetchNextPage, hasNextPage, isFetchingNextPage } = usePosts(10);

    const displayPosts = posts || initialPosts;

    if (isLoading && !displayPosts) return <PostListLoading />;
    if (isError) return <div className="text-center p-4 text-red-500">Error: {(error as Error)?.message}</div>;

    return (
        <div>
            <ul className="space-y-4">
                {displayPosts.map((post) => (
                    <PostCard key={post.id} post={post} />
                ))}
            </ul>
            <div className="mt-6 flex justify-center">
                {hasNextPage && (
                    <button
                        onClick={() => fetchNextPage()}
                        disabled={isFetchingNextPage}
                        className="px-4 py-2 bg-blue-500 text-white rounded-full disabled:bg-gray-400"
                    >
                        {isFetchingNextPage ? 'Loading more...' : 'Load More'}
                    </button>
                )}
            </div>
        </div>
    );
}