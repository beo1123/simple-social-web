import axios from "axios";
import bcrypt from "bcryptjs";
import { v4 as uuidv4 } from 'uuid';


export const api = axios.create({
    baseURL: "https://jsonplaceholder.typicode.com"
});

const USERS_KEY = 'users';

const getUsers = (): { id: string; email: string; hashedPassword: string; }[] => {
    const usersJson = localStorage.getItem(USERS_KEY);
    return usersJson ? JSON.parse(usersJson) : [];
}

const saveUser = (users: { id: string; email: string; hashedPassword: string; }[]) => {
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

export const signup = async (email: string, password: string) => {
    const users = getUsers();
    if (users.some(user => user.email === email)) {
        throw new Error('Email already exists');
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = { id: uuidv4(), email, hashedPassword };
    users.push(newUser);
    saveUser(users);
    return { user: { id: newUser.id, email }, token: 'fake-jwt-token-' + newUser.id };
}
export const login = async (email: string, password: string) => {
    const users = getUsers();
    const user = users.find((u) => u.email === email);
    if (!user) {
        throw new Error('User not found');
    }
    const isMatch = await bcrypt.compare(password, user.hashedPassword);
    if (!isMatch) {
        throw new Error('Invalid password');
    }
    return { user: { id: user.id, email }, token: 'fake-jwt-token-' + user.id };
};

export const resetUsers = () => localStorage.removeItem(USERS_KEY);