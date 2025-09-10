import { Post } from "./Post";

export interface UsePostsResult {
    posts: Post[] | undefined;
    users: { id: string; name: string }[];
    isLoading: boolean;
    isError: boolean;
    error: unknown;
    fetchNextPage: () => void;
    hasNextPage: boolean | undefined;
    isFetchingNextPage: boolean;
}