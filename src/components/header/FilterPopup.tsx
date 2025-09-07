'use client';

import { ReactNode } from "react";

interface FilterPopupProps {
    open: boolean;
    onClose: () => void;
    children: ReactNode;
    className?: string;
}

export default function FilterPopup({ open, onClose, children, className }: FilterPopupProps) {
    if (!open) return null;

    return (
        <>
            {/* Overlay mờ nhẹ, click ra ngoài đóng popup */}
            <div
                className="fixed inset-0 z-40 bg-black/10"
                onClick={onClose}
            />

            {/* Popup */}
            <div className={`fixed z-50 top-1/2 start-1/2 -translate-x-1/2 -translate-y-1/2 bg-white dark:bg-gray-900 shadow-lg rounded-lg p-4 w-11/12 max-w-md ${className || ""}`}>
                {children}
            </div>
        </>
    );
}
