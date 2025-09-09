'use client';

import Link from 'next/link';
import { useState } from 'react';
import Image from 'next/image';
import { Post } from '@/type/Post';

export default function PostCard({ post }: { post: Post }) {
    const [likes, setLikes] = useState(0);

    return (
        <div className="bg-white shadow-md rounded-lg p-4 mb-4">
            <div className="flex items-center mb-2">
                <Image
                    src={post.avatar}
                    alt="Avatar"
                    width={40}
                    height={40}
                    className="w-10 h-10 rounded-full mr-2"
                />
                <div>
                    <p className="font-semibold">{post.userName}</p>
                    <p className="text-gray-500 text-sm">
                        {new Date(post.timestamp).toLocaleString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit',
                        })}
                    </p>
                </div>
            </div>
            <Link href={`/posts/${post.id}`}>
                <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
                <p className="text-gray-700 line-clamp-3">{post.body}</p>
            </Link>
            <div className="flex justify-between mt-4 text-gray-600">
                <button onClick={() => setLikes(likes + 1)} className="flex items-center space-x-1 hover:text-blue-500">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                    </svg>
                    <span>{likes} Like</span>
                </button>
                <Link href={`/posts/${post.id}`} className="flex items-center space-x-1 hover:text-blue-500">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M21 8h-6V6c0-1.1-.9-2-2-2h-2c-1.1 0-2 .9-2 2v2H3v2h18V8zM11 6h2v2h-2V6zm0 4v8h2v-8h-2z" />
                    </svg>
                    <span>Comment</span>
                </Link>
                <button className="flex items-center space-x-1 hover:text-blue-500">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.70l7.13-4.14c.52.47 1.2.77 1.96.77 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.34 6.82 9.04 6.06 9.04c-1.66 0-3 1.34-3 3s1.34 3 3 3c.76 0 1.44-.3 1.96-.77l7.13 4.14c-.05.23-.09.46-.09.7 0 1.66 1.34 3 3 3s3-1.34 3-3-1.34-3-3-3z" />
                    </svg>
                    <span>Share</span>
                </button>
            </div>
        </div>
    );
}