export interface DotGridProps {
  density: number;
  dotRadius: number;
  onFpsUpdate?: (fps: number) => void;
  onDotCountUpdate?: (count: number) => void;
}
