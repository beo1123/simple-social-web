'use client';


import { useRouter } from 'next/navigation';

import PostCard from './PostCard';
import CommentForm from './CommentForm';
import Image from 'next/image';
import { usePost } from '@/hook/post/usePost';
import { useAuth } from '@/hook/auth/useAuth';
import { useEffect } from 'react';
import PostDetailLoading from '../Loading/PostDetailLoading';

export default function PostDetail({ postId }: { postId: string }) {
    const router = useRouter();
    const isAuthenticated = useAuth();
    const { post, comments, isLoading, isError, error } = usePost(postId);

    useEffect(() => {
        if (isAuthenticated === false) {
            router.push('/login');
        }
    }, [isAuthenticated, router]);

    if (isLoading) return <PostDetailLoading />;
    if (isError) return <div className="text-center p-4 text-red-500">Error: {(error as Error)?.message}</div>;
    if (!post) return <div className="text-center p-4">Post not found</div>;

    return (
        <div className="container mx-auto p-4 max-w-2xl">
            <PostCard post={post} />
            <div className="mt-4">
                <h2 className="text-lg font-semibold mb-2">Comments</h2>
                {comments && comments.length > 0 ? (
                    <ul className="space-y-4">
                        {comments.map((comment) => (
                            <li key={comment.id} className="flex items-start space-x-2">
                                <Image
                                    src={comment.avatar}
                                    alt="Avatar"
                                    width={32}
                                    height={32}
                                    className="w-8 h-8 rounded-full"
                                />
                                <div className="flex-1 bg-gray-100 p-3 rounded-lg">
                                    <p className="font-semibold">{comment.name}</p>
                                    <p className="text-gray-500 text-sm">
                                        {new Date(comment.timestamp).toLocaleString('en-US', {
                                            month: 'short',
                                            day: 'numeric',
                                            year: 'numeric',
                                            hour: '2-digit',
                                            minute: '2-digit',
                                        })}
                                    </p>
                                    <p>{comment.body}</p>
                                </div>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-gray-500">No comments yet.</p>
                )}
                <CommentForm postId={postId} />
            </div>
        </div>
    );
}