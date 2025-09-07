'use client';
import { ReactNode } from "react";

interface SidebarProps {
    open: boolean;
    onClose: () => void;
    children: ReactNode;
}

export default function Sidebar({ open, onClose, children }: SidebarProps) {
    return (
        <>
            {/* Overlay */}
            {open && (
                <div
                    className="fixed inset-0 z-40 bg-black/70"
                    onClick={onClose}
                />
            )}

            {/* Sidebar Panel */}
            <div
                className={`fixed top-0 right-0 z-50 w-64 h-full bg-white dark:bg-gray-900 shadow-lg transform transition-transform duration-300 ${open ? "translate-x-0" : "translate-x-full"
                    }`}
            >
                <div className="flex flex-col p-4 space-y-4">
                    {children}
                </div>
            </div>
        </>
    );
}
