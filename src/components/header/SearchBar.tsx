'use client';

import { useState } from "react";
import FilterPopup from "./FilterPopup";

interface SearchBarProps {
    onSearch?: (value: string) => void;
    placeholder?: string;
    className?: string;
}

export default function SearchBar({ onSearch, placeholder = "Search...", className }: SearchBarProps) {
    const [query, setQuery] = useState("");
    const [filterOpen, setFilterOpen] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(e.target.value);
        if (onSearch) onSearch(e.target.value);
    };

    return (
        <div className={`relative w-full ${className || ""}`}>
            {/* Search icon */}
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                </svg>
            </div>

            {/* Input */}
            <input
                type="text"
                value={query}
                onChange={handleChange}
                placeholder={placeholder}
                className="w-full p-2 ps-10 pe-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
            />

            {/* Filter icon */}
            <button
                type="button"
                onClick={() => setFilterOpen(true)}
                className="absolute inset-y-0 end-2 flex items-center text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-.293.707L15 13.414V19a1 1 0 01-1.447.894l-4-2A1 1 0 019 17v-3.586L3.293 6.707A1 1 0 013 6V4z" />
                </svg>
            </button>

            {/* Popup Filter */}
            <FilterPopup open={filterOpen} onClose={() => setFilterOpen(false)}>
                <h3 className="text-lg font-semibold mb-2 text-white">Filter Options</h3>
                {/* Nội dung filter tùy chỉnh */}
                <div className="flex flex-col space-y-2 text-white">
                    <label>
                        <input type="checkbox" className="mr-2" /> Option 1
                    </label>
                    <label>
                        <input type="checkbox" className="mr-2" /> Option 2
                    </label>
                    <label>
                        <input type="checkbox" className="mr-2" /> Option 3
                    </label>
                </div>
                <div className="mt-4 flex justify-end">
                    <button className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600" onClick={() => setFilterOpen(false)}>
                        Apply
                    </button>
                </div>
            </FilterPopup>
        </div>
    );
}
