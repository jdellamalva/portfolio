"use client";

import React, { useEffect, useState, useRef } from "react";

export default function DotGrid() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animationRef = useRef<number | null>(null);
  const [navHeight, setNavHeight] = useState<number>(0);

  useEffect(() => {
    const calculateNavHeight = () => {
      const nav = document.querySelector("nav");
      const height = nav ? nav.getBoundingClientRect().height : 0;
      setNavHeight(height);
    };

    calculateNavHeight();

    window.addEventListener("resize", calculateNavHeight);
    return () => window.removeEventListener("resize", calculateNavHeight);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight - navHeight;
    };

    resizeCanvas();

    window.addEventListener("resize", resizeCanvas);
    return () => window.removeEventListener("resize", resizeCanvas);
  }, [navHeight]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const draw = () => {
      reset(ctx, canvas);
      drawGreenCircle(ctx, canvas);
    };

    const update = () => {
      // call update methods here
    };

    const animate = () => {
      update();
      draw();
      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, []);

  return <canvas ref={canvasRef} />;
}

const reset = (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
};

const drawGreenCircle = (
  ctx: CanvasRenderingContext2D,
  canvas: HTMLCanvasElement
) => {
  const centerX = canvas.width / 2;
  const centerY = canvas.height / 2;
  const radius = 50;

  ctx.fillStyle = "green";
  ctx.beginPath();
  ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
  ctx.fill();
};
