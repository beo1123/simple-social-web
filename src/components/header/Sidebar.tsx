'use client';

import { ReactNode } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store';
import { setSortBy, setFilterByUser } from '@/features/search/searchSlice';
import SearchBar from './SearchBar';

interface SidebarProps {
    open: boolean;
    onClose: () => void;
    children: ReactNode;
}

export default function Sidebar({ open, onClose, children }: SidebarProps) {
    const { sortBy, filterByUser } = useSelector((state: RootState) => state.search);
    const dispatch = useDispatch();

    // Mock user list
    const users = [
        { id: '', name: 'All Users' },
        { id: '1', name: 'User 1' },
        { id: '2', name: 'User 2' },
        { id: '3', name: 'User 3' },
    ];

    if (!open) return null;

    return (
        <>
            {/* Overlay */}
            <div className="fixed inset-0 z-40 bg-black/10" onClick={onClose} />

            {/* Sidebar */}
            <div className="fixed z-50 top-0 right-0 h-full w-64 bg-white dark:bg-gray-900 shadow-lg p-4">
                <button
                    className="absolute top-4 right-4 text-gray-600 dark:text-gray-300"
                    onClick={onClose}
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
                <div className="mt-8 space-y-4">
                    {children}
                    <SearchBar />
                    <select
                        value={sortBy}
                        onChange={(e) => dispatch(setSortBy(e.target.value as 'newest' | 'oldest'))}
                        className="w-full p-2 border rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white text-sm"
                    >
                        <option value="newest">Newest First</option>
                        <option value="oldest">Oldest First</option>
                    </select>
                    <select
                        value={filterByUser}
                        onChange={(e) => dispatch(setFilterByUser(e.target.value))}
                        className="w-full p-2 border rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white text-sm"
                    >
                        {users.map((user) => (
                            <option key={user.id} value={user.id}>{user.name}</option>
                        ))}
                    </select>
                </div>
            </div>
        </>
    );
}