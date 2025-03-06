import { useRef, useEffect, useCallback } from "react";
import styles from "./MercatorMap.module.css";

import { useImageLoader } from "@/app/hooks/useImageLoader";

export default function MercatorMap() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { image } = useImageLoader("/Mercator_projection_Square_cropped.jpg");

  const drawTiledMap = useCallback(() => {
    if (!image) return; // Ensure image is loaded before drawing

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const { innerWidth, innerHeight } = window;
    canvas.width = innerWidth;
    canvas.height = innerHeight;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const imgAspectRatio = image.width / image.height;
    const tileHeight = innerHeight;
    const tileWidth = tileHeight * imgAspectRatio;

    const numTilesEachSide = Math.ceil(innerWidth / (2 * tileWidth));
    const centerTileX = innerWidth / 2 - tileWidth / 2;

    for (let i = -numTilesEachSide; i <= numTilesEachSide; i++) {
      const tileX = centerTileX + i * tileWidth;
      ctx.drawImage(image, tileX, 0, tileWidth, tileHeight);
    }
  }, [image]); // Ensure it updates only when `image` changes

  useEffect(() => {
    if (!image) return; // Ensure image exists before drawing

    drawTiledMap(); // Initial draw

    window.addEventListener("resize", drawTiledMap);
    return () => window.removeEventListener("resize", drawTiledMap);
  }, [image, drawTiledMap]); // Ensure it updates properly when `image` changes

  return <canvas ref={canvasRef} className={styles.map} />;
}
