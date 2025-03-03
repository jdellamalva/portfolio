"use client";

import { useEffect, useRef, useState } from "react";

export default function CanvasMapSquare() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [lineOffsetPercentage, setLineOffsetPercentage] = useState(50.0); // Default to center (50.0%)

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const img = new Image();
    img.src = "/Mercator_projection_Square_cropped.jpg"; // New image in `public/`

    const drawTiledMap = () => {
      const { innerWidth, innerHeight } = window;
      canvas.width = innerWidth;
      canvas.height = innerHeight;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const imgAspectRatio = img.width / img.height;
      const tileHeight = innerHeight; // Fit full viewport height
      const tileWidth = tileHeight * imgAspectRatio; // Maintain aspect ratio

      const numTilesEachSide = Math.ceil(innerWidth / (2 * tileWidth)); // Tiles on each side of center
      const centerTileX = innerWidth / 2 - tileWidth / 2; // Keep center tile locked

      // Convert 0% (left) to 100% (right) into an x-offset relative to each tile
      const lineOffset = (lineOffsetPercentage / 100) * tileWidth; // Maps 0% -> left, 100% -> right

      // Draw tiles to the left and right of the center tile
      for (let i = -numTilesEachSide; i <= numTilesEachSide; i++) {
        const tileX = centerTileX + i * tileWidth;
        ctx.drawImage(img, tileX, 0, tileWidth, tileHeight);

        // Draw vertical red line at the correct position in each tile
        const relativeLineX = tileX + lineOffset;
        ctx.strokeStyle = "red";
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(relativeLineX, 0);
        ctx.lineTo(relativeLineX, innerHeight);
        ctx.stroke();
      }
    };

    img.onload = drawTiledMap;
    window.addEventListener("resize", drawTiledMap);

    return () => window.removeEventListener("resize", drawTiledMap);
  }, [lineOffsetPercentage]); // Redraw when offset changes

  return (
    <div>
      <canvas
        ref={canvasRef}
        style={{
          display: "block",
          position: "absolute",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
        }}
      />
      <input
        type="number"
        min="0.0"
        max="100.0"
        step="0.1"
        value={lineOffsetPercentage}
        onChange={(e) => setLineOffsetPercentage(parseFloat(e.target.value))}
        style={{
          position: "absolute",
          top: 20,
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 10,
          width: "80px",
          textAlign: "center",
        }}
      />
    </div>
  );
}
