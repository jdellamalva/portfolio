"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const CanvasMapSquare = dynamic(() => import("./CanvasMapSquare"), {
  ssr: false,
});
const DotGrid = dynamic(() => import("./DotGrid"), { ssr: false });
const DotGrid2 = dynamic(() => import("./DotGrid2"), { ssr: false });

export default function MapDots() {
  const [imageData, setImageData] = useState<ImageData | null>(null);

  useEffect(() => {
    const img = new Image();
    img.src = "/Mercator_projection_Square_cropped.jpg"; // Ensure this is in `public/`
    img.crossOrigin = "Anonymous"; // Allow cross-origin pixel reading

    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      ctx.drawImage(img, 0, 0);
      const imgData = ctx.getImageData(0, 0, img.width, img.height);
      setImageData(imgData);
    };
  }, []);

  return (
    <>
      {/* <CanvasMapSquare /> */}
      {imageData && <DotGrid2 density={100} imageData={imageData} />}
    </>
  );
}
