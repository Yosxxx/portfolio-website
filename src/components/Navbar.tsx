"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import AboutMeModal from "./AboutMeModal";
import CreditsModal from "./CreditsModal";

type ModalType = "about" | "credits" | null;

export default function Navbar() {
    const pathname = usePathname();
    const [activeModal, setActiveModal] = useState<ModalType>(null);

    return (
        <>
            <nav className="absolute top-0 left-0 w-full z-50 flex gap-x-1">
                <Link
                    href="/"
                    onClick={() => setActiveModal(null)}
                    className={
                        `bg-cloud-200 pt-12 pr-15 pb-2 pl-2 border border-cloud-300 rounded-xl mt-2 ml-2 text-sm text-cloud-300 ` +
                        (pathname === "/" ? "text-black" : "")
                    }
                >
                    PORTFOLIOS
                </Link>

                <button
                    onClick={() =>
                        setActiveModal(activeModal === "about" ? null : "about")
                    }
                    className={
                        `bg-cloud-200 pt-12 pr-15 pb-2 pl-2 border border-cloud-300 rounded-xl mt-2 ml-2 text-sm text-cloud-300 ` +
                        (activeModal === "about" ? "text-black" : "")
                    }
                >
                    ABOUT ME
                </button>

                <button
                    onClick={() =>
                        setActiveModal(
                            activeModal === "credits" ? null : "credits"
                        )
                    }
                    className={
                        `bg-cloud-200 pt-12 pr-15 pb-2 pl-2 border border-cloud-300 rounded-xl mt-2 ml-2 text-sm text-cloud-300 ` +
                        (activeModal === "credits" ? "text-black" : "")
                    }
                >
                    CREDITS / INSPIRATION
                </button>
            </nav>

            {activeModal === "about" && (
                <AboutMeModal onClose={() => setActiveModal(null)} />
            )}
            {activeModal === "credits" && (
                <CreditsModal onClose={() => setActiveModal(null)} />
            )}
        </>
    );
}
