import { describe, it, expect } from "vitest";
import {
  isValidHex,
  normalizeHex,
  hexToHsl,
  hslToHex,
  hexToLab,
  wrapHue,
} from "./convert.js";

describe("isValidHex", () => {
  it("# 付き 6 桁 HEX を受け入れる", () => {
    expect(isValidHex("#ff0000")).toBe(true);
    expect(isValidHex("#FFAA00")).toBe(true);
  });
  it("# 無し 6 桁 HEX も受け入れる", () => {
    expect(isValidHex("ff0000")).toBe(true);
  });
  it("不正な入力を拒否する", () => {
    expect(isValidHex("#xyz")).toBe(false);
    expect(isValidHex("#fff")).toBe(false);
    expect(isValidHex("")).toBe(false);
  });
});

describe("normalizeHex", () => {
  it("# を補い、小文字にする", () => {
    expect(normalizeHex("FF0000")).toBe("#ff0000");
    expect(normalizeHex("#FfAa00")).toBe("#ffaa00");
    expect(normalizeHex(" #112233 ")).toBe("#112233");
  });
});

describe("hexToHsl / hslToHex", () => {
  it("赤は H=0, S=1, L=0.5 付近", () => {
    const hsl = hexToHsl("#ff0000");
    expect(hsl.h).toBeCloseTo(0, 0);
    expect(hsl.s).toBeCloseTo(1, 2);
    expect(hsl.l).toBeCloseTo(0.5, 2);
  });
  it("ラウンドトリップで元の色相付近に戻る", () => {
    const hsl = hexToHsl("#1a73e8");
    const back = hslToHex(hsl);
    const hsl2 = hexToHsl(back);
    expect(hsl2.h).toBeCloseTo(hsl.h, 0);
  });
  it("achromatic な色は h=0 にフォールバック", () => {
    const hsl = hexToHsl("#808080");
    expect(hsl.h).toBe(0);
    expect(hsl.s).toBeCloseTo(0, 2);
  });
});

describe("hexToLab", () => {
  it("白は L≈100 付近", () => {
    const lab = hexToLab("#ffffff");
    expect(lab.l).toBeGreaterThan(99);
  });
  it("黒は L≈0 付近", () => {
    const lab = hexToLab("#000000");
    expect(lab.l).toBeLessThan(1);
  });
});

describe("wrapHue", () => {
  it("0..360 の範囲に正規化", () => {
    expect(wrapHue(0)).toBe(0);
    expect(wrapHue(360)).toBe(0);
    expect(wrapHue(-30)).toBe(330);
    expect(wrapHue(390)).toBe(30);
    expect(wrapHue(720)).toBe(0);
  });
});
