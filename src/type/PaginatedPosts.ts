import { Post } from "./Post";

export interface PaginatedPosts {
    posts: Post[];
    total: number;
}