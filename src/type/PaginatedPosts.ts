import { Post } from "./post";

export interface PaginatedPosts {
    posts: Post[];
    total: number;
}