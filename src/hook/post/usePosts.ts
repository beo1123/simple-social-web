'use client';

import { useInfiniteQuery } from '@tanstack/react-query';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { UsePostsResult } from '@/type/UsePostsResult';
import { fetchPosts } from '@/services';


export const usePosts = (limit: number = 10): UsePostsResult => {
    const { searchQuery, sortBy, filterByUser } = useSelector((state: RootState) => state.search);

    const { data, isLoading, isError, error, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteQuery({
        queryKey: ['posts', limit, searchQuery, filterByUser, sortBy],
        queryFn: async ({ pageParam = 1 }) => {
            const result = await fetchPosts(pageParam, limit);
            let filteredPosts = result.posts;

            // Apply client-side search and filter
            if (searchQuery) {
                filteredPosts = filteredPosts.filter(
                    (post) =>
                        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        post.body.toLowerCase().includes(searchQuery.toLowerCase())
                );
            }
            if (filterByUser) {
                filteredPosts = filteredPosts.filter((post) => post.userId.toString() === filterByUser);
            }
            filteredPosts = filteredPosts.sort((a, b) => {
                const dateA = new Date(a.timestamp).getTime();
                const dateB = new Date(b.timestamp).getTime();
                return sortBy === 'newest' ? dateB - dateA : dateA - dateB;
            });

            return { ...result, posts: filteredPosts };
        },
        getNextPageParam: (lastPage, allPages) => {
            const totalPages = Math.ceil(lastPage.total / limit);
            const nextPage = allPages.length + 1;
            return nextPage <= totalPages ? nextPage : undefined;
        },
        initialPageParam: 1,
    });

    const posts = data?.pages.flatMap((page) => page.posts);
    const users = Array.from(
        new Map(
            data?.pages
                .flatMap((page) => page.posts)
                .map((post) => [post.userId, { id: post.userId.toString(), name: post.userName || `User ${post.userId}` }])
        ).values()
    );

    return {
        posts,
        users: [{ id: '', name: 'All Users' }, ...users],
        isLoading,
        isError,
        error,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
    };
};