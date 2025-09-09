'use client';

import { fetchPosts } from "@/services";
import { UsePostsResult } from "@/type/UsePostsResult";
import { useInfiniteQuery } from "@tanstack/react-query";

export const usePosts = (limit: number = 10): UsePostsResult => {
    const { data, isLoading, isError, error, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteQuery({
        queryKey: ['posts', limit],
        queryFn: ({ pageParam = 1 }) => fetchPosts(pageParam, limit),
        getNextPageParam: (lastPage, allPage) => {
            const totalPages = Math.ceil(lastPage.total / limit);
            const nextPage = allPage.length + 1;
            return nextPage <= totalPages ? nextPage : undefined
        },
        initialPageParam: 1

    });
    const posts = data?.pages.flatMap((page) => page.posts);
    return {
        posts,
        isLoading,
        isError,
        error,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage

    }
}