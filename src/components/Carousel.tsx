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
        caption: "Apple Website Replica",
    },
    {
        src: "/images/project-samples/21.png",
        href: "https://vispa-pv5j.vercel.app/home",
        caption: "Visp Sign Language Website",
    },
    {
        src: "/images/project-samples/3.png",
        href: "https://socially-lake.vercel.app/",
        caption: "Social Media Website",
    },
    {
        src: "/images/project-samples/4.jpg",
        href: "https://github.com/Yosxxx/disneyPlus-clone",
        caption: "Disney+ Clone",
    },
    {
        src: "/images/project-samples/5.png",
        href: "https://github.com/Yosxxx/Web-App-Authenticator",
        caption: "Web App Authenticator",
    },
    {
        src: "/images/project-samples/6.png",
        href: "https://github.com/Yosxxx/ML-BreastCancer",
        caption: "Breast Cancer Predictor",
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
                {slides.map(({ src, href, caption }, i) => (
                    <SwiperSlide
                        key={i}
                        className="swiper-slide relative"
                        style={{
                            width: "min(70vw, 350px)", // smaller max width
                            aspectRatio: "1 / 1",
                            borderRadius: "1rem",
                            overflow: "hidden",
                        }}
                    >
                        <a
                            href={href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block w-full h-full relative"
                        >
                            <Image
                                src={src}
                                alt={caption}
                                fill
                                sizes="(max-width: 768px) 80vw, 350px"
                                style={{ objectFit: "cover" }}
                                priority={i === 0}
                            />
                            <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-50 text-white text-xs px-2 py-0.5 rounded">
                                {caption}
                            </div>
                        </a>
                    </SwiperSlide>
                ))}
            </Swiper>

            {/* bullets even closer: mt-4 */}
            <div className="custom-swiper-pagination mt-4 flex justify-center gap-2" />

            <style jsx global>{`
                .carousel-wrapper {
                    overscroll-behavior-x: none;
                }
                .custom-swiper-pagination .swiper-pagination-bullet {
                    width: 8px;
                    height: 8px;
                }
                .custom-swiper-pagination .swiper-pagination-bullet-active {
                    background-color: black;
                }
            `}</style>
        </div>
    );
}
