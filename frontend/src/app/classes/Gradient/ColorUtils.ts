export type RGB = { r: number; g: number; b: number };
export type RGBA = RGB & { a: number };
export type GradientStop = { stop: number; color: RGBA };

/**
 * Converts an RGB or RGBA object into an rgba() CSS color string.
 * If alpha (`a`) is not provided, it defaults to 1.
 * @param color RGB or RGBA object
 * @returns string
 */
export const toColorString = (color: RGB | RGBA): string => {
  const alpha = "a" in color ? color.a! : 1; // Defaults to 1 if 'a' is missing
  return `rgba(${color.r}, ${color.g}, ${color.b}, ${alpha})`;
};

/**
 * Interpolates between two colors using linear interpolation.
 * @param color1 First RGBA color
 * @param color2 Second RGBA color
 * @param t Interpolation factor (0 to 1)
 * @returns Interpolated RGBA color
 */
export const lerpColor = (color1: RGBA, color2: RGBA, t: number): RGBA => {
  return {
    r: Math.round(color1.r + (color2.r - color1.r) * t),
    g: Math.round(color1.g + (color2.g - color1.g) * t),
    b: Math.round(color1.b + (color2.b - color1.b) * t),
    a: Math.max(0, Math.min(1, color1.a + (color2.a - color1.a) * t)),
  };
};
