# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## プロジェクトの位置づけ

「Color Combo Finder」は、ユーザーが指定したベースカラーと事前登録された数色のパレットから、色彩理論に基づく組み合わせを計算して可視化するクライアントサイドツール。

**主目的は技術調査・試作**。商用品質のフルスペックなツールを作るのではなく、

- 色彩理論の組み合わせアルゴリズム
- パレットへの近傍マッピング（CIEDE2000）
- ブラウザでの軽量な可視化
- GitHub Actions + GitHub Pages の CI/CD

を **最小コードで動かして理解する** ことに価値を置く。

## 重要な方針（実装に着手する前に必ず読む）

要求定義は `docs/requirements/` にある。実装作業に入る前に **必ず** これを参照すること。要件は意図的に **Must を最小限に絞り、それ以外は Won't** にしてある。

```
docs/requirements/
├── README.md                       # 目次・位置づけ
├── 01-overview.md                  # スコープ
├── 02-use-cases.md                 # ユースケース 1 件のみ
├── 03-functional-requirements.md   # FR-XX（Must / Won't を明示）
├── 04-non-functional-requirements.md
├── 05-color-theory.md              # 計算ロジックの根拠
├── 06-data-model.md                # TypeScript 型定義案
├── 07-screens.md                   # 1 画面のみ
├── 08-tech-stack.md                # 最小構成（Vite + TS + culori）
└── 09-milestones.md                # M0（基盤+CI/CD） / M1（コア機能）
```

## 絶対に守るべき制約

実装中、これを破る前に必ず要求定義を更新すること。

1. **シンプルさを優先する**。技術調査が目的なので、過剰設計しない。
   - React / Tailwind / Redux などのフレームワークは採用しない（[08-tech-stack §8.2](./docs/requirements/08-tech-stack.md)）
   - 素の TypeScript + DOM API + 素の CSS で組む
   - 状態管理ライブラリも入れない

2. **色計算ロジックは UI から完全分離する**（NFR-20）
   - `src/color/` に純関数として配置
   - DOM / Vite / culori 以外の依存を入れない

3. **CI/CD を最初に通す**（M0）
   - 「動くアプリ」より前に、空でもいいから GitHub Actions → GitHub Pages のパイプラインを通す

4. **要求の Won't を勝手に Must に格上げしない**
   - レスポンシブ・ダークモード・WCAG 準拠・パレット編集 UI・URL 同期・エクスポート機能などは **明示的に対象外**
   - 必要になったら先に要求定義を更新してから実装

5. **GitHub Pages の base path に注意**
   - リポジトリ名でホストされるため、Vite の `base` を `'/<repo-name>/'` に設定する必要がある（[08-tech-stack §8.5](./docs/requirements/08-tech-stack.md)）

## 技術スタック（確定）

| 種別 | 採用 |
| --- | --- |
| 言語 | TypeScript（strict） |
| バンドラ | Vite |
| UI | 素の TypeScript + DOM API |
| スタイル | 素の CSS |
| 色計算 | culori |
| テスト | Vitest |
| パッケージマネージャ | pnpm |
| CI/CD | GitHub Actions |
| ホスティング | GitHub Pages |

## 想定ディレクトリ構成

```
color-combo-finder/
├── .github/workflows/ci.yml   # テスト + Pages デプロイ
├── docs/requirements/
├── src/
│   ├── color/                 # 色計算（UI 非依存）
│   ├── palettes.ts            # ハードコードされたサンプルパレット
│   ├── ui.ts                  # DOM 操作
│   └── main.ts
├── index.html
├── style.css
├── package.json
└── vite.config.ts
```

## 現在のステータス

**実装前**。要求定義のみ存在。`package.json` / ビルドコマンドは未定義。実装着手後にこの CLAUDE.md の「ビルド・テストコマンド」セクションを追記すること。

## 作業手順

1. 機能を実装する前に、対応する要件 ID（FR-XX / NFR-XX）を要求定義から特定する
2. 仕様変更が必要になったら、コードより先に `docs/requirements/` を更新する
3. M0 が完了する前に M1 の機能には踏み込まない
4. 過剰な抽象化・将来拡張のための作り込みを避ける（YAGNI）
