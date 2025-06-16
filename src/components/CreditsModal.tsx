"use client";

import React from "react";

type Props = { onClose: () => void };

export default function CreditsModal({ onClose }: Props) {
    return (
        <div
            className="fixed inset-0 bg-white/60 backdrop-blur-sm z-40 flex flex-col items-center justify-center"
            onClick={onClose}
        >
            <div
                className="relative bg-white rounded-lg p-6 max-w-sm w-full"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Placeholder image */}
                <div className="w-full h-48 bg-gray-200 rounded-md mb-4 flex items-center justify-center">
                    <span className="text-gray-500">Credits Placeholder</span>
                </div>

                <p className="text-center text-lg mb-2">
                    Credits & Inspiration
                </p>

                <button
                    onClick={onClose}
                    className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
                >
                    ✕
                </button>
            </div>
        </div>
    );
}
