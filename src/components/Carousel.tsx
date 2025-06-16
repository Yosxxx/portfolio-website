// src/components/Carousel.tsx
"use client";

import React, { useRef, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Pagination } from "swiper/modules";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";

gsap.registerPlugin(ScrollTrigger);

const slides = [
    {
        src: "/images/project-samples/1.png",
        href: "https://apple-web-dun.vercel.app/",
    },
    {
        src: "/images/project-samples/2.png",
        href: "https://vispa-pv5j.vercel.app/home",
    },
    {
        src: "/images/project-samples/3.png",
        href: "https://socially-lake.vercel.app/",
    },
    {
        src: "/images/project-samples/4.jpg",
        href: "https://github.com/Yosxxx/disneyPlus-clone",
    },
    {
        src: "/images/project-samples/5.png",
        href: "https://github.com/Yosxxx/Web-App-Authenticator",
    },
];

export default function Carousel() {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!containerRef.current) return;
        gsap.from(".swiper-slide", {
            opacity: 0,
            y: 30,
            duration: 0.6,
            ease: "power2.out",
            stagger: 0.1,
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top 80%",
                end: "bottom top",
                toggleActions: "play reverse play reverse",
            },
        });
    }, []);

    return (
        <div
            className="carousel-wrapper py-16 overflow-x-hidden"
            ref={containerRef}
        >
            <Swiper
                modules={[EffectCoverflow, Pagination]}
                effect="coverflow"
                grabCursor
                centeredSlides
                slidesPerView="auto"
                initialSlide={3}
                pagination={{
                    clickable: true,
                    el: ".custom-swiper-pagination",
                }}
                coverflowEffect={{
                    rotate: 20,
                    stretch: 0,
                    depth: 120,
                    modifier: 1,
                    slideShadows: true,
                }}
            >
                {slides.map(({ src, href }, i) => (
                    <SwiperSlide
                        key={i}
                        className="swiper-slide"
                        style={{
                            width: "min(90vw, 700px)",
                            height: "min(50vw, 350px)",
                            borderRadius: "1rem",
                            overflow: "hidden",
                            boxShadow:
                                "0 8px 24px rgba(0,0,0,0.2), 0 0 0 1px rgba(255,255,255,0.05)",
                        }}
                    >
                        <a
                            href={href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block w-full h-full"
                        >
                            <Image
                                src={src}
                                alt={`Slide ${i + 1}`}
                                fill
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 700px"
                                style={{ objectFit: "cover" }}
                                priority={i === 0}
                            />
                        </a>
                    </SwiperSlide>
                ))}
            </Swiper>

            <div className="custom-swiper-pagination mt-12 flex justify-center gap-2" />

            <style jsx global>{`
                .carousel-wrapper {
                    /* prevent “rubber-band” overscroll */
                    overscroll-behavior-x: none;
                }
                .custom-swiper-pagination .swiper-pagination-bullet {
                    width: 10px;
                    height: 10px;
                    background-color: #d3d3d3;
                    opacity: 1;
                    border-radius: 9999px;
                    transition: background-color 0.3s ease;
                }
                .custom-swiper-pagination .swiper-pagination-bullet-active {
                    background-color: black;
                }
            `}</style>
        </div>
    );
}
