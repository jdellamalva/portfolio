import { useRef, useEffect, useCallback, useState } from "react";

export function useCanvas(
  drawCallback: (ctx: CanvasRenderingContext2D, time: number) => void,
  onResize?: () => void
) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number | null>(null);
  const lastFrameTimeRef = useRef<number>(performance.now());
  const fpsRef = useRef<number>(0);
  const [renderFps, setRenderFps] = useState(0);
  const lastFpsUpdateRef = useRef<number>(performance.now());

  const draw = useCallback(
    (time: number) => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const delta = Math.max(16, time - lastFrameTimeRef.current);
      lastFrameTimeRef.current = time;

      if (delta > 0) {
        const currentFps = 1000 / delta;
        fpsRef.current = fpsRef.current * 0.9 + currentFps * 0.1;

        if (performance.now() - lastFpsUpdateRef.current >= 500) {
          setRenderFps(Math.round(fpsRef.current));
          lastFpsUpdateRef.current = performance.now();
        }
      }

      drawCallback(ctx, time);
      animationFrameRef.current = requestAnimationFrame(draw);
    },
    [drawCallback]
  );

  useEffect(() => {
    const resizeCanvas = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      if (onResize) onResize();
    };

    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();
    animationFrameRef.current = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      if (animationFrameRef.current)
        cancelAnimationFrame(animationFrameRef.current);
    };
  }, [draw, onResize]);

  return { canvasRef, fps: renderFps };
}
