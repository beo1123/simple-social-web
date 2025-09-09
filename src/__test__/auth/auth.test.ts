import { login, resetUsers, signup } from "../../services/auth";

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


beforeEach(() => resetUsers());

test('sign up and login successfully', async () => {
    await signup('test@example.com', 'password123');
    const data = await login('test@example.com', 'password123');
    expect(data.user.email).toBe('test@example.com');
});

test('login fails with wrong password', async () => {
    await signup('test@example.com', 'password123');
    await expect(login('test@example.com', 'wrong')).rejects.toThrow('Invalid password');
});