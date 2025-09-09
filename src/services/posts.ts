import { api } from '@/services/http';
import { Post } from '@/type/Post';
import { PaginatedPosts } from '@/type/PaginatedPosts';
import { PostComment } from '@/type/Comment';

export const fetchPostById = async (id: string): Promise<Post> => {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    const { data } = await api.get(`/posts/${id}`);
    return {
        ...data,
        userName: `User ${data.userId}`,
        avatar: `https://i.pravatar.cc/40?img=${data.userId}`,
        timestamp: new Date(Date.now() - data.id * 24 * 60 * 60 * 1000).toISOString(),
    };
};

export const fetchCommentsByPost = async (postId: string): Promise<PostComment[]> => {
    const { data } = await api.get(`/posts/${postId}/comments`);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return data.map((comment: any) => ({
        ...comment,
        avatar: `https://i.pravatar.cc/40?img=${comment.id}`,
        timestamp: new Date(Date.now() - comment.id * 60 * 60 * 1000).toISOString(),
    }));
};

export const fetchPosts = async (page: number, limit: number): Promise<PaginatedPosts> => {
    await new Promise((resolve) => setTimeout(resolve, 2000));

    const { data } = await api.get(`/posts?_page=${page}&_limit=${limit}`);
    return {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        posts: data.map((post: any) => ({
            ...post,
            userName: `User ${post.userId}`,
            avatar: `https://i.pravatar.cc/40?img=${post.userId}`,
            timestamp: new Date(Date.now() - post.id * 24 * 60 * 60 * 1000).toISOString(),
        })),
        total: 100,
    };
};