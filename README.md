# Color Combo Finder

色彩理論に基づいて、ユーザーが指定した **ベースカラー** と事前登録した **数色のパレット** から、相性の良い色の組み合わせを計算・可視化するブラウザツール。

> **このプロジェクトは技術調査・試作が主目的です。**
> 商用品質のフルスペックなツールではなく、色彩理論の組み合わせアルゴリズム、CIEDE2000 による近傍色マッピング、GitHub Actions + GitHub Pages の CI/CD を最小コードで動かして理解することを目的にしています。

## できること（予定）

- HEX で指定したベースカラーに対して、以下の組み合わせを計算
  - 補色（Complementary）
  - 類似色（Analogous）
  - トライアド（Triadic）
  - モノクロマティック（Monochromatic）
- 理想色を、ハードコードされたパレット内の **最も近い実色** にマッピング（色差は CIEDE2000）
- 結果をチップで表示

## やらないこと

技術調査向けに意図的にスコープを絞っています。以下は **明示的に対象外**：

- 複数パレットの管理・編集・保存・共有
- カラーピッカー以外の入力 UI（RGB / HSL 直接入力など）
- カラーホイール可視化、UI プレビュー
- ダーク／ライトモード、レスポンシブ
- WCAG 厳密対応、アクセシビリティ要件
- 多言語対応
- localStorage 永続化、URL ステート同期、お気に入り

詳細は [`docs/requirements/`](./docs/requirements/) を参照してください。

## 技術スタック

| 種別 | 採用 |
| --- | --- |
| 言語 | TypeScript（strict） |
| バンドラ | Vite |
| UI | 素の TypeScript + DOM API（フレームワーク不採用） |
| スタイル | 素の CSS |
| 色計算 | [culori](https://culorijs.org/) |
| テスト | Vitest |
| CI/CD | GitHub Actions |
| ホスティング | GitHub Pages |

## プロジェクト構成（想定）

```
color-combo-finder/
├── .github/workflows/ci.yml   # テスト + Pages デプロイ
├── docs/requirements/         # 要求定義一式
├── src/
│   ├── color/                 # 色計算（UI 非依存）
│   ├── palettes.ts            # サンプルパレット
│   ├── ui.ts                  # DOM 操作
│   └── main.ts
├── index.html
├── style.css
└── vite.config.ts
```

## ステータス

**実装前**。現時点では要求定義のみがコミットされています。

開発フェーズ:

- **M0**: 基盤 + CI/CD パイプライン（Vite 雛形 + GitHub Actions + Pages デプロイを通す）
- **M1**: コア機能（色計算ロジック + 最小 UI）

詳細は [`docs/requirements/09-milestones.md`](./docs/requirements/09-milestones.md) を参照。

## ドキュメント

| ファイル | 内容 |
| --- | --- |
| [`docs/requirements/README.md`](./docs/requirements/README.md) | 要求定義の目次・位置づけ |
| [`docs/requirements/01-overview.md`](./docs/requirements/01-overview.md) | プロジェクト概要・スコープ |
| [`docs/requirements/02-use-cases.md`](./docs/requirements/02-use-cases.md) | ユースケース |
| [`docs/requirements/03-functional-requirements.md`](./docs/requirements/03-functional-requirements.md) | 機能要件（Must / Won't） |
| [`docs/requirements/04-non-functional-requirements.md`](./docs/requirements/04-non-functional-requirements.md) | 非機能要件 |
| [`docs/requirements/05-color-theory.md`](./docs/requirements/05-color-theory.md) | 色彩理論の前提 |
| [`docs/requirements/06-data-model.md`](./docs/requirements/06-data-model.md) | データモデル |
| [`docs/requirements/07-screens.md`](./docs/requirements/07-screens.md) | 画面構成 |
| [`docs/requirements/08-tech-stack.md`](./docs/requirements/08-tech-stack.md) | 技術スタック |
| [`docs/requirements/09-milestones.md`](./docs/requirements/09-milestones.md) | マイルストーン |
| [`CLAUDE.md`](./CLAUDE.md) | Claude Code 向けガイダンス |

## ライセンス

未定。
