import { useEffect, useState, useCallback } from "react";

export default function useImageLoader(imageSrc: string) {
  const [imageData, setImageData] = useState<ImageData | null>(null);
  const [image, setImage] = useState<HTMLImageElement | null>(null);
  const [tileWidth, setTileWidth] = useState<number | null>(null);

  useEffect(() => {
    const img = new Image();
    img.src = imageSrc;
    img.crossOrigin = "Anonymous";

    img.onload = () => {
      setImage(img);
      setTileWidth(img.width);

      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      ctx.drawImage(img, 0, 0);
      setImageData(ctx.getImageData(0, 0, img.width, img.height));
    };
  }, [imageSrc]);

  const getWrappedCoordinates = useCallback(
    (x: number, y: number, viewportWidth: number) => {
      if (!imageData || !tileWidth) return { wrappedX: 0, wrappedY: y };

      const imgWidth = imageData.width;

      const centerX = viewportWidth / 2 - tileWidth / 2;

      const imgX = ((x - centerX) / tileWidth) * imgWidth;

      const wrappedX = Math.floor(((imgX % imgWidth) + imgWidth) % imgWidth);

      return { wrappedX, wrappedY: y };
    },
    [imageData, tileWidth]
  );

  return { image, imageData, tileWidth, getWrappedCoordinates };
}
