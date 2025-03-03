export default class Dot {
    x: number;
    y: number;
    radius: number;
    isSea: boolean;
    fillStyle: string;
  
    constructor(x: number, y: number, radius: number, isSea: boolean) {
      this.x = x;
      this.y = y;
      this.radius = radius;
      this.isSea = isSea;
      this.fillStyle = isSea ? "purple" : "orange"; // Default colors for sea/land
    }
  
    draw(ctx: CanvasRenderingContext2D) {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = this.fillStyle;
      ctx.fill();
    }
  
    updateColor(newColor: string) {
      this.fillStyle = newColor;
    }
  }
  