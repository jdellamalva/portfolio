import { Wave } from "@/app/classes/Wave";
import { interpolateColor } from "@/app/classes/DotUtils";

const WAVE_SPEED = 0.005;

export class WaveManager {
  static computeSeaWaveColor(x: number, y: number, time: number) {
    const waves = [
      new Wave("sine", 500, 0.5, Math.PI / 4),
      new Wave("sine", 300, 0.3, Math.PI / 6),
      new Wave("perlin", 400),
    ];

    const totalWave = waves.reduce(
      (sum, wave) => sum + wave.evaluate(x, y, time, WAVE_SPEED),
      0
    );

    const normalizedWave = 0.5 + 0.5 * (totalWave / waves.length);
    return interpolateColor(Math.max(0, Math.min(1, normalizedWave)));
  }
}
