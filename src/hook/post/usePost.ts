'use client';
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { useUser } from "@/hook/auth/useUser";
import { useAuth } from "@/hook/auth/useAuth";
import { UsePostResult } from "@/type/UsePostResult"
import { fetchCommentsByPost, fetchPostById } from "@/services";
import { createComment as createLocalComment, fetchLocalCommentsByPost } from '@/services/clientComments';

export const usePost = (postId: string): UsePostResult => {
    const queryClient = useQueryClient();

    const user = useUser();
    const isAuthenticated = useAuth();

    const { data: post, isLoading: postLoading, isError: postError, error: postErrorData } = useQuery({
        queryKey: ['post', postId],
        queryFn: () => fetchPostById(postId),
        enabled: isAuthenticated
    });

    const { data: apiComments, isLoading: commentsLoading, isError: commentsError, error: commentsErrorData } = useQuery({
        queryKey: ['comments', postId],
        queryFn: () => fetchCommentsByPost(postId),
        enabled: isAuthenticated
    });
    const localComments = fetchLocalCommentsByPost(postId);

    const comments = [...(apiComments || []), ...localComments];

    const mutation = useMutation({
        mutationFn: (data: { body: string }) =>
            createLocalComment(postId, {
                email: user?.email || 'anonymous@example.com',
                name: user?.email || 'anonymous@example.com',
                body: data.body
            }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['comments', postId], });
        },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        onError: (error: any) => {
            console.error('Error adding comment:', error);
        },
    });

    return {
        post,
        comments,
        isLoading: postLoading || commentsLoading,
        isError: postError || commentsError,
        error: postErrorData || commentsErrorData,
        addComment: (data: { body: string }) => mutation.mutate(data),
        isCommenting: mutation.isPending
    }
}