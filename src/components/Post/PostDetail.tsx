'use client';

import { useRouter } from 'next/navigation';
import PostCard from './PostCard';
import CommentForm from './CommentForm';
import Image from 'next/image';
import { usePost } from '@/hook/post/usePost';
import { useAuth } from '@/hook/auth/useAuth';
import { useEffect, useRef } from 'react';
import PostDetailLoading from '../Loading/PostDetailLoading';

export default function PostDetail({ postId }: { postId: string }) {
    const router = useRouter();
    const isAuthenticated = useAuth();
    const { post, comments, isLoading, isError, error } = usePost(postId);

    const commentsEndRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (isAuthenticated === false) {
            router.push('/login');
        }
    }, [isAuthenticated, router]);

    useEffect(() => {
        if (comments && comments.length > 0) {
            commentsEndRef.current?.scrollIntoView({ behavior: 'smooth' });
        }
    }, [comments]);

    if (isLoading) return <PostDetailLoading />;
    if (isError) return <div className="text-center p-4 text-red-500">Error: {(error as Error)?.message}</div>;
    if (!post) return <div className="text-center p-4">Post not found</div>;

    return (
        <div className="container mt-7 mx-auto p-6 max-w-3xl rounded-2xl bg-accent h-[80vh] flex flex-col shadow-lg">
            <div className="shrink-0">
                <PostCard post={post} />
            </div>
            <h2 className="text-xl font-bold mb-4">Comments</h2>

            <div className="flex-1 overflow-y-auto pr-2">
                {comments && comments.length > 0 ? (
                    <ul className="space-y-5">
                        {comments.map((comment) => (
                            <li key={comment.id} className="flex items-start space-x-3">
                                <Image
                                    src={comment.avatar}
                                    alt="Avatar"
                                    width={40}
                                    height={40}
                                    className="w-10 h-10 rounded-full"
                                />
                                <div className="flex-1 bg-gray-100 p-4 rounded-xl">
                                    <p className="font-semibold">{comment.name}</p>
                                    <p className="text-gray-500 text-xs mb-1">
                                        {new Date(comment.timestamp).toLocaleString('en-US', {
                                            month: 'short',
                                            day: 'numeric',
                                            year: 'numeric',
                                            hour: '2-digit',
                                            minute: '2-digit',
                                        })}
                                    </p>
                                    <p className="text-gray-800">{comment.body}</p>
                                </div>
                            </li>
                        ))}
                        {/* Scroll target */}
                        <div ref={commentsEndRef} />
                    </ul>
                ) : (
                    <p className="text-gray-500">No comments yet.</p>
                )}
            </div>

            {/* Comment form (cố định dưới cùng, không scroll) */}
            <div className="shrink-0 mt-4">
                <CommentForm postId={postId} />
            </div>
        </div>
    );
}
