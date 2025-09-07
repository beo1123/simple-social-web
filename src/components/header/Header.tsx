'use client';

import { useState } from "react";
import { useAuth } from "@/hook/useAuth";
import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { logout } from '../../features/auth/authSlice';
import { useDispatch } from "react-redux";
import PrimaryButton from "../common/PrimaryButton";
import SearchBar from "./SearchBar";
import Sidebar from "./Sidebar";

export default function Header() {
    const dispatch = useDispatch();
    const isAuthenticated = useAuth();
    const pathname = usePathname();

    const [sidebarOpen, setSidebarOpen] = useState(false);
    const handleLogOut = () => {
        dispatch(logout());
        setSidebarOpen(false);
    };

    return (
        <nav className="sticky top-0 z-50 bg-white border-gray-200 dark:bg-gray-900">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                {/* Logo */}
                <Link href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
                    <Image
                        width={300}
                        height={300}
                        src="https://upload.wikimedia.org/wikipedia/commons/8/8e/Nextjs-logo.svg"
                        className="h-8"
                        alt="Next.js Logo"
                    />
                </Link>

                {/* Desktop Search */}
                <div className="flex md:order-1 hidden md:block">
                    <SearchBar onSearch={(q) => console.log("Search desktop:", q)} />
                </div>

                {/* Mobile Menu Button */}
                <button
                    className="md:hidden text-gray-500 dark:text-gray-400 focus:outline-none"
                    onClick={() => setSidebarOpen(!sidebarOpen)}
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={sidebarOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
                    </svg>
                </button>

                {/* Desktop Links */}
                <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-2" id="navbar-search">
                    {isAuthenticated ? (
                        <div>
                            <PrimaryButton className="px-3 py-1 rounded text-lg" onClick={handleLogOut}>Log Out</PrimaryButton>
                        </div>
                    ) : (
                        <div>
                            <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                                <li>
                                    <Link
                                        href="/login"
                                        className={`block py-2 px-3 rounded-sm ${pathname === "/login" ? "text-blue-700 md:text-blue-700" : "text-gray-900 dark:text-white"} hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:hover:bg-gray-700 md:dark:hover:text-blue-500`}
                                    >
                                        Login
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="/signup"
                                        className={`block py-2 px-3 rounded-sm ${pathname === "/signup" ? "text-blue-700 md:text-blue-700" : "text-gray-900 dark:text-white"} hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:hover:bg-gray-700 md:dark:hover:text-blue-500`}
                                    >
                                        Sign Up
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    )}
                </div>
            </div>

            {/* Mobile Sidebar */}
            <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)}>
                {isAuthenticated ? (
                    <PrimaryButton className="px-3 py-1 rounded text-lg" onClick={handleLogOut}>Log Out</PrimaryButton>
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
                <div className="mt-4">
                    <SearchBar onSearch={(q) => console.log("Search sidebar:", q)} />
                </div>
            </Sidebar>
        </nav>
    );
}
