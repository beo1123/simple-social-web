'use client';

import { ChangeEvent, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store';
import { setSearchQuery } from '@/features/search/searchSlice';
import { useDebounce } from '@/hook/useDebounce';

interface SearchBarProps {
    placeholder?: string;
    className?: string;
    delay?: number;
}

export default function SearchBar({ placeholder = "Search posts...", className, delay = 500 }: SearchBarProps) {
    const dispatch = useDispatch();
    const searchQuery = useSelector((state: RootState) => state.search.searchQuery);
    const [localValue, setLocalValue] = useState(searchQuery);
    const debouncedValue = useDebounce(localValue, delay);

    if (debouncedValue !== searchQuery) {
        dispatch(setSearchQuery(debouncedValue));
    }

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setLocalValue(e.target.value);
    };

    return (
        <div className={`relative w-full ${className || ''}`}>
            {/* Search icon */}
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <svg
                    className="w-4 h-4 text-gray-500 dark:text-gray-400"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 20"
                >
                    <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                    />
                </svg>
            </div>

            {/* Input */}
            <input
                type="text"
                value={localValue}
                onChange={handleChange}
                placeholder={placeholder}
                className="w-full p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50
                           focus:ring-blue-500 focus:border-blue-500
                           dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
            />
        </div>
    );
}
