# Light Theme Redesign — LuminaWhisper Site

**Date**: 2026-03-29
**Goal**: 現在の読みづらいダークテーマを、アプリアイコンのカラーをベースにしたライトテーマに全面リデザインする

---

## 問題の現状

- コントラスト比が極めて低い（1.1:1〜2.1:1、必要最低4.5:1）
- フォントサイズが異常に小さい（9px〜12px が多数）
- `tracking-[0.4em]` など letter-spacing が過大で単語が読めない
- ガイドページで `text-gray-800` などハードコードされた色がデザイントークンを無視
- セリフフォントを本文にも使用している

---

## デザイン方針

### カラーパレット（アイコンベース）

アプリアイコンの色：ダークネイビー/インディゴブルー（`#2B2D5F`系）＋ホワイトのサウンドウェーブ

| トークン | 現在値 | 新しい値 | 用途 |
|---------|--------|---------|------|
| `--color-bg` | `#0c0b09` | `#FAFAFA` | ページ背景 |
| `--color-surface` | `#131210` | `#F0F2F8` | カードやセクション背景 |
| `--color-surface-2` | `#1c1a16` | `#E8EBF5` | hover背景など |
| `--color-border` | `#272218` | `#DDE1EF` | ボーダー |
| `--color-accent` | `#c8955f` | `#2B2D5F` | アイコンのネイビーブルー |
| `--color-accent-hover` | `#e0aa72` | `#3D3F7A` | hover時のアクセント |
| `--color-text` | `#e8ddd0` | `#1A1C2E` | 本文テキスト |
| `--color-text-muted` | `#6b5f52` | `#5A5D7A` | 補助テキスト |
| `--color-text-dim` | `#3a312a` | `#9599BB` | 薄いラベルテキスト |

`body` の背景色と `bg-[#0c0b09]` などハードコードされた値も全て更新する。

### タイポグラフィ

| 問題 | 修正方針 |
|------|---------|
| 9px〜12pxのフォント | 最小14px（ラベル類は12px最低限） |
| `tracking-[0.4em]` 等の過大なletter-spacing | ラベル: `tracking-[0.1em]`、通常テキスト: デフォルト |
| セリフフォントを本文に使用 | 見出し（h1/h2/h3）のみserifを維持。本文はsans |
| ガイドページのハードコードされた色 | デザイントークンに統一 |

### コントラスト目標

WCAG AA準拠（4.5:1以上）を全テキストで達成する。

---

## 変更スコープ

### 1. `src/index.css`
- `@theme` のカラートークンを全更新
- `body` の `background-color` と `color` を更新

### 2. `src/components/Navbar.tsx`
- 背景: `bg-[#0c0b09]/95` → `bg-white/95`
- ボーダー: ライト系
- テキスト色: 全てトークンベースに統一
- フォントサイズ: Guideリンク `11px` → `14px`、言語ボタン `10px` → `12px`、ダウンロードボタン `10px` → `12px`
- letter-spacing: `tracking-[0.2em]` → `tracking-[0.05em]`

### 3. `src/components/Footer.tsx`
- 背景・ボーダー: ライト系
- フォントサイズ: `10px` → `12px`
- letter-spacing: 縮小

### 4. `src/pages/LandingPage.tsx`
- ページ背景: ライト系
- ラジアルグローの色: アクセントカラーに合わせて変更
- Hero小テキスト: `10px` → `12px`、letter-spacing縮小
- Features番号・説明文: サイズアップ、コントラスト確保
- How to use: 背景、グリッド線、テキスト色を更新
- CTAセクション: ボタンスタイルをネイビー系に

### 5. `src/pages/guide/GuideLayout.tsx`
- ページ背景: ライト系
- サイドバーセクション見出し: `9px` → `12px`、letter-spacing縮小
- サイドバーNavLink: `text-xs` → `text-sm`
- アクティブ状態: 色＋font-mediumで判別性向上
- ページネーションボタン: サイズアップ

### 6. `src/pages/guide/*.tsx`（全6ページ）
- ハードコードされた `text-gray-800`, `text-gray-600`, `bg-gray-100`, `bg-blue-50` などを全てデザイントークンに置換
- `text-primary`, `text-accent` などの非標準クラスも対応
- コードブロック: ライトテーマ向けスタイル

---

## 維持するもの

- fadeUpアニメーション（キーフレーム・クラス）
- レイアウト構造（Hero/Features/HowToUse/CTA）
- セリフフォントによる見出しスタイル
- 全i18n翻訳テキスト
- React Router・NavLinkのロジック
- テスト

---

## 実装順序

1. `index.css` — デザイントークン更新（最初に行い、他の変更がトークンを使えるようにする）
2. `Navbar.tsx` — 全ページで表示されるため優先
3. `Footer.tsx`
4. `LandingPage.tsx`
5. `GuideLayout.tsx`
6. ガイドページ群（6ファイル）— ハードコードされた色を一括置換
