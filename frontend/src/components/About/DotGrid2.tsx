"use client";

import { useEffect, useRef, useCallback } from "react";
import DotManager from "../../app/classes/DotManager";

interface DotGridProps {
  density: number;
  imageData: ImageData;
}

export default function DotGrid2({ density, imageData }: DotGridProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const dotManagerRef = useRef<DotManager | null>(null);

  // Function to regenerate dots only when necessary
  const regenerateDots = useCallback(() => {
    dotManagerRef.current = new DotManager(density, imageData);
  }, [density, imageData]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Generate dots initially
    regenerateDots();

    const draw = () => {
      if (!dotManagerRef.current) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      dotManagerRef.current.drawDots(ctx);
    };

    // Draw dots
    draw();

    // Resize handling
    const handleResize = () => {
      regenerateDots(); // Regenerate dots on resize
      draw(); // Redraw the dots
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [regenerateDots]);

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
