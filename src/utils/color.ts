/* eslint-disable @typescript-eslint/no-use-before-define */
type HSLColor = {
  h: number;
  s: number;
  l: number;
};

type RGBColor = {
  r: number;
  g: number;
  b: number;
};

export function hexToRgb(hex: string): RGBColor {
  const cleanedHex = hex.replace('#', '');
  const bigint = parseInt(cleanedHex, 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;

  return { r, g, b };
}

export function hslToRgb({ h, l, s }: HSLColor): string {
  let r, g, b;
  if (s === 0) {
    r = g = b = l;
  } else {
    let hue = h / 360;
    if (hue < 0) {
      hue = hue + 1;
    }
    if (hue > 1) {
      hue = hue - 1;
    }
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;

    r = hue2rgb(p, q, hue + 1 / 3);
    g = hue2rgb(p, q, hue);
    b = hue2rgb(p, q, hue - 1 / 3);
  }
  const rHex = Math.round(r * 255)
    .toString(16)
    .padStart(2, '0');
  const gHex = Math.round(g * 255)
    .toString(16)
    .padStart(2, '0');
  const bHex = Math.round(b * 255)
    .toString(16)
    .padStart(2, '0');
  return `#${rHex}${gHex}${bHex}`;
}
function hue2rgb(p: number, q: number, t: number): number {
  // eslint-disable-next-line no-param-reassign
  if (t < 0) t += 1;
  // eslint-disable-next-line no-param-reassign
  if (t > 1) t -= 1;
  if (t < 1 / 6) return p + (q - p) * 6 * t;
  if (t < 1 / 2) return q;
  if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
  return p;
}
export function rgbToHsl({ r, g, b }: RGBColor): HSLColor {
  // Convert RGB values to floats with higher precision
  const fr = r / 256;
  const fg = g / 256;
  const fb = b / 256;

  const max = Math.max(fr, fg, fb);
  const min = Math.min(fr, fg, fb);
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;

  if (max === min) {
    h = 0;
    s = 0;
  } else {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case fr:
        h = (fg - fb) / d + (fg < fb ? 6 : 0);
        break;
      case fg:
        h = (fb - fr) / d + 2;
        break;
      case fb:
        h = (fr - fg) / d + 4;
        break;
    }
    h /= 6;
  }

  return {
    h: h * 360,
    s,
    l,
  };
}
