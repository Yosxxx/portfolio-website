// src/components/Navbar.tsx
"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence } from "framer-motion";
import AboutMeModal from "./AboutMeModal";
import CreditsModal from "./CreditsModal";

type ModalType = "about" | "credits" | null;

export default function Navbar() {
    const pathname = usePathname();
    const [activeModal, setActiveModal] = useState<ModalType>(null);

    const isPortfoliosActive = pathname === "/" && activeModal === null;
    const isAboutActive = activeModal === "about";
    const isCreditsActive = activeModal === "credits";

    return (
        <>
            <nav className="absolute top-0 left-0 w-full z-50 flex gap-x-1">
                {/* PORTFOLIOS */}
                <Link
                    href="/"
                    onClick={() => setActiveModal(null)}
                    className={
                        `bg-cloud-200 pt-12 pr-15 pb-2 pl-2 rounded-xl mt-2 ml-2 text-sm transition-colors duration-300 ease-in-out ` +
                        (isPortfoliosActive
                            ? "text-black border border-black"
                            : "text-cloud-300 border border-cloud-300")
                    }
                >
                    PORTFOLIOS
                </Link>

                {/* ABOUT ME */}
                <button
                    onClick={() =>
                        setActiveModal(isAboutActive ? null : "about")
                    }
                    className={
                        `bg-cloud-200 pt-12 pr-15 pb-2 pl-2 rounded-xl mt-2 ml-2 text-sm transition-colors duration-300 ease-in-out ` +
                        (isAboutActive
                            ? "text-black border border-black"
                            : "text-cloud-300 border border-cloud-300")
                    }
                >
                    ABOUT ME
                </button>

                {/* CREDITS / INSPIRATION */}
                <button
                    onClick={() =>
                        setActiveModal(isCreditsActive ? null : "credits")
                    }
                    className={
                        `bg-cloud-200 pt-12 pr-15 pb-2 pl-2 rounded-xl mt-2 ml-2 text-sm transition-colors duration-300 ease-in-out ` +
                        (isCreditsActive
                            ? "text-black border border-black"
                            : "text-cloud-300 border border-cloud-300")
                    }
                >
                    CREDITS / INSPIRATION
                </button>
            </nav>

            <AnimatePresence>
                {isAboutActive && (
                    <AboutMeModal
                        key="about"
                        onClose={() => setActiveModal(null)}
                    />
                )}
                {isCreditsActive && (
                    <CreditsModal
                        key="credits"
                        onClose={() => setActiveModal(null)}
                    />
                )}
            </AnimatePresence>
        </>
    );
}
