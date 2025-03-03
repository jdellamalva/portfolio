"use client";

import { useEffect, useRef } from "react";

interface DotGridProps {
  density: number;
  imageData: ImageData;
}
const isSea = (r: number, g: number, b: number): boolean => {
  const iceOffset = 4;
  return b > r + iceOffset && b > g + iceOffset;
};

export default function DotGrid({ density, imageData }: DotGridProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const drawDots = () => {
      const { innerWidth, innerHeight } = window;
      canvas.width = innerWidth;
      canvas.height = innerHeight;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const dotsPerPixel = density / 10000;
      const spacing = Math.sqrt(1 / dotsPerPixel);

      const minSpacing = 5;
      const maxSpacing = 100;
      const effectiveSpacing = Math.min(
        maxSpacing,
        Math.max(minSpacing, spacing)
      );
      const radius = Math.max(1, Math.min(10, effectiveSpacing / 4));

      const imgWidth = imageData.width;
      const imgHeight = imageData.height;

      const imgAspectRatio = imgWidth / imgHeight;
      const tileHeight = innerHeight;
      const tileWidth = tileHeight * imgAspectRatio;
      const centerX = innerWidth / 2 - tileWidth / 2;

      for (
        let x = centerX % effectiveSpacing;
        x < canvas.width;
        x += effectiveSpacing
      ) {
        for (
          let y = (innerHeight / 2) % effectiveSpacing;
          y < canvas.height;
          y += effectiveSpacing
        ) {
          // Convert canvas coordinates to image coordinates
          const imgX =
            Math.floor(((x - centerX) / tileWidth) * imgWidth) % imgWidth;
          const imgY = Math.floor((y / tileHeight) * imgHeight);

          // Get pixel color
          const index = (imgY * imgWidth + imgX) * 4;
          const r = imageData.data[index];
          const g = imageData.data[index + 1];
          const b = imageData.data[index + 2];

          // Classify as sea or land
          //   const isSea = b > r && b > g; // More blue than red/green → sea

          ctx.beginPath();
          ctx.arc(x, y, radius, 0, Math.PI * 2);
          ctx.fillStyle = isSea(r, g, b) ? "purple" : "orange"; // Purple = sea, Orange = land
          ctx.fill();
        }
      }
    };

    drawDots();
    window.addEventListener("resize", drawDots);

    return () => window.removeEventListener("resize", drawDots);
  }, [density, imageData]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        pointerEvents: "none",
      }}
    />
  );
}
