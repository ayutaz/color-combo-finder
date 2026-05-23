import { parse, converter, formatHex } from "culori";

const toHsl = converter("hsl");
const toLab = converter("lab");

export interface Hsl {
  /** 色相 0..360 (achromatic の場合は 0 にフォールバック) */
  h: number;
  /** 彩度 0..1 */
  s: number;
  /** 明度 0..1 */
  l: number;
}

export interface Lab {
  l: number;
  a: number;
  b: number;
}

export type Hex = string;

const HEX_RE = /^#?[0-9a-fA-F]{6}$/;

export function isValidHex(input: string): boolean {
  return HEX_RE.test(input.trim());
}

export function normalizeHex(input: string): Hex {
  const t = input.trim();
  const withHash = t.startsWith("#") ? t : `#${t}`;
  return withHash.toLowerCase();
}

export function hexToHsl(hex: Hex): Hsl {
  const parsed = parse(hex);
  if (!parsed) throw new Error(`invalid hex: ${hex}`);
  const hsl = toHsl(parsed);
  return {
    h: hsl.h ?? 0,
    s: hsl.s,
    l: hsl.l,
  };
}

export function hslToHex(hsl: Hsl): Hex {
  return formatHex({
    mode: "hsl",
    h: hsl.h,
    s: hsl.s,
    l: hsl.l,
  });
}

export function hexToLab(hex: Hex): Lab {
  const parsed = parse(hex);
  if (!parsed) throw new Error(`invalid hex: ${hex}`);
  const lab = toLab(parsed);
  return { l: lab.l, a: lab.a, b: lab.b };
}

/** 色相を 0..360 に正規化（負値・360 超に対応） */
export function wrapHue(h: number): number {
  const wrapped = h % 360;
  return wrapped < 0 ? wrapped + 360 : wrapped;
}
