// src/components/CreditsModal.tsx
"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

type Props = { onClose: () => void };

export default function CreditsModal({ onClose }: Props) {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="fixed inset-0 bg-white/60 backdrop-blur-lg z-40 flex items-center justify-center"
            onClick={onClose}
        >
            <div
                className="relative rounded-lg p-6 max-w-3xl w-full"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="w-full h-auto bg-gray-200 rounded-md mb-4 overflow-hidden">
                    <Image
                        src="/images/credits/Unveil.jpeg"
                        alt="Credits Inspiration"
                        width={1200}
                        height={1000}
                        className="object-cover"
                    />
                </div>

                <p className="text-center text-lg font-semibold mb-4">
                    Credits & Inspiration
                </p>
                <div className="text-center">
                    <Link
                        href="https://unveil.fr/"
                        className="hover:text-cloud-200"
                    >
                        Unveil.fr
                    </Link>
                </div>
            </div>
        </motion.div>
    );
}
