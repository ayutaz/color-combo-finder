import { describe, it, expect } from "vitest";
import {
  complementary,
  analogous,
  triadic,
  monochromatic,
  harmonyTargets,
} from "./harmony.js";
import { hexToHsl } from "./convert.js";

describe("complementary", () => {
  it("2 色を返し、ベースを保持する", () => {
    const out = complementary("#ff0000");
    expect(out).toHaveLength(2);
    expect(out[0]).toBe("#ff0000");
  });
  it("赤の補色はシアン付近 (H≈180)", () => {
    const [, comp] = complementary("#ff0000");
    expect(hexToHsl(comp!).h).toBeCloseTo(180, 0);
  });
  it("青の補色は黄付近 (H≈60)", () => {
    const [, comp] = complementary("#0000ff");
    expect(hexToHsl(comp!).h).toBeCloseTo(60, 0);
  });
});

describe("analogous", () => {
  it("3 色を返す", () => {
    expect(analogous("#ff0000")).toHaveLength(3);
  });
  it("中央がベース、両端が ±30°", () => {
    const [left, mid, right] = analogous("#ff0000");
    expect(mid).toBe("#ff0000");
    expect(hexToHsl(left!).h).toBeCloseTo(330, 0);
    expect(hexToHsl(right!).h).toBeCloseTo(30, 0);
  });
});

describe("triadic", () => {
  it("3 色を返し、ベース・+120°・+240°", () => {
    const [a, b, c] = triadic("#ff0000");
    expect(a).toBe("#ff0000");
    expect(hexToHsl(b!).h).toBeCloseTo(120, 0);
    expect(hexToHsl(c!).h).toBeCloseTo(240, 0);
  });
});

describe("monochromatic", () => {
  it("デフォルトで 4 色を返す", () => {
    expect(monochromatic("#1a73e8")).toHaveLength(4);
  });
  it("色相を変えず、明度のみ変化", () => {
    const base = hexToHsl("#1a73e8");
    const out = monochromatic("#1a73e8");
    for (const hex of out) {
      const hsl = hexToHsl(hex);
      expect(hsl.h).toBeCloseTo(base.h, 0);
    }
    const lightnesses = out.map((h) => hexToHsl(h).l);
    const sorted = [...lightnesses].sort((a, b) => a - b);
    expect(sorted).toEqual(lightnesses);
  });
});

describe("harmonyTargets", () => {
  it("ルール名に応じた配列を返す", () => {
    expect(harmonyTargets("complementary", "#ff0000")).toHaveLength(2);
    expect(harmonyTargets("analogous", "#ff0000")).toHaveLength(3);
    expect(harmonyTargets("triadic", "#ff0000")).toHaveLength(3);
    expect(harmonyTargets("monochromatic", "#ff0000")).toHaveLength(4);
  });
});
