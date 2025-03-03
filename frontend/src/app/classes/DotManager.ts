import Dot from "./Dot";

export default class DotManager {
  dots: Dot[] = [];
  density: number;
  imageData: ImageData;

  constructor(density: number, imageData: ImageData) {
    this.density = density;
    this.imageData = imageData;
    this.generateDots();
  }

  generateDots() {
    const imgWidth = this.imageData.width;
    const imgHeight = this.imageData.height;

    const dotsPerPixel = this.density / 10000;
    const spacing = Math.sqrt(1 / dotsPerPixel);
    const minSpacing = 5;
    const maxSpacing = 100;
    const effectiveSpacing = Math.min(maxSpacing, Math.max(minSpacing, spacing));
    const radius = Math.max(1, Math.min(10, effectiveSpacing / 4));

    const canvasWidth = window.innerWidth;
    const canvasHeight = window.innerHeight;

    const imgAspectRatio = imgWidth / imgHeight;
    const tileHeight = canvasHeight;
    const tileWidth = tileHeight * imgAspectRatio;
    const centerX = canvasWidth / 2 - tileWidth / 2;

    for (let x = centerX % effectiveSpacing; x < canvasWidth; x += effectiveSpacing) {
      for (let y = (canvasHeight / 2) % effectiveSpacing; y < canvasHeight; y += effectiveSpacing) {
        const imgX = Math.floor(((x - centerX) / tileWidth) * imgWidth) % imgWidth;
        const imgY = Math.floor((y / tileHeight) * imgHeight);

        const index = (imgY * imgWidth + imgX) * 4;
        const r = this.imageData.data[index];
        const g = this.imageData.data[index + 1];
        const b = this.imageData.data[index + 2];

        const isSea = b > r + 4 && b > g + 4; // Using iceOffset = 4 for water detection

        this.dots.push(new Dot(x, y, radius, isSea));
      }
    }
  }

  drawDots(ctx: CanvasRenderingContext2D) {
    this.dots.forEach((dot) => dot.draw(ctx));
  }

  updateDotColor(condition: (dot: Dot) => boolean, newColor: string) {
    this.dots.forEach((dot) => {
      if (condition(dot)) {
        dot.updateColor(newColor);
      }
    });
  }
}
