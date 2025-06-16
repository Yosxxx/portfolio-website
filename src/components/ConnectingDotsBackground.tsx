// src/components/ConnectingDotsBackground.tsx
"use client";

import React, { useRef, useEffect } from "react";

interface Dot {
    x: number;
    y: number;
    r: number;
    vx: number;
    vy: number;
}

const CONFIG = {
    dotCount: 300,
    dotColor: "#a8a9ad",
    lineColor: "rgba(168,169,173,0.1)",
    maxDistance: 100,
    mouseLinkDistance: 120,
    speedFactor: 0.5,
    radiusRange: [1, 3] as [number, number],
    lineWidth: 0.7,
};

export default function ConnectingDotsBackground() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        // assert non-null once, up front
        const canvas = canvasRef.current!;
        const ctx = canvas.getContext("2d")!;

        let animationId: number;

        // Resize canvas to fill window
        const setSize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        setSize();
        window.addEventListener("resize", setSize);

        // helper to pick a random number in [min, max)
        const randRange = (min: number, max: number) =>
            Math.random() * (max - min) + min;

        // create our dots
        const dots: Dot[] = Array.from({ length: CONFIG.dotCount }).map(() => ({
            x: randRange(0, canvas.width),
            y: randRange(0, canvas.height),
            r: randRange(CONFIG.radiusRange[0], CONFIG.radiusRange[1]),
            vx: randRange(-CONFIG.speedFactor, CONFIG.speedFactor),
            vy: randRange(-CONFIG.speedFactor, CONFIG.speedFactor),
        }));

        // track the mouse
        const mouse = { x: null as number | null, y: null as number | null };
        const onMouseMove = (e: MouseEvent) => {
            mouse.x = e.clientX;
            mouse.y = e.clientY;
        };
        const onMouseLeave = () => {
            mouse.x = null;
            mouse.y = null;
        };
        window.addEventListener("mousemove", onMouseMove);
        window.addEventListener("mouseleave", onMouseLeave);

        // simple Euclidean distance
        const distance = (
            a: { x: number; y: number },
            b: { x: number; y: number }
        ) => Math.hypot(a.x - b.x, a.y - b.y);

        // draw frame
        function draw() {
            // background gradient
            const grad = ctx.createRadialGradient(
                canvas.width / 2,
                canvas.height / 2,
                canvas.height / 10,
                canvas.width / 2,
                canvas.height / 2,
                canvas.height
            );
            grad.addColorStop(0, "#fff");
            grad.addColorStop(1, "#f8f8f8");
            ctx.fillStyle = grad;
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // dots
            ctx.fillStyle = CONFIG.dotColor;
            dots.forEach((d) => {
                ctx.beginPath();
                ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
                ctx.fill();
            });

            // lines
            ctx.beginPath();
            dots.forEach((d1) => {
                // link to mouse
                if (
                    mouse.x !== null &&
                    mouse.y !== null &&
                    distance({ x: mouse.x, y: mouse.y }, d1) <
                        CONFIG.mouseLinkDistance
                ) {
                    ctx.moveTo(d1.x, d1.y);
                    ctx.lineTo(mouse.x, mouse.y);
                }
                // link to other dots
                dots.forEach((d2) => {
                    if (d1 !== d2 && distance(d1, d2) < CONFIG.maxDistance) {
                        ctx.moveTo(d1.x, d1.y);
                        ctx.lineTo(d2.x, d2.y);
                    }
                });
            });
            ctx.strokeStyle = CONFIG.lineColor;
            ctx.lineWidth = CONFIG.lineWidth;
            ctx.stroke();
        }

        // update positions
        function update() {
            dots.forEach((d) => {
                d.x += d.vx;
                d.y += d.vy;
                if (d.x < 0 || d.x > canvas.width) d.vx *= -1;
                if (d.y < 0 || d.y > canvas.height) d.vy *= -1;
            });
        }

        // animation loop
        function loop() {
            draw();
            update();
            animationId = requestAnimationFrame(loop);
        }
        loop();

        return () => {
            window.removeEventListener("resize", setSize);
            window.removeEventListener("mousemove", onMouseMove);
            window.removeEventListener("mouseleave", onMouseLeave);
            cancelAnimationFrame(animationId);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            style={{
                position: "fixed",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                zIndex: -1,
                pointerEvents: "none",
            }}
        />
    );
}
