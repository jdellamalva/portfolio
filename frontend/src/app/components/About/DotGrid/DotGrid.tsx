"use client";

import { useEffect, useRef } from "react";
import styles from "./DotGrid.module.css";
import type { DotGridProps } from "./DotGrid.types";

import { useImageLoader } from "@/app/hooks/useImageLoader";
import { useCanvas } from "@/app/hooks/useCanvas";

import Dot from "./Dot";

export default function DotGrid({
  density,
  dotRadius,
  onFpsUpdate,
}: DotGridProps) {
  const { imageData, getWrappedCoordinates } = useImageLoader(
    "/Mercator_projection_Square_cropped.jpg"
  );

  const dotsRef = useRef<Set<Dot>>(new Set());

  const setupGrid = () => {
    if (!imageData) return;

    const spacing = density > 0 ? (2 * dotRadius) / density : Infinity;

    const { innerWidth, innerHeight } = window;
    const newDots = new Set<Dot>();

    for (let x = (innerWidth / 2) % spacing; x < innerWidth; x += spacing) {
      for (let y = (innerHeight / 2) % spacing; y < innerHeight; y += spacing) {
        newDots.add(new Dot(x, y, dotRadius));
      }
    }

    dotsRef.current = newDots;
  };

  useEffect(() => {
    setupGrid();
  }, [density, dotRadius, imageData]);

  const { canvasRef, fps } = useCanvas((ctx, time) => {
    if (!imageData || !dotsRef.current || dotsRef.current.size === 0) return;
    for (const dot of dotsRef.current) {
      dot.draw(ctx, time, imageData);
    }
  }, setupGrid);

  useEffect(() => {
    if (onFpsUpdate) {
      onFpsUpdate(fps);
    }
  }, [fps, onFpsUpdate]);

  return <canvas ref={canvasRef} className={styles.dotGrid} />;
}
