'use client';

import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { usePost } from '@/hook/post/usePost';
import Image from 'next/image';

const commentSchema = z.object({
    body: z.string().min(1, 'Comment cannot be empty'),
});

type CommentForm = z.infer<typeof commentSchema>;

export default function CommentForm({ postId }: { postId: string }) {
    const { addComment, isCommenting } = usePost(postId);
    const { register, handleSubmit, reset, formState: { errors } } = useForm<CommentForm>({
        resolver: zodResolver(commentSchema),
    });

    const onSubmit = (data: CommentForm) => {
        addComment(data);
        reset();
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="mt-4 flex items-start space-x-2">
            <Image width={400} height={400} src="https://i.pravatar.cc/40?img=1" alt="Avatar" className="w-8 h-8 rounded-full" />
            <div className="flex-1">
                <textarea
                    {...register('body')}
                    placeholder="Write a comment..."
                    className="w-full p-2 border rounded-lg bg-gray-100"
                    rows={2}
                />
                {errors.body && <p className="text-red-500 text-sm">{errors.body.message}</p>}
                <button
                    type="submit"
                    className="mt-2 bg-blue-500 text-white px-4 py-1 rounded-full disabled:bg-gray-400"
                    disabled={isCommenting}
                >
                    {isCommenting ? 'Posting...' : 'Post'}
                </button>
            </div>
        </form>
    );
}