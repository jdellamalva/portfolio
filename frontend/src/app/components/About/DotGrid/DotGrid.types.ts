export interface DotGridProps {
  density: number;
  dotRadius: number;
  showImage: boolean;
  renderer: "canvas" | "webgl";
  onFpsUpdate?: (fps: number) => void;
  onDotCountUpdate?: (count: number) => void;
}
