"use client";

import dynamic from "next/dynamic";
import { useState, useMemo } from "react";

import styles from "./MapDots.module.css";

const MercatorMap = dynamic(() => import("../MercatorMap"), {
  ssr: false,
});
const DotGrid = dynamic(() => import("../DotGrid"), { ssr: true });

export default function MapDots() {
  const [showImage, setShowImage] = useState(false);
  const [density, setDensity] = useState(0.95);
  const [dotRadius, setDotRadius] = useState(4);
  const [fps, setFps] = useState(0);

  const debouncedFps = useMemo(() => fps, [Math.floor(fps / 5)]);

  return (
    <>
      <DotGrid density={density} dotRadius={dotRadius} onFpsUpdate={setFps} />
      {showImage && <MercatorMap />}
      <div className={styles.controlPanel}>
        <div className={styles.controlRow}>
          <label>FPS:</label>
          <span>{debouncedFps}</span>
        </div>
        <div className={styles.controlRow}>
          <label>Density:</label>
          <span>{density.toFixed(2)}</span>
        </div>
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={density}
          onChange={(e) => setDensity(parseFloat(e.target.value))}
        />

        <div className={styles.controlRow}>
          <label>Dot Radius:</label>
          <span>{dotRadius}</span>
        </div>
        <input
          type="range"
          min="3"
          max="10"
          step="0.25"
          value={dotRadius}
          onChange={(e) => setDotRadius(parseFloat(e.target.value))}
        />
        <div className={styles.controlRow}>
          <label>Show Image:</label>
          <input
            type="checkbox"
            checked={showImage}
            onChange={() => setShowImage((prev) => !prev)}
          />
        </div>
      </div>
    </>
  );
}
