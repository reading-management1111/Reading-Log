# MyLibrary 📚

React + TypeScript + Vite で作成した、書籍管理アプリです。
`src/App.tsx` と `src/components/ui/` 配下のコンポーネントで実装されています。

## 概要

登録した本を一覧表示し、絞り込み・並び替え・新規登録・読了ステータスの変更ができるアプリです。

## 主な機能

- **集計表示**: 登録冊数、読了数・読了率、合計金額を表示（`BookSummary`）
- **絞り込み・並び替え**: ステータス（すべて／未読／読書中／読了）で絞り込み、価格の昇順・降順で並び替え（`BookFilter`）
- **書籍一覧**: 絞り込み・並び替え後の一覧を表示。読了済みの本には★評価とメモを表示（`BookList` / `BookItem`）
- **読了にする**: 未読・読書中の本を読了ステータスに変更（子→親コンポーネントへのリフトアップで状態更新）
- **新規登録フォーム**: タイトル・著者・価格・状態・（読了時のみ）評価・メモを入力して登録（`BookForm`）
  - `react-hook-form` + `yup` によるバリデーション
    - タイトル: 必須、30文字以内
    - 著者: 必須、20文字以内、「匿名」は入力不可
    - 価格: 必須、1〜100,000円の整数
    - 状態: 必須（未読／読書中／読了）
    - 評価: 状態が「読了」の場合のみ必須（1〜5）
    - メモ: 任意、100文字以内

## コンポーネント構成

```
App.tsx                          # 状態管理（books / filter / sortOrder）とレイアウト
components/ui/
  ├─ Panel.tsx                   # 見出し付きの汎用パネル（子要素をラップ）
  ├─ BookSummary.tsx             # 集計表示
  ├─ BookFilter.tsx              # 絞り込み・並び替えのUI
  ├─ BookList.tsx                # 書籍一覧（空の場合はメッセージ表示）
  ├─ BookItem.tsx                # 書籍1件分の表示・読了ボタン
  ├─ BookForm.tsx                # 新規登録フォーム
  ├─ types.ts                    # Book / FilterStatus / SortOrder などの型定義
  ├─ filterBooksByStatus.ts      # ステータスによる絞り込みロジック
  └─ sortBooksByPrice.ts         # 価格による並び替えロジック
```

## データフロー・状態管理

- 書籍データ（`books`）、絞り込み条件（`filter`）、並び替え順（`sortOrder`）は `App.tsx` で state として一元管理しています。
- 表示用データ（絞り込み・並び替え後の一覧）は元の `books` を変更せず、都度計算しています（`filterBooksByStatus` → `sortBooksByPrice`）。
- 「読了にする」「新規登録」は子コンポーネントから `App.tsx` へコールバック経由で状態を更新します（リフトアップ）。

## セットアップ

```bash
pnpm install
pnpm dev
```

## 主なスクリプト

| コマンド | 内容 |
| --- | --- |
| `pnpm dev` | 開発サーバーを起動 |
| `pnpm build` | 型チェック（`tsc -b`）とビルド |
| `pnpm lint` | Oxlint によるLint実行 |
| `pnpm storybook` | Storybook を起動 |
| `pnpm build-storybook` | Storybook をビルド |

## 主な技術スタック

- React 19 / TypeScript / Vite
- react-hook-form + yup（フォームバリデーション）
- CSS Modules（`BookList.module.css` / `BookItem.module.css`）
