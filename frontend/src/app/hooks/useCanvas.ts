import { useRef, useEffect, useCallback, useState } from "react";

export function useCanvas(
  drawCallback: (ctx: CanvasRenderingContext2D, time: number) => void,
  onResize?: () => void
) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number | null>(null);
  const lastFrameTimeRef = useRef<number>(performance.now());
  const frameCountRef = useRef<number>(0);
  const fpsRef = useRef<number>(0);
  const [, setRenderFps] = useState(0);

  const draw = useCallback(
    (time: number) => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const delta = lastFrameTimeRef.current
        ? time - lastFrameTimeRef.current
        : 16;
      lastFrameTimeRef.current = time;

      if (delta > 0) {
        const currentFps = 1000 / delta;

        frameCountRef.current += 1;
        fpsRef.current = fpsRef.current * 0.9 + currentFps * 0.1;

        if (frameCountRef.current >= 10) {
          setRenderFps(Math.round(fpsRef.current));
          frameCountRef.current = 0;
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

  return { canvasRef, fps: Math.round(fpsRef.current) };
}
