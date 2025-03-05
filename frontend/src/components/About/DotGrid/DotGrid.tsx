"use client";

import { useEffect, useRef, useCallback } from "react";
import styles from "./DotGrid.module.css";
import type { DotGridProps } from "./DotGrid.types";
import { Wave } from "@/app/classes/Wave";

const ICE_OFFSET = 6;
const MIN_SPACING = 5;
const MAX_SPACING = 100;
const MIN_RADIUS = 1;
const MAX_RADIUS = Infinity;
const WAVE_SPEED = 0.005;
const COLOR_VALUES = [
  [24, 78, 119], // Darkest
  [30, 96, 145],
  [26, 117, 159],
  [22, 138, 173],
  [52, 160, 164],
  [82, 182, 154],
  [118, 200, 147],
  [153, 217, 140],
  [181, 228, 140],
  [217, 237, 146],
  [255, 255, 255], // Lightest
];

const generateGradient = (colors: number[][]) => {
  const stops: [number, number, number, number][] = [];
  let totalWeight = 0;

  // Assign more weight to darker colors
  const weights = colors.map(([r, g, b]) => {
    const darkness = 1 - (r + g + b) / (255 * 3);
    return Math.pow(darkness, 3);
  });

  totalWeight = weights.reduce((sum, w) => sum + w, 0);

  let accumulated = 0;
  for (let i = 0; i < colors.length; i++) {
    accumulated += weights[i];
    const stop = Math.round((accumulated / totalWeight) * 100);
    const [r, g, b] = colors[i];
    stops.push([r, g, b, stop]);
  }

  return stops;
};

const COLOR_GRADIENT = generateGradient(COLOR_VALUES);

const interpolateColor = (noiseValue: number) => {
  const adjustedValue = noiseValue * 100; // Scale noise to match 0-100% range

  // Find the two closest gradient stops
  let lowerIndex = 0;
  let upperIndex = COLOR_GRADIENT.length - 1;

  for (let i = 0; i < COLOR_GRADIENT.length - 1; i++) {
    if (
      COLOR_GRADIENT[i][3] <= adjustedValue &&
      COLOR_GRADIENT[i + 1][3] >= adjustedValue
    ) {
      lowerIndex = i;
      upperIndex = i + 1;
      break;
    }
  }

  const [r1, g1, b1, stop1] = COLOR_GRADIENT[lowerIndex];
  const [r2, g2, b2, stop2] = COLOR_GRADIENT[upperIndex];

  // Normalize blend factor within the range of stop1 to stop2
  const blend = (adjustedValue - stop1) / (stop2 - stop1);

  // Interpolate RGB values
  return [
    Math.round(r1 * (1 - blend) + r2 * blend),
    Math.round(g1 * (1 - blend) + g2 * blend),
    Math.round(b1 * (1 - blend) + b2 * blend),
  ];
};

const isSea = (r: number, g: number, b: number): boolean => {
  return b > r + ICE_OFFSET && b > g + ICE_OFFSET;
};

const computeSeaWaveColor = (
  x: number,
  y: number,
  time: number,
  waveSpeed: number
) => {
  const waves = [
    new Wave("sine", 500, 0.5, Math.PI / 4), // Gentle sine wave (wavelength 500px)
    new Wave("sine", 300, 0.3, Math.PI / 6), // Secondary sine wave (wavelength 300px)
    new Wave("perlin", 400), // Smooth Perlin noise layer (wavelength 400px)
  ];

  // Compute total wave contribution
  const totalWave = waves.reduce(
    (sum, wave) => sum + wave.evaluate(x, y, time, waveSpeed),
    0
  );

  // Normalize: Average the layers & incorporate Perlin noise
  const normalizedWave = 0.5 + 0.5 * (totalWave / waves.length);

  // Ensure final value stays within [0,1]
  const finalWave = Math.max(0, Math.min(1, normalizedWave));

  return interpolateColor(finalWave);
};

const computeAverageLandColor = (
  x: number,
  y: number,
  imageData: ImageData
) => {
  const imgWidth = imageData.width;
  const imgHeight = imageData.height;
  const sampleRadius = 10; // Sample nearby pixels to get an average color

  let totalR = 0,
    totalG = 0,
    totalB = 0,
    count = 0;

  for (let dx = -sampleRadius; dx <= sampleRadius; dx++) {
    for (let dy = -sampleRadius; dy <= sampleRadius; dy++) {
      const sampleX = Math.min(Math.max(x + dx, 0), imgWidth - 1);
      const sampleY = Math.min(Math.max(y + dy, 0), imgHeight - 1);
      const index = (sampleY * imgWidth + sampleX) * 4;

      totalR += imageData.data[index];
      totalG += imageData.data[index + 1];
      totalB += imageData.data[index + 2];
      count++;
    }
  }

  return [
    Math.round(totalR / count),
    Math.round(totalG / count),
    Math.round(totalB / count),
  ];
};

const setupCanvas = (canvas: HTMLCanvasElement) => {
  const { innerWidth, innerHeight } = window;
  canvas.width = innerWidth;
  canvas.height = innerHeight;
  const ctx = canvas.getContext("2d");
  if (!ctx) return null;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  return ctx;
};

const getDotProperties = (density: number) => {
  const dotsPerPixel = density / 10000;
  const spacing = Math.sqrt(1 / dotsPerPixel);

  const effectiveSpacing = Math.min(
    MAX_SPACING,
    Math.max(MIN_SPACING, spacing)
  );
  const radius = Math.max(
    MIN_RADIUS,
    Math.min(MAX_RADIUS, effectiveSpacing / 4)
  );

  return { effectiveSpacing, radius };
};

const getDotColor = (
  x: number,
  y: number,
  imageData: ImageData,
  tileWidth: number,
  tileHeight: number,
  centerX: number,
  time: number,
  waveSpeed: number
) => {
  const imgWidth = imageData.width;
  const imgHeight = imageData.height;

  // Compute floating point image coordinates
  const imgX = ((x - centerX) / tileWidth) * imgWidth;
  const imgY = (y / tileHeight) * imgHeight;

  // Properly wrap X and Y within bounds to handle tiling
  const wrappedX = Math.floor(((imgX % imgWidth) + imgWidth) % imgWidth);
  const wrappedY = Math.floor(((imgY % imgHeight) + imgHeight) % imgHeight);

  const index = (wrappedY * imgWidth + wrappedX) * 4;
  const r = imageData.data[index];
  const g = imageData.data[index + 1];
  const b = imageData.data[index + 2];

  //   if (isVisited(wrappedX, wrappedY)) {
  //     return "hotpink"; // Highlight visited locations with a distinct color
  //   }

  if (isSea(r, g, b)) {
    const color = computeSeaWaveColor(x, y, time, waveSpeed);
    return `rgb(${color[0]}, ${color[1]}, ${color[2]})`;
  }

  const avgColor = computeAverageLandColor(wrappedX, wrappedY, imageData);
  return `rgb(${avgColor[0]}, ${avgColor[1]}, ${avgColor[2]})`;
};

const drawDot = (
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  radius: number,
  imageData: ImageData,
  tileWidth: number,
  tileHeight: number,
  centerX: number,
  time: number
) => {
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, Math.PI * 2);
  ctx.fillStyle = getDotColor(
    x,
    y,
    imageData,
    tileWidth,
    tileHeight,
    centerX,
    time,
    WAVE_SPEED
  );
  ctx.fill();
};

const drawDots = (
  canvas: HTMLCanvasElement,
  density: number,
  imageData: ImageData,
  time: number
) => {
  const ctx = setupCanvas(canvas);
  if (!ctx) return;

  const { effectiveSpacing, radius } = getDotProperties(density);
  const { innerWidth, innerHeight } = window;

  const imgAspectRatio = imageData.width / imageData.height;
  const tileHeight = innerHeight;
  const tileWidth = tileHeight * imgAspectRatio;
  const centerX = innerWidth / 2 - tileWidth / 2;

  for (
    let x = centerX % effectiveSpacing;
    x < innerWidth;
    x += effectiveSpacing
  ) {
    for (
      let y = (innerHeight / 2) % effectiveSpacing;
      y < innerHeight;
      y += effectiveSpacing
    ) {
      drawDot(
        ctx,
        x,
        y,
        radius,
        imageData,
        tileWidth,
        tileHeight,
        centerX,
        time
      );
    }
  }
};

const setupDots = (
  canvas: HTMLCanvasElement,
  dotsRef: React.RefObject<Dot[]>,
  density: number,
  imageData: ImageData
) => {
  if (!canvas || !dotsRef.current) return;

  const { effectiveSpacing, radius } = getDotProperties(density);
  const { innerWidth, innerHeight } = window;

  const imgAspectRatio = imageData.width / imageData.height;
  const tileHeight = innerHeight;
  const tileWidth = tileHeight * imgAspectRatio;
  const centerX = Math.floor(innerWidth / 2 - tileWidth / 2);

  const newDots: Dot[] = [];

  // ✅ Use a Set for faster lookups
  const existingDotPositions = new Set(
    dotsRef.current.map((dot) => `${dot.x},${dot.y}`)
  );

  for (
    let x = Math.floor(centerX / effectiveSpacing) * effectiveSpacing;
    x < innerWidth;
    x += effectiveSpacing
  ) {
    for (
      let y = Math.floor(innerHeight / 2 / effectiveSpacing) * effectiveSpacing;
      y < innerHeight;
      y += effectiveSpacing
    ) {
      if (!existingDotPositions.has(`${x},${y}`)) {
        newDots.push(
          new Dot(
            x,
            y,
            radius,
            imageData,
            tileWidth,
            tileHeight,
            centerX,
            Mode.IMAGE_BASED
          )
        );
      }
    }
  }

  dotsRef.current = dotsRef.current.filter(
    (dot) =>
      dot.x >= centerX &&
      dot.x < innerWidth &&
      dot.y >= 0 &&
      dot.y < innerHeight
  );

  // ✅ Append new dots
  dotsRef.current.push(...newDots);
};

export default function DotGrid({ density, imageData }: DotGridProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number | null>(null);
  const startTimeRef = useRef<number>(performance.now());
  const dotsRef = useRef<Dot[]>([]);

  // Function to handle canvas drawing
  const draw = useCallback(
    (time: number) => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear before drawing
      drawDots(canvas, density, imageData, time - startTimeRef.current);
    },
    [density, imageData]
  );

  // Animation loop
  useEffect(() => {
    const animate = (time: number) => {
      draw(time);
      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationFrameRef.current)
        cancelAnimationFrame(animationFrameRef.current);
    };
  }, [draw]);

  // Handle resizing
  useEffect(() => {
    const handleResize = () => draw(performance.now());

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [draw]);

  return <canvas ref={canvasRef} className={styles.dotGrid} />;
}
