"use client";

import Image from "next/image";
import React from "react";

type Props = { onClose: () => void };

export default function AboutMeModal({ onClose }: Props) {
    return (
        <div
            className="fixed inset-0 bg-white/60 backdrop-blur-sm z-40 flex flex-col items-center justify-center"
            onClick={onClose}
        >
            <div
                className="relative bg-white rounded-lg p-6 max-w-sm w-full"
                onClick={(e) => e.stopPropagation()}
            >
                <div className=" bg-gray-200 rounded-md mb-4 flex items-center justify-center overflow-hidden">
                    <Image
                        src="/images/pfp.jpg"
                        alt="My profile"
                        width={500}
                        height={500}
                        className=" object-cover"
                    />
                </div>

                <p className="text-center text-xl font-semibold mb-2">
                    Hi there!
                </p>
                <p className="text-justify">
                    I'm a 20-year-old Computer Science student at Bina
                    Nusantara, specializing in Artificial Intelligence. I love
                    “vibecoding”—replicating clean designs in code, adding my
                    own twist, and always crediting the originals. My toolkit
                    includes Python, C/C++, Java, JavaScript (React, Next.js,
                    Vite.js), and I work with SaaS back-ends like Supabase,
                    Clerk, Neon, and MySQL.
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
