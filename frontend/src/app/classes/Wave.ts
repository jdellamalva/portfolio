const Noise = require("noisejs").Noise;

const perlin = new Noise(); // Global Perlin noise instance

export class Wave {
  constructor(
    public type: "sine" | "perlin",
    public wavelength: number = 100, // Distance between peaks
    public amplitude: number = 1, // How strong the wave effect is
    public angle: number = 0 // Only used for sine waves
  ) {}

  evaluate(x: number, y: number, time: number, speed: number) {
    if (this.type === "sine") {
      const dirX = Math.cos(this.angle);
      const dirY = Math.sin(this.angle);
      const projectedPosition = x * dirX + y * dirY;
      
      // Convert wavelength to frequency (smaller wavelength = higher frequency)
      const frequency = (2 * Math.PI) / this.wavelength;

      return (
        0.5 + 0.5 * Math.sin(time * speed + projectedPosition * frequency) * this.amplitude
      );
    }

    if (this.type === "perlin") {
      // Use wavelength to control noise scale (larger wavelength = smoother noise)
      return perlin.perlin3(x / this.wavelength, y / this.wavelength, time * speed) * 0.5 + 0.5;
    }

    return 0; // Default case (shouldn't happen)
  }
}
