import { useRef, useEffect, useCallback, useState } from "react";

export default function useWebGL(
  drawCallback: (gl: WebGLRenderingContext, time: number) => void,
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

      const gl = canvas.getContext("webgl");
      if (!gl) {
        console.error("WebGL not supported in this browser.");
        return;
      }

      gl.clearColor(0, 0, 0, 1);
      gl.clear(gl.COLOR_BUFFER_BIT);

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

      drawCallback(gl, time);
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

  // TODO: Implement drawTiledImage function & return it
  // const drawTiledImage = (gl: WebGLRenderingContext, image: HTMLImageElement) => {...};

  return { canvasRef, fps: renderFps };
}
