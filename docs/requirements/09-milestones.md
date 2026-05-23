# 9. マイルストーン

技術調査向けの試作のため、**2 フェーズ** に絞り込む。

## 9.1 フェーズ一覧

| フェーズ | 名称 | 目的 |
| --- | --- | --- |
| **M0** | 基盤 + デプロイパイプライン | プロジェクト雛形と CI/CD を最初に通す |
| **M1** | コア機能 | 色計算と最小 UI を実装 |

M2 以降は **未計画**。M1 が動いてから、その時点での関心事に応じて検討する。

## 9.2 M0: 基盤 + デプロイパイプライン（達成済み）

最初に「空でもいいから GitHub Pages に出る状態」を作る。これが動かないと後段の意味がない。

- [x] Vite + TypeScript の最小プロジェクトを作成
- [x] `index.html` に "Hello" を表示するだけの状態でビルド可能
- [x] Vitest のサンプルテスト 1 本（`1 + 1 === 2` 程度）
- [x] `.github/workflows/ci.yml` を作成
  - push / PR でテスト実行
  - main マージ後に `pnpm build` → GitHub Pages デプロイ
- [x] GitHub リポジトリ設定で Pages の Source を「GitHub Actions」に設定（`configure-pages@v5` の `enablement: true` で自動）
- [x] 公開 URL でページが見える状態: https://ayutaz.github.io/color-combo-finder/

**達成条件**: main に空コミットを push したら、テストが走って GitHub Pages に反映される。

## 9.3 M1: コア機能（達成済み）

色計算と最小 UI。

- [x] `src/color/convert.ts`: HEX ↔ sRGB ↔ HSL ↔ Lab 変換
- [x] `src/color/harmony.ts`: 補色・類似色・トライアド・モノクロマティック
- [x] `src/color/nearest.ts`: CIEDE2000 を使ったパレット最近傍探索
- [x] 上記すべてに Vitest で単体テスト（25 件 / 全 PASS）
- [x] `src/palettes.ts`: サンプルパレット 1 種をハードコード
- [x] `src/ui.ts` + `index.html`: HEX 入力欄、4 ルール × チップ表示
- [x] CIEDE2000 は culori の API を利用（自前実装は不要）

**達成条件**: 公開 URL で HEX を入力すると、4 ルールの組み合わせがパレットの色でチップ表示される。

## 9.4 受け入れ基準（M1 完了時）

- 公開 URL でツールが操作できる
- 主要色（赤・青・緑）で目視確認した結果が直感に合う
- 色計算ロジックの単体テストがすべて通る
- GitHub Actions の最新ランがグリーン

## 9.5 後続テーマ（着手未定）

技術調査の関心が向いたときに検討するもの。要件には含めない：

- カラーホイール SVG 可視化
- WCAG コントラスト比表示
- パレット動的編集 / 保存
- URL ステート同期
- 色覚多様性シミュレーション
