# 6. データモデル

技術調査向けの試作のため、データモデルは **最小限の型定義のみ**。永続化なし、URL 同期なし。

## 6.1 型定義（TypeScript）

```ts
/** sRGB の HEX 表記。"#RRGGBB" を想定 */
export type Hex = string;

/** パレット内の 1 色 */
export interface PaletteColor {
  hex: Hex;
  /** 任意の表示名（"primary" 等） */
  name?: string;
}

/** ハードコードされたパレット */
export interface Palette {
  id: string;
  name: string;
  colors: PaletteColor[];
}

/** 色彩理論ルール */
export type Harmony =
  | "complementary"
  | "analogous"
  | "triadic"
  | "monochromatic";

/** 計算結果 1 件 */
export interface Combo {
  harmony: Harmony;
  /** 色彩理論で算出された理想色 */
  targets: Hex[];
  /** パレットからマッピングされた実色（targets と同じ長さ） */
  matches: PaletteColor[];
}
```

## 6.2 パレットの定義場所

`src/palettes.ts` にハードコードする。例：

```ts
export const PALETTES: Palette[] = [
  {
    id: "sample-1",
    name: "Sample",
    colors: [
      { hex: "#1A73E8", name: "blue" },
      { hex: "#FBBC04", name: "yellow" },
      { hex: "#34A853", name: "green" },
      { hex: "#EA4335", name: "red" },
      { hex: "#9C27B0", name: "purple" },
      { hex: "#212121", name: "ink" },
      { hex: "#FAFAFA", name: "paper" },
    ],
  },
];
```

パレットの追加・差し替えは **コードを直接編集** して再デプロイで対応する（動的編集 UI は作らない）。

## 6.3 永続化

行わない。リロードでベースカラーはデフォルト値に戻る。
