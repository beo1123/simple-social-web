'use client';

import { ButtonHTMLAttributes } from "react";
import clsx from 'clsx';

interface PrimaryButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children?: React.ReactNode;
    type?: "button" | "submit" | "reset";
}

export default function PrimaryButton({
    children,
    type = "button",
    className,
    ...props
}: PrimaryButtonProps) {
    const defaultClasses = "w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold shadow-lg hover:opacity-90 focus:ring-4 focus:ring-blue-400 transition disabled:opacity-60 disabled:cursor-not-allowed";

    return (
        <button
            type={type}
            {...props}
            className={clsx(className, defaultClasses)}
        >
            {children}
        </button>
    );
}