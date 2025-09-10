'use client';

import { useState } from 'react';
import { useAuth } from '@/hook/auth/useAuth';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { logout } from '@/features/auth/authSlice';
import { setSortBy, setFilterByUser } from '@/features/search/searchSlice';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store';
import PrimaryButton from '../common/PrimaryButton';
import SearchBar from './SearchBar';
import Sidebar from './Sidebar';

export default function Header() {
    const dispatch = useDispatch();
    const isAuthenticated = useAuth();
    const pathname = usePathname();
    const { sortBy, filterByUser } = useSelector((state: RootState) => state.search);
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const handleLogOut = () => {
        dispatch(logout());
        setSidebarOpen(false);
    };

    const users = [
        { id: '', name: 'All Users' },
        { id: '1', name: 'User 1' },
        { id: '2', name: 'User 2' },
        { id: '3', name: 'User 3' },
    ];

    return (
        <nav className="sticky top-0 z-50 bg-white border-b border-gray-200 dark:bg-gray-900 dark:border-gray-700 shadow-sm">
            <div className="max-w-screen-xl flex items-center justify-between mx-auto px-4 py-3 md:py-4">
                {/* Logo */}
                <Link href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
                    <Image
                        width={32}
                        height={32}
                        src="https://upload.wikimedia.org/wikipedia/commons/8/8e/Nextjs-logo.svg"
                        alt="Next.js Logo"
                    />
                    <span className="hidden sm:block text-lg font-semibold text-gray-800 dark:text-white">NewsFeed</span>
                </Link>

                {/* Desktop Search and Filters */}
                <div className="hidden md:flex flex-1 items-center justify-center space-x-4 px-6">
                    <SearchBar />
                    <select
                        value={sortBy}
                        onChange={(e) => dispatch(setSortBy(e.target.value as 'newest' | 'oldest'))}
                        className="p-2 border rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white text-sm"
                    >
                        <option value="newest">Newest First</option>
                        <option value="oldest">Oldest First</option>
                    </select>
                    <select
                        value={filterByUser}
                        onChange={(e) => dispatch(setFilterByUser(e.target.value))}
                        className="p-2 border rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white text-sm"
                    >
                        {users.map((user) => (
                            <option key={user.id} value={user.id}>{user.name}</option>
                        ))}
                    </select>
                </div>

                {/* Mobile Menu Button */}
                <button
                    className="md:hidden text-gray-600 dark:text-gray-300 focus:outline-none"
                    onClick={() => setSidebarOpen(!sidebarOpen)}
                >
                    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d={sidebarOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}
                        />
                    </svg>
                </button>

                {/* Desktop Links */}
                <div className="hidden md:flex items-center space-x-4 md:order-2">
                    {isAuthenticated ? (
                        <PrimaryButton className="px-3 py-1 rounded text-sm" onClick={handleLogOut}>
                            Log Out
                        </PrimaryButton>
                    ) : (
                        <ul className="flex items-center space-x-6">
                            <li>
                                <Link
                                    href="/login"
                                    className={`text-sm font-medium ${pathname === '/login' ? 'text-blue-600' : 'text-gray-700 dark:text-gray-200'} hover:text-blue-600`}
                                >
                                    Login
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/signup"
                                    className={`text-sm font-medium ${pathname === '/signup' ? 'text-blue-600' : 'text-gray-700 dark:text-gray-200'} hover:text-blue-600`}
                                >
                                    Sign Up
                                </Link>
                            </li>
                        </ul>
                    )}
                </div>
            </div>

            {/* Mobile Sidebar */}
            <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)}>
                {isAuthenticated ? (
                    <PrimaryButton className="px-3 py-1 rounded text-lg" onClick={handleLogOut}>
                        Log Out
                    </PrimaryButton>
                ) : (
                    <div className="flex flex-col space-y-2">
                        <Link
                            href="/login"
                            className="block px-3 py-2 rounded text-gray-900 dark:text-white"
                            onClick={() => setSidebarOpen(false)}
                        >
                            Login
                        </Link>
                        <Link
                            href="/signup"
                            className="block px-3 py-2 rounded text-gray-900 dark:text-white"
                            onClick={() => setSidebarOpen(false)}
                        >
                            Sign Up
                        </Link>
                    </div>
                )}

            </Sidebar>
        </nav>
    );
}