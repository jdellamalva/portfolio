import { Dot } from "./Dot";

export class DotManager {
  private static instance: DotManager;
  private pool: Dot[] = [];
  public activeDots: Dot[] = [];
  private mode: string = "default";
  private dpi: number = 10; // Default DPI value
  private readonly MAX_DOTS = 5000;

  private constructor() {
    for (let i = 0; i < this.MAX_DOTS; i++) {
      this.pool.push(new Dot());
    }
  }

  static getInstance(): DotManager {
    if (!DotManager.instance) {
      DotManager.instance = new DotManager();
    }
    return DotManager.instance;
  }

  initiate(dpi: number = this.dpi) {
    this.dpi = dpi;
    console.log(`🚀 Initializing DotManager with DPI: ${this.dpi}`);
    this.updateGrid(10, 5); // Default size, will be updated by DotGrid
  }

  updateGrid(canvasWidth: number, canvasHeight: number) {
    this.activeDots = [];

    // Calculate number of dots based on DPI
    const cols = Math.floor(canvasWidth * this.dpi);
    const rows = Math.floor(canvasHeight * this.dpi);
    const spacingX = canvasWidth / cols;
    const spacingY = canvasHeight / rows;

    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        if (this.activeDots.length >= this.MAX_DOTS) return;

        const x = col * spacingX - canvasWidth / 2;
        const y = row * spacingY - canvasHeight / 2;

        const dot = this.getDot(x, y, 0);
        if (!dot) continue;
      }
    }

    console.log(`✅ Dots created: ${this.activeDots.length}`);
  }

  getDot(x: number, y: number, z: number): Dot | null {
    if (this.pool.length === 0) return null;
    const dot = this.pool.pop()!;
    dot.activate(x, y, z);
    this.activeDots.push(dot);
    return dot;
  }

  releaseDot(dot: Dot) {
    dot.deactivate();
    this.activeDots = this.activeDots.filter(d => d !== dot);
    this.pool.push(dot);
  }

  updateDots() {
    this.activeDots.forEach(dot => dot.update());
  }

  setDPI(dpi: number) {
    this.dpi = dpi;
    this.initiate(dpi);
  }
}