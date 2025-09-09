import { fetchPostById, fetchCommentsByPost, fetchPosts } from '../../services';
import { api } from '../../services/http';

jest.mock('../../services/http');

const mockedApi = api as jest.Mocked<typeof api>;

describe('Posts Service', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('fetchPostById returns post data with mocked fields', async () => {
        const post = { id: 1, title: 'Test Post', body: 'Test Body', userId: 1 };
        mockedApi.get.mockResolvedValue({ data: post });
        const result = await fetchPostById('1');
        expect(result).toEqual({
            ...post,
            userName: 'User 1',
            avatar: expect.any(String),
            timestamp: expect.any(String),
        });
        expect(mockedApi.get).toHaveBeenCalledWith('/posts/1');
    });

    test('fetchPostById throws error for invalid ID', async () => {
        mockedApi.get.mockRejectedValue(new Error('Not found'));
        await expect(fetchPostById('999')).rejects.toThrow('Not found');
        expect(mockedApi.get).toHaveBeenCalledWith('/posts/999');
    });

    test('fetchCommentsByPost returns comments from API', async () => {
        const comments = [
            { id: 1, postId: 1, name: 'Test', email: 'test@example.com', body: 'Comment' },
        ];
        mockedApi.get.mockResolvedValue({ data: comments });
        const result = await fetchCommentsByPost('1');
        expect(result).toEqual([
            {
                ...comments[0],
                avatar: expect.any(String),
                timestamp: expect.any(String),
            },
        ]);
        expect(mockedApi.get).toHaveBeenCalledWith('/posts/1/comments');
    });

    test('fetchPosts returns paginated posts with mocked fields', async () => {
        const posts = [
            { id: 1, title: 'Post 1', body: 'Body 1', userId: 1 },
            { id: 2, title: 'Post 2', body: 'Body 2', userId: 1 },
        ];
        mockedApi.get.mockResolvedValue({ data: posts });
        const result = await fetchPosts(1, 10);
        expect(result.posts).toEqual(
            posts.map((post) => ({
                ...post,
                userName: 'User 1',
                avatar: expect.any(String),
                timestamp: expect.any(String),
            })),
        );
        expect(result.total).toBe(100);
        expect(mockedApi.get).toHaveBeenCalledWith('/posts?_page=1&_limit=10');
    });
});