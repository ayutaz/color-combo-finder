import { hexToHsl, hslToHex, wrapHue, type Hex } from "./convert.js";

export type Harmony =
  | "complementary"
  | "analogous"
  | "triadic"
  | "monochromatic";

export function complementary(base: Hex): Hex[] {
  const hsl = hexToHsl(base);
  return [base, hslToHex({ ...hsl, h: wrapHue(hsl.h + 180) })];
}

export function analogous(base: Hex): Hex[] {
  const hsl = hexToHsl(base);
  return [
    hslToHex({ ...hsl, h: wrapHue(hsl.h - 30) }),
    base,
    hslToHex({ ...hsl, h: wrapHue(hsl.h + 30) }),
  ];
}

export function triadic(base: Hex): Hex[] {
  const hsl = hexToHsl(base);
  return [
    base,
    hslToHex({ ...hsl, h: wrapHue(hsl.h + 120) }),
    hslToHex({ ...hsl, h: wrapHue(hsl.h + 240) }),
  ];
}

/**
 * 同色相で明度を等分。
 * 4 段なら L = 0.2, 0.4, 0.6, 0.8。
 */
export function monochromatic(base: Hex, steps = 4): Hex[] {
  const hsl = hexToHsl(base);
  return Array.from({ length: steps }, (_, i) => {
    const l = (i + 1) / (steps + 1);
    return hslToHex({ ...hsl, l });
  });
}

export function harmonyTargets(harmony: Harmony, base: Hex): Hex[] {
  switch (harmony) {
    case "complementary":
      return complementary(base);
    case "analogous":
      return analogous(base);
    case "triadic":
      return triadic(base);
    case "monochromatic":
      return monochromatic(base);
  }
}
