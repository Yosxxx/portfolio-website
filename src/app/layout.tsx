import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import ConnectingDotsBackground from "@/components/ConnectingDotsBackground";

export const metadata: Metadata = {
    title: "Personal Portfolio",
    viewport: "width=1280, initial-scale=1.0",
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
