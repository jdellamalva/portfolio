import { RGBA, GradientStop, toColorString, lerpColor } from "./ColorUtils";

export default class Gradient {
  private stops: GradientStop[];

  constructor(stops: GradientStop[]) {
    this.stops = stops.sort((a, b) => a.stop - b.stop);
  }

  /**
   * Creates a canvas linear gradient that can be used as a fillStyle.
   * @param ctx CanvasRenderingContext2D
   * @param x0 Start X coordinate
   * @param y0 Start Y coordinate
   * @param x1 End X coordinate
   * @param y1 End Y coordinate
   * @returns CanvasGradient
   */
  createCanvasGradient(
    ctx: CanvasRenderingContext2D,
    x0: number,
    y0: number,
    x1: number,
    y1: number
  ): CanvasGradient {
    const gradient = ctx.createLinearGradient(x0, y0, x1, y1);
    this.stops.forEach(({ stop, color }) => {
      gradient.addColorStop(stop, toColorString(color));
    });
    return gradient;
  }

  /**
   * Gets an interpolated solid color from the gradient based on a given value.
   * @param value Number between 0 and 1 representing the position on the gradient.
   * @returns RGBA object
   */
  getColorAtPoint(value: number): RGBA {
    let result: RGBA = { r: 0, g: 0, b: 0, a: 1 };

    if (value <= 0) {
      result = this.stops[0].color;
    } else if (value >= 1) {
      result = this.stops[this.stops.length - 1].color;
    } else {
      for (let i = 0; i < this.stops.length; i++) {
        const current = this.stops[i];

        if (value === current.stop) {
          result = current.color;
          break;
        }

        if (i < this.stops.length - 1) {
          const next = this.stops[i + 1];

          if (current.stop === next.stop) continue;

          if (value > current.stop && value < next.stop) {
            const t = (value - current.stop) / (next.stop - current.stop);
            result = lerpColor(current.color, next.color, t);
            break;
          }
        }
      }
    }

    return result;
  }
}

// Example Gradient: OCEAN
export const OCEAN = new Gradient([
  { stop: 0.0, color: { r: 24, g: 78, b: 119, a: 1.0 } },
  { stop: 0.45, color: { r: 30, g: 96, b: 145, a: 1.0 } },
  { stop: 0.61, color: { r: 26, g: 117, b: 159, a: 1.0 } },
  { stop: 0.74, color: { r: 22, g: 138, b: 173, a: 1.0 } },
  { stop: 0.83, color: { r: 52, g: 160, b: 164, a: 1.0 } },
  { stop: 0.9, color: { r: 82, g: 182, b: 154, a: 1.0 } },
  { stop: 0.95, color: { r: 118, g: 200, b: 147, a: 1.0 } },
  { stop: 0.97, color: { r: 153, g: 217, b: 140, a: 1.0 } },
  { stop: 0.99, color: { r: 181, g: 228, b: 140, a: 1.0 } },
  { stop: 0.995, color: { r: 217, g: 237, b: 146, a: 1.0 } },
  { stop: 1.0, color: { r: 255, g: 255, b: 255, a: 1.0 } },
]);
