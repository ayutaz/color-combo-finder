import { differenceCiede2000 } from "culori";
import type { Hex } from "./convert.js";

export interface PaletteColor {
  hex: Hex;
  name?: string;
}

const delta = differenceCiede2000();

export function nearest(target: Hex, palette: PaletteColor[]): PaletteColor {
  if (palette.length === 0) throw new Error("empty palette");
  let bestIdx = 0;
  let bestD = Infinity;
  for (let i = 0; i < palette.length; i++) {
    const d = delta(target, palette[i]!.hex);
    if (d < bestD) {
      bestD = d;
      bestIdx = i;
    }
  }
  return palette[bestIdx]!;
}

export function nearestMany(
  targets: Hex[],
  palette: PaletteColor[],
): PaletteColor[] {
  return targets.map((t) => nearest(t, palette));
}
