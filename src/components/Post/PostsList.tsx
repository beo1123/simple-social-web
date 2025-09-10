'use client';

import { Post } from '@/type/Post';
import PostCard from './PostCard';
import { usePosts } from '@/hook/post/usePosts';
import PostListLoading from '../Loading/PostListLoading';
import { useInView } from 'react-intersection-observer';
import { useEffect } from 'react';
import { useDebounce } from '@/hook/useDebounce';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';

export default function PostsList({ initialPosts }: { initialPosts: Post[] }) {
    const { ref, inView } = useInView({ threshold: 0.1 });
    const { posts, isLoading, isError, error, fetchNextPage, hasNextPage, isFetchingNextPage } = usePosts(10);
    const debouncedInView = useDebounce(inView, 300);
    const { searchQuery, filterByUser } = useSelector((state: RootState) => state.search);

    useEffect(() => {
        if (!searchQuery && !filterByUser) {
            if (debouncedInView && hasNextPage && !isFetchingNextPage) {
                fetchNextPage();
            }
        }
    }, [debouncedInView, hasNextPage, isFetchingNextPage, fetchNextPage, searchQuery, filterByUser]);

    const displayPosts = posts && posts.length > 0 ? posts : initialPosts;

    if (isLoading && !displayPosts.length) return <PostListLoading />;
    if (isError) return <div className="text-center p-4 text-red-500">Error: {(error as Error)?.message}</div>;
    if (displayPosts.length === 0 && (searchQuery || filterByUser)) {
        return <div className="text-center p-4 text-primary font-bold">No posts match your search or filter.</div>;
    }

    return (
        <div>
            <ul className="space-y-4">
                {displayPosts.map((post) => (
                    <PostCard key={post.id} post={post} />
                ))}
            </ul>

            {/* Lazyload chỉ bật khi không search/filter */}
            {!searchQuery && !filterByUser && hasNextPage && (
                <div ref={ref} className="h-10">
                    {isFetchingNextPage && <PostListLoading />}
                </div>
            )}
        </div>
    );
}
