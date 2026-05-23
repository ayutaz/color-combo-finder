import { describe, it, expect } from "vitest";
import { nearest, nearestMany, type PaletteColor } from "./nearest.js";

const palette: PaletteColor[] = [
  { hex: "#ff0000", name: "red" },
  { hex: "#00ff00", name: "green" },
  { hex: "#0000ff", name: "blue" },
  { hex: "#ffff00", name: "yellow" },
  { hex: "#000000", name: "black" },
  { hex: "#ffffff", name: "white" },
];

describe("nearest", () => {
  it("赤に近い色は red", () => {
    expect(nearest("#fe0101", palette).name).toBe("red");
  });
  it("パレットに同一色があれば自身を返す", () => {
    expect(nearest("#0000ff", palette).name).toBe("blue");
    expect(nearest("#ffff00", palette).name).toBe("yellow");
  });
  it("明るいグレーは白に近い", () => {
    expect(nearest("#ededed", palette).name).toBe("white");
  });
  it("暗いグレーは黒に近い", () => {
    expect(nearest("#101010", palette).name).toBe("black");
  });
  it("空パレットはエラー", () => {
    expect(() => nearest("#ff0000", [])).toThrow();
  });
});

describe("nearestMany", () => {
  it("入力数と同じ長さを返す", () => {
    const out = nearestMany(["#ff0000", "#0000ff", "#000000"], palette);
    expect(out.map((p) => p.name)).toEqual(["red", "blue", "black"]);
  });
});
