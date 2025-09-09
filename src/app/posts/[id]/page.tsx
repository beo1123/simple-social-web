import PostDetail from '@/components/Post/PostDetail';

export default async function PostPage({ params }: { params: { id: string } }) {
    const { id } = await params;
    return <PostDetail postId={id} />;
}