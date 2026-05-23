import type { PaletteColor } from "./color/nearest.js";

export interface Palette {
  id: string;
  name: string;
  colors: PaletteColor[];
}

export const PALETTES: Palette[] = [
  {
    id: "sample-1",
    name: "Sample",
    colors: [
      { hex: "#1a73e8", name: "blue" },
      { hex: "#fbbc04", name: "yellow" },
      { hex: "#34a853", name: "green" },
      { hex: "#ea4335", name: "red" },
      { hex: "#9c27b0", name: "purple" },
      { hex: "#212121", name: "ink" },
      { hex: "#fafafa", name: "paper" },
    ],
  },
];
