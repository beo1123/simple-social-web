'use client';

import { PostComment } from '@/type/Comment';

const COMMENTS_KEY = 'comments';

export const getComments = (): PostComment[] => {
    if (typeof window === 'undefined') return []; // Avoid server-side access
    const commentsJson = localStorage.getItem(COMMENTS_KEY);
    return commentsJson ? JSON.parse(commentsJson) : [];
};

export const saveComments = (comments: PostComment[]) => {
    if (typeof window !== 'undefined') {
        localStorage.setItem(COMMENTS_KEY, JSON.stringify(comments));
    }
};

export const createComment = async (
    postId: string,
    comment: { email: string; name: string; body: string }
): Promise<PostComment> => {
    const comments = getComments();
    const newComment: PostComment = {
        id: Math.random(),
        postId: parseInt(postId),
        ...comment,
        avatar: `https://i.pravatar.cc/40?img=${Math.floor(Math.random() * 100)}`,
        timestamp: new Date().toISOString(),
    };
    comments.push(newComment);
    saveComments(comments);
    return newComment;
};


export const fetchLocalCommentsByPost = (postId: string): PostComment[] => {
    const comments = getComments();
    return comments.filter(c => c.postId === parseInt(postId));
};

export const resetComments = () => {
    if (typeof window !== 'undefined') {
        localStorage.removeItem(COMMENTS_KEY);
    }
};