"use client";

import { useEffect, useRef } from "react";
import dynamic from "next/dynamic";

import styles from "./DotGrid.module.css";
import type { DotGridProps } from "./DotGrid.types";

import useImageLoader from "@/app/hooks/useImageLoader";
import useCanvas from "@/app/hooks/useCanvas";
import useWebGL from "@/app/hooks/useWebGL";

const DynamicThreeCanvas = dynamic(
  () => import("@react-three/fiber").then((mod) => mod.Canvas),
  { ssr: false }
);

import { Canvas } from "@react-three/fiber";

// TODO: Implement useWebGL hook
// import { useWebGL } from "@/app/hooks/useWebGL";

import Dot from "./Dot";

export default function DotGrid({
  density,
  dotRadius,
  showImage,
  renderer,
  onFpsUpdate,
  onDotCountUpdate,
}: DotGridProps) {
  const { imageData, image } = useImageLoader(
    "/Mercator_projection_Square_cropped.jpg"
  );

  const dotsRef = useRef<Set<Dot>>(new Set());

  const setupGrid = () => {
    if (!imageData) return;

    if (density <= 0) {
      dotsRef.current.clear();
      if (onDotCountUpdate) onDotCountUpdate(0);
      return;
    }

    const spacing = density > 0 ? (2 * dotRadius) / density : Infinity;

    const { innerWidth, innerHeight } = window;
    const newDots = new Set<Dot>();

    for (let x = (innerWidth / 2) % spacing; x < innerWidth; x += spacing) {
      for (let y = (innerHeight / 2) % spacing; y < innerHeight; y += spacing) {
        newDots.add(new Dot(x, y, dotRadius));
      }
    }

    dotsRef.current = newDots;

    if (onDotCountUpdate) {
      onDotCountUpdate(newDots.size);
    }
  };

  useEffect(() => {
    setupGrid();
  }, [density, dotRadius, imageData]);

  // TODO: Implement useWebGL hook, and load conditionally
  //   const { canvasRef, fps, drawTiledImage } =
  //   renderer === "canvas"
  //     ? useCanvas((ctx, time) => {...}, setupGrid)

  const { canvasRef, fps, drawTiledImage } = useCanvas((ctx, time) => {
    if (!imageData || !dotsRef.current || dotsRef.current.size === 0) return;

    if (showImage && image) {
      drawTiledImage(ctx, image);
    }

    for (const dot of dotsRef.current) {
      dot.draw(ctx, time, imageData);
    }
  }, setupGrid);

  useEffect(() => {
    if (onFpsUpdate) {
      onFpsUpdate(fps);
    }
  }, [fps, onFpsUpdate]);

  return renderer === "canvas" ? (
    <canvas ref={canvasRef} className={styles.dotGrid} />
  ) : (
    <Canvas></Canvas>
  );
}
