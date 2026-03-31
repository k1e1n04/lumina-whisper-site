# SEO対策 設計書

**Date:** 2026-04-01  
**Goal:** lumina-whisper-site の SEO を包括的に改善する。HashRouter を BrowserRouter + SSG に移行し、ページ別メタタグ・OGP画像・構造化データ・sitemap を整備する。

---

## 1. ルーティング移行（HashRouter → BrowserRouter）

### 問題
`App.tsx` が `HashRouter` を使用しており、URL が `/#/guide/install` 形式になっている。  
Google は `#` 以降をクロールしないため、ガイドページが実質的にインデックスされない。

### 変更内容
- `App.tsx` の `HashRouter` を `BrowserRouter` に変更する（1行変更）
- `entry-server.tsx` は `StaticRouter` を既に使用しているため変更不要
- `scripts/prerender.mjs` は全ルートの HTML を既に生成しているため変更不要
- GitHub Pages では `/guide/install/index.html` が静的ファイルとして配信されるため 404 は発生しない

### 対象ファイル
- `src/App.tsx`

---

## 2. ページ別メタタグ（react-helmet-async + SSR注入）

### ライブラリ
- `react-helmet-async`（本体）
- SSR時の helmet state 抽出に対応

### HelmetProvider 追加箇所
- `src/main.tsx`（クライアント）
- `src/entry-server.tsx`（SSR）

### プレースホルダー追加（index.html）
```html
<title><!--helmet-title--></title>
<!--helmet-meta-->
```

ビルド時に `prerender.mjs` が各ページの helmet 値でプレースホルダーを置換する。  
これにより、静的 HTML に正確な title/meta が埋め込まれ、SNS クローラーにも対応する。

### ページ別設定

| ページ | title | description |
|--------|-------|-------------|
| `/` (LandingPage) | `Mac 音声入力アプリ — オフライン・高精度 \| Lumina Whisper` | `Lumina Whisper は Mac 専用の音声入力アプリ。完全ローカル処理でプライバシーを守りながら高精度な文字起こしを実現。Apple Silicon 最適化、インターネット不要で高速動作。` |
| `/guide/install` | `インストール \| Lumina Whisper ガイド` | `macOS 13 以降の Apple Silicon Mac への Lumina Whisper インストール手順。DMGダウンロードからマイク権限設定まで。` |
| `/guide/setup` | `初期設定 \| Lumina Whisper ガイド` | `Lumina Whisper の初回セットアップ手順。ホットキー確認・音声認識モデルのダウンロード方法を解説。` |
| `/guide/usage` | `基本的な使い方 \| Lumina Whisper ガイド` | `Option+Space を押すだけで音声入力を開始。テキスト入力フィールドへの自動挿入まで4ステップで解説。` |
| `/guide/settings` | `設定項目 \| Lumina Whisper ガイド` | `Lumina Whisper の設定項目一覧。モデル選択・認識言語・ホットキー・LLM後処理の使い方。` |
| `/guide/faq` | `よくある質問 \| Lumina Whisper ガイド` | `Lumina Whisper に関するよくある質問。対応 macOS・Intel Mac・プライバシー・ホットキーの問題について。` |
| `/guide/troubleshoot` | `トラブルシューティング \| Lumina Whisper ガイド` | `Lumina Whisper のトラブル対処法。マイク未認識・ホットキー無効・テキスト未挿入の解決手順。` |
| `/release` | `リリースノート \| Lumina Whisper` | `Lumina Whisper の更新履歴。新機能・バグ修正の詳細を版ごとに記載。` |

### LandingPage の追加 meta（OGP・hreflang）
```html
<link rel="canonical" href="https://k1e1n04.github.io/lumina-whisper-site/" />
<link rel="alternate" hreflang="ja" href="https://k1e1n04.github.io/lumina-whisper-site/" />
<link rel="alternate" hreflang="en" href="https://k1e1n04.github.io/lumina-whisper-site/" />
<meta property="og:image" content="https://k1e1n04.github.io/lumina-whisper-site/ogp.png" />
<meta name="twitter:image" content="https://k1e1n04.github.io/lumina-whisper-site/ogp.png" />
<meta name="twitter:card" content="summary_large_image" />
```

### 対象ファイル
- `src/main.tsx`（HelmetProvider 追加）
- `src/entry-server.tsx`（HelmetProvider + helmet state 返却）
- `index.html`（プレースホルダー追加・既存の title/meta を削除）
- `scripts/prerender.mjs`（helmet 値を各ページ HTML へ注入）
- `src/pages/LandingPage.tsx`（Helmet コンポーネント追加）
- `src/pages/ReleasePage.tsx`（Helmet コンポーネント追加）
- `src/pages/guide/InstallPage.tsx`（Helmet コンポーネント追加）
- `src/pages/guide/SetupPage.tsx`（Helmet コンポーネント追加）
- `src/pages/guide/UsagePage.tsx`（Helmet コンポーネント追加）
- `src/pages/guide/SettingsPage.tsx`（Helmet コンポーネント追加）
- `src/pages/guide/FaqPage.tsx`（Helmet コンポーネント追加）
- `src/pages/guide/TroubleshootPage.tsx`（Helmet コンポーネント追加）

---

## 3. OGP画像生成

### 手法
`scripts/generate-ogp.mjs` を新規作成し、ビルド前に実行する。  
`@resvg/resvg-js` を使って OGP 用 SVG を 1200×630px の PNG に変換し `public/ogp.png` として出力する。

### OGP画像デザイン
- サイズ: 1200×630px
- 背景色: `#FAFAFA`（サイトの bg 色に合わせる）
- ロゴ（favicon.svg を SVG として埋め込み）: 左上寄り、大きめに配置
- アプリ名: "Lumina Whisper"（フォントサイズ 72px、カラー `#1A1A1A`）
- タグライン: "声をテキストに、瞬時に。"（フォントサイズ 36px、カラー `#888888`）
- アクセントライン: `#863bff` の細いボーダー
- フォント: システムフォント（SVG内で指定）

### ビルドスクリプト変更
`package.json` の `build` スクリプトに `node scripts/generate-ogp.mjs &&` を先頭に追加：

```json
"build": "node scripts/generate-ogp.mjs && tsc -b && vite build && vite build --ssr src/entry-server.tsx --outDir dist-ssr && node scripts/prerender.mjs"
```

### 対象ファイル
- `scripts/generate-ogp.mjs`（新規作成）
- `package.json`（build スクリプト変更・`@resvg/resvg-js` devDependencies 追加）

---

## 4. JSON-LD 構造化データ

`LandingPage.tsx` に `<script type="application/ld+json">` を埋め込む。  
`SoftwareApplication` スキーマを使用し、アプリ情報を機械可読にする。

```json
{
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Lumina Whisper",
  "operatingSystem": "macOS 13.0+",
  "applicationCategory": "UtilitiesApplication",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "JPY"
  },
  "description": "Mac 専用の音声入力アプリ。完全ローカル処理でプライバシーを守りながら高精度な文字起こしを実現。Apple Silicon 最適化。",
  "url": "https://k1e1n04.github.io/lumina-whisper-site/",
  "downloadUrl": "https://github.com/k1e1n04/lumina-whisper-site/releases/latest/download/LuminaWhisper.dmg",
  "softwareVersion": "0.3.0",
  "author": {
    "@type": "Person",
    "name": "KenIshii"
  }
}
```

`Helmet` コンポーネント内に `<script>` タグとして追加する（LandingPage の Helmet 実装と同時に対応）。

### 対象ファイル
- `src/pages/LandingPage.tsx`（Helmet 追加時に同時実装）

---

## 5. sitemap.xml + robots.txt + hreflang

### sitemap.xml
`scripts/prerender.mjs` のプリレンダリング完了後に XML を生成し `dist/sitemap.xml` へ出力する。

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>https://k1e1n04.github.io/lumina-whisper-site/</loc><priority>1.0</priority></url>
  <url><loc>https://k1e1n04.github.io/lumina-whisper-site/release/</loc><priority>0.6</priority></url>
  <url><loc>https://k1e1n04.github.io/lumina-whisper-site/guide/install/</loc><priority>0.8</priority></url>
  <!-- 他のガイドページも同様 -->
</urlset>
```

### robots.txt
`public/robots.txt`（静的ファイル、ビルド時に `dist/` へコピーされる）：

```
User-agent: *
Allow: /
Sitemap: https://k1e1n04.github.io/lumina-whisper-site/sitemap.xml
```

### hreflang
サイトは言語切替を JS（react-i18next）で行うため、URL は変わらない。  
LandingPage の Helmet に `x-default` + `ja` + `en` の hreflang を追加する（同一URLを指す形式）。

### 対象ファイル
- `scripts/prerender.mjs`（sitemap.xml 生成を末尾に追加）
- `public/robots.txt`（新規作成）

---

## 実装順序

1. `react-helmet-async` インストール
2. `@resvg/resvg-js` インストール
3. `public/robots.txt` 作成
4. `scripts/generate-ogp.mjs` 作成
5. `package.json` build スクリプト更新
6. `index.html` プレースホルダー化
7. `src/App.tsx` BrowserRouter 切り替え
8. `src/main.tsx` HelmetProvider 追加
9. `src/entry-server.tsx` HelmetProvider + helmet state 返却
10. `scripts/prerender.mjs` helmet 注入 + sitemap.xml 生成
11. 各ページに `<Helmet>` 追加（LandingPage に JSON-LD も同時追加）
12. ビルド検証

---

## 非対象（今回のスコープ外）

- Core Web Vitals の最適化（画像遅延読み込み等）
- 英語版 URL の分離（`/en/` サブパス）
- Google Search Console 登録・インデックスリクエスト（手動作業）
