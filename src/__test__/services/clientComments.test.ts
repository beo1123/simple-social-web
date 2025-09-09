import { getComments, createComment, fetchLocalCommentsByPost, resetComments } from '../../services/clientComments';

beforeAll(() => {
    // Simple mock localStorage
    const localStorageMock = (() => {
        let store: Record<string, string> = {};
        return {
            getItem: (key: string) => store[key] || null,
            setItem: (key: string, value: string) => { store[key] = value.toString(); },
            removeItem: (key: string) => { delete store[key]; },
            clear: () => { store = {}; }
        };
    })();

    Object.defineProperty(global, 'localStorage', {
        value: localStorageMock,
        writable: true,
    });
});



describe('Client Comments Service', () => {
    beforeEach(() => {
        resetComments();
    });


    test('createComment adds comment to localStorage', async () => {
        const comment = createComment('1', {
            email: 'test@example.com',
            name: 'Test',
            body: 'New comment',
        });
        expect(comment).toEqual({
            id: expect.any(String),
            postId: 1,
            email: 'test@example.com',
            name: 'Test',
            body: 'New comment',
            avatar: expect.any(String),
            timestamp: expect.any(String),
        });
        const comments = getComments();
        expect(comments).toContainEqual(comment);
    });

    test('fetchLocalCommentsByPost returns comments for postId', () => {
        createComment('1', { email: 'test@example.com', name: 'Test', body: 'Comment 1' });
        createComment('2', { email: 'test@example.com', name: 'Test', body: 'Comment 2' });
        const comments = fetchLocalCommentsByPost('1');
        expect(comments).toHaveLength(1);
        expect(comments[0].postId).toBe(1);
    });

    test('resetComments clears localStorage', () => {
        createComment('1', { email: 'test@example.com', name: 'Test', body: 'Comment' });
        resetComments();
        expect(getComments()).toEqual([]);
    });
});