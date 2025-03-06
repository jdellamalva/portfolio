import { OCEAN, toColorString } from "@/app/classes/Gradient/";
import type { RGBA } from "@/app/classes/Gradient";
import { Wave } from "@/app/classes/Wave";

const ICE_OFFSET = 6;

const WAVES = [
  new Wave("sine", 600, 0.5, 60),
  new Wave("sine", 800, 0.3, 270),
  new Wave("perlin", 150, 1),
];

const computeAmplitude = (x: number, y: number, time: number): number => {
  const amplitude = WAVES.reduce(
    (sum, wave) => sum + wave.evaluate(x, y, time),
    0
  );

  const normalizedAmplitude = 0.5 + 0.5 * (amplitude / WAVES.length);

  return Math.min(1, Math.max(0, normalizedAmplitude));
};

const computeImageColor = (
  x: number,
  y: number,
  imageData: ImageData,
  sampleRadius: number = 4
): RGBA => {
  const imgWidth = imageData.width;
  const imgHeight = imageData.height;

  let totalR = 0,
    totalG = 0,
    totalB = 0,
    totalA = 0,
    count = 0;

  for (let dx = -sampleRadius; dx <= sampleRadius; dx++) {
    for (let dy = -sampleRadius; dy <= sampleRadius; dy++) {
      const sampleX = Math.min(Math.max(x + dx, 0), imgWidth - 1);
      const sampleY = Math.min(Math.max(y + dy, 0), imgHeight - 1);
      const index = (sampleY * imgWidth + sampleX) * 4;

      totalR += imageData.data[index];
      totalG += imageData.data[index + 1];
      totalB += imageData.data[index + 2];
      totalA += imageData.data[index + 3];
      count++;
    }
  }

  return {
    r: Math.round(totalR / count),
    g: Math.round(totalG / count),
    b: Math.round(totalB / count),
    a: Math.round(totalA / count) / 255,
  };
};

export default class Dot {
  x: number;
  y: number;
  radius: number;
  private type: "land" | "sea" | null = null;
  private color: string | null = null;
  private lastImageData: ImageData | null = null;

  constructor(x: number, y: number, radius: number) {
    this.x = x;
    this.y = y;
    this.radius = radius;
  }

  private determineType(imageData: ImageData) {
    const { innerWidth, innerHeight } = window;

    const imgAspectRatio = imageData.width / imageData.height;
    const tileHeight = innerHeight;
    const tileWidth = tileHeight * imgAspectRatio;
    const centerX = innerWidth / 2 - tileWidth / 2;

    const imgWidth = imageData.width;
    const imgHeight = imageData.height;

    const imgX = ((this.x - centerX) / tileWidth) * imgWidth;
    const imgY = (this.y / tileHeight) * imgHeight;

    const wrappedX = Math.floor(((imgX % imgWidth) + imgWidth) % imgWidth);
    const wrappedY = Math.floor(((imgY % imgHeight) + imgHeight) % imgHeight);

    const index = (wrappedY * imgWidth + wrappedX) * 4;

    const rgba = {
      r: imageData.data[index],
      g: imageData.data[index + 1],
      b: imageData.data[index + 2],
      a: imageData.data[index + 3] / 255,
    };

    this.type =
      rgba.b > rgba.r + ICE_OFFSET && rgba.b > rgba.g + ICE_OFFSET
        ? "sea"
        : "land";

    if (this.type === "land") {
      this.color = toColorString(
        computeImageColor(wrappedX, wrappedY, imageData)
      );
    }
  }

  private getColor(imageData: ImageData, time: number): string {
    if (this.lastImageData !== imageData) {
      this.determineType(imageData);
      this.lastImageData = imageData;
    }

    if (this.type === "sea") {
      return toColorString(
        OCEAN.getColorAtPoint(computeAmplitude(this.x, this.y, time))
      );
    }

    return this.color!;
  }

  draw(ctx: CanvasRenderingContext2D, time: number, imageData: ImageData) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = this.getColor(imageData, time);
    ctx.fill();
  }
}
