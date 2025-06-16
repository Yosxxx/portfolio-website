"use client";

import Image from "next/image";
import React from "react";

type Props = { onClose: () => void };

export default function AboutMeModal({ onClose }: Props) {
    return (
        <div
            className="fixed inset-0 bg-white/60 backdrop-blur-lg z-40 flex flex-col items-center justify-center"
            onClick={onClose}
        >
            <div
                className="relative  rounded-lg p-6 max-w-xl  w-full"
                onClick={(e) => e.stopPropagation()}
            >
                <div className=" rounded-md mb-4 flex items-center justify-center overflow-hidden">
                    <Image
                        src="/images/pfp.jpg"
                        alt="My profile"
                        width={200}
                        height={200}
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
            </div>
        </div>
    );
}
