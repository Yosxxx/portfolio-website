// app/layout.tsx
import ConnectingDotsBackground from "@/components/ConnectingDotsBackground";
import Navbar from "@/components/Navbar";
import type { Metadata } from "next";
import type { Viewport } from "next"; // ← pull in the Viewport type
import "./globals.css";
export const metadata: Metadata = {
    title: "Personal Portfolio",
};

export const viewport: Viewport = {
    width: 1280,
    initialScale: 1.0,
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <head />
            <body>
                <ConnectingDotsBackground />
                <Navbar />
                {children}
            </body>
        </html>
    );
}
