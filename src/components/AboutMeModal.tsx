"use client";

import Image from "next/image";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import profile_picture from "../../public/images/profile-picture/picture.jpg";

type Props = { onClose: () => void };

const greetings = [
    "Hi there!",
    "Hola!",
    "Bonjour!",
    "Hallo!",
    "Ciao!",
    "こんにちは！",
    "你好！",
];

export default function AboutMeModal({ onClose }: Props) {
    const [text, setText] = useState("");
    const [isDeleting, setIsDeleting] = useState(false);
    const [loopNum, setLoopNum] = useState(0);

    const typingSpeed = 150;
    const deletingSpeed = 50;
    const pauseSpeed = 1000;

    useEffect(() => {
        const i = loopNum % greetings.length;
        const fullText = greetings[i];
        let timeout: ReturnType<typeof setTimeout>;

        if (!isDeleting && text.length < fullText.length) {
            timeout = setTimeout(() => {
                setText(fullText.substring(0, text.length + 1));
            }, typingSpeed);
        } else if (!isDeleting && text === fullText) {
            timeout = setTimeout(() => {
                setIsDeleting(true);
            }, pauseSpeed);
        } else if (isDeleting && text.length > 0) {
            timeout = setTimeout(() => {
                setText(fullText.substring(0, text.length - 1));
            }, deletingSpeed);
        } else if (isDeleting && text === "") {
            timeout = setTimeout(() => {
                setIsDeleting(false);
                setLoopNum((prev) => prev + 1);
            }, pauseSpeed);
        }

        return () => clearTimeout(timeout);
    }, [text, isDeleting, loopNum]);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="fixed inset-0 bg-white/60 backdrop-blur-lg z-40 flex flex-col items-center justify-center"
            onClick={onClose}
        >
            <div
                className="relative rounded-lg p-6 max-w-xl w-full"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="rounded-md mb-4 flex items-center justify-center overflow-hidden">
                    <Image
                        src={profile_picture}
                        alt="My profile"
                        width={200}
                        height={200}
                        className="object-cover rounded-full"
                    />
                </div>

                {/* Smooth typewriter greeting with blinking '|' */}
                <p className="text-center text-xl font-semibold mb-2 h-6 flex justify-center">
                    {text}
                    <motion.span
                        className="ml-1"
                        animate={{ opacity: [1, 0, 1] }}
                        transition={{
                            repeat: Infinity,
                            duration: 0.8,
                            ease: "linear",
                        }}
                    >
                        |
                    </motion.span>
                </p>

                <p className="text-justify">
                    I&apos;m a 20-year-old Computer Science student at Bina
                    Nusantara, specializing in Artificial Intelligence. I love
                    replicating clean designs, adding my own twist, and always
                    crediting the originals. My toolkit includes Python, C/C++,
                    Java, JavaScript (React, Next.js, Vite.js), and I work with
                    SaaS back-ends like Supabase, Clerk, Neon, and MySQL.
                </p>
            </div>
        </motion.div>
    );
}
