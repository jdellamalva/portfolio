const Noise = require("noisejs").Noise;

const perlin = new Noise();

export class Wave {
  constructor(
    public type: "sine" | "perlin",
    public wavelength: number = 100,
    public amplitude: number = 1,
    public angle: number = 0
  ) {}

  evaluate(x: number, y: number, time: number): number {
    if (this.type === "sine") {
      const angleRad = (this.angle * Math.PI) / 180;
      const dirX = Math.cos(angleRad);
      const dirY = Math.sin(angleRad);
      const projectedPosition = x * dirX + y * dirY;

      const frequency = (2 * Math.PI) / this.wavelength;
      const phase = time * frequency;

      return (
        0.5 +
        0.5 * Math.sin(phase + projectedPosition * frequency) * this.amplitude
      );
    }

    if (this.type === "perlin") {
      return (
        (perlin.perlin3(
          x / this.wavelength,
          y / this.wavelength,
          time / this.wavelength
        ) *
          0.5 +
          0.5) *
        this.amplitude
      );
    }

    return 0;
  }
}
