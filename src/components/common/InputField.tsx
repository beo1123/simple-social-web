'use client';

import { InputHTMLAttributes } from "react";

interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
    label: string;
    id: string;
}

export default function InputField({ label, id, ...props }: InputFieldProps) {
    return (
        <div className="flex flex-col gap-3">
            <label htmlFor={id} className="text-base font-medium text-gray-300">
                {label}
            </label>
            <input
                id={id}
                {...props}
                className="w-full px-5 py-4 rounded-xl bg-gray-900/70 border border-gray-600/50 
                   text-gray-100 placeholder-gray-500 text-base focus:ring-2 
                   focus:ring-blue-500 focus:border-transparent outline-none transition"
            />
        </div>
    );
}
