import { PostComment } from "./Comment";
import { Post } from "./Post";

export interface UsePostResult {
    post: Post | undefined;
    comments: PostComment[] | undefined;
    isLoading: boolean;
    isError: boolean;
    error: unknown;
    addComment: (comment: { body: string }) => void;
    isCommenting: boolean;
}