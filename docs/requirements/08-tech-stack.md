# 8. 技術スタック

技術調査用の試作のため、**最小構成** を採用する。

## 8.1 採用スタック

| 種別 | 採用 | 補足 |
| --- | --- | --- |
| 言語 | **TypeScript**（strict） | 色計算の型安全性 |
| バンドラ | **Vite** | GitHub Pages 用に静的ビルドを生成 |
| UI フレームワーク | **素の TypeScript + DOM API** | フレームワーク不採用。状態管理も最小化 |
| スタイル | **素の CSS**（単一ファイル） | Tailwind 等は不採用 |
| 色計算ライブラリ | **culori** | ESM 対応、Lab/LCh、ΔE 計算が揃っている |
| テスト | **Vitest** | Vite と同居 |
| パッケージマネージャ | **pnpm** | お好みで npm でも可 |
| CI/CD | **GitHub Actions** | テスト + Pages デプロイ |
| ホスティング | **GitHub Pages** | リポジトリ設定で Actions デプロイを有効化 |

## 8.2 採用しないもの（理由）

| 候補 | 理由 |
| --- | --- |
| React / Vue / Svelte | 1 画面の試作に対して過剰。素の DOM で十分 |
| Tailwind CSS | スタイル量がごく少ないため不要 |
| Redux / Zustand | 状態が局所的でフレームワーク不要 |
| React Testing Library / Playwright | UI が薄く、計算ロジックを Vitest で押さえれば十分 |
| Storybook | コンポーネント数が少ないため不要 |
| ESLint / Prettier | 入れてもよいが必須ではない（小規模） |
| husky / lint-staged | 同上 |

調査範囲を広げたくなったらこの表を更新する。

## 8.3 ディレクトリ構成（想定）

```
color-combo-finder/
├── .github/
│   └── workflows/
│       └── ci.yml             # テスト + Pages デプロイ
├── docs/
│   └── requirements/
├── src/
│   ├── color/                 # 色計算（UI 非依存）
│   │   ├── convert.ts         # HEX ↔ HSL ↔ Lab
│   │   ├── harmony.ts         # 補色・類似色・トライアド・モノクロ
│   │   ├── nearest.ts         # ΔE による最近傍探索
│   │   └── *.test.ts          # 単体テスト
│   ├── palettes.ts            # サンプルパレットのハードコード
│   ├── ui.ts                  # DOM 操作
│   └── main.ts                # エントリポイント
├── index.html
├── style.css
├── package.json
├── tsconfig.json
└── vite.config.ts
```

## 8.4 GitHub Actions ワークフロー（想定）

`.github/workflows/ci.yml` で以下を行う：

1. push / PR トリガー
2. Node セットアップ + pnpm install
3. `pnpm test` 実行（Vitest）
4. main ブランチかつテスト成功時のみ:
   - `pnpm build`（Vite 静的ビルド）
   - `actions/upload-pages-artifact` で `dist/` をアップロード
   - `actions/deploy-pages` で GitHub Pages にデプロイ

GitHub リポジトリ設定の Pages セクションで Source を「GitHub Actions」に設定する前提。

## 8.5 Vite の GitHub Pages 設定

リポジトリ名 `color-combo-finder` でホストする場合、`vite.config.ts` で `base: '/color-combo-finder/'` を指定する必要がある（カスタムドメインを使わない場合）。
