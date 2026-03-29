# LuminaWhisper サイト 設計仕様

## 概要

LuminaWhisper の公式 LP とユーザーガイドを GitHub Pages で公開するための React SPA。
別リポジトリ `lumina-whisper-site` として `/Users/ishiiken/Develop/` 配下に作成する。

---

## スコープ

### 含むもの

- LP（ヒーロー・特徴・使い方・ダウンロードCTA）
- ユーザーガイド（全6ページ、左サイドバーナビ）
- 日本語メイン・英語切替（react-i18next）
- GitHub Pages へのデプロイ設定

### 含まないもの

- ブログ・更新履歴
- コメント・フォーム機能
- バージョン管理（ドキュメントのバージョニング）

---

## サイト構成

**2ページ構成**（LP + ガイド）

```
/                        ← LP
/#/guide                 ← /guide/install へリダイレクト
/#/guide/install         ← インストール
/#/guide/setup           ← 初期設定
/#/guide/usage           ← 基本的な使い方
/#/guide/settings        ← 設定項目
/#/guide/faq             ← よくある質問
/#/guide/troubleshoot    ← トラブルシューティング
```

---

## デザイン

- **テーマ**: ライト（白ベース）
- **カラー**: プライマリ `#2d3561`（アプリアイコンの紺）、アクセント `#4a6cf7`
- **フォント**: システムフォント（`-apple-system`, `BlinkMacSystemFont`）

### LP セクション順

1. **ナビバー** — ロゴ・ガイドリンク・言語切替（JA/EN）・ダウンロードボタン
2. **ヒーロー** — キャッチコピー・サブテキスト・ダウンロードCTA・要件バッジ
3. **特徴** — 4機能カード（ホットキー・ローカル処理・Apple Silicon・LLM後処理）
4. **使い方** — 4ステップフロー（Option+Space → 話す → Option+Space → テキスト挿入）
5. **ダウンロードCTA** — .dmg ダウンロードボタン・要件
6. **フッター** — コピーライト・GitHubリンク・ガイドリンク

### ガイド レイアウト

- 左サイドバー（固定）+ メインコンテンツ
- サイドバー目次:
  - **はじめに**: インストール / 初期設定
  - **使い方**: 基本的な使い方 / 設定項目
  - **サポート**: よくある質問 / トラブルシューティング
- 現在ページをハイライト
- ページ末尾に前後ナビゲーション

---

## 技術スタック

| 項目 | 採用技術 |
|------|---------|
| フレームワーク | React 18 + TypeScript |
| ビルドツール | Vite |
| ルーティング | React Router v6（`HashRouter`） |
| i18n | react-i18next |
| スタイリング | Tailwind CSS v4 |
| デプロイ | `gh-pages` パッケージ |
| CI | GitHub Actions（`main` push で自動デプロイ） |

> **HashRouter を使う理由**: GitHub Pages はサーバーサイドルーティングを持たないため、`/guide/install` のような URL を直接開くと 404 になる。HashRouter を使うことで `/#/guide/install` 形式になり、この問題を回避できる。

---

## ファイル構成

```
lumina-whisper-site/
├── public/
│   └── icon.png              ← アプリアイコン（lumina-whisperから流用）
├── src/
│   ├── main.tsx
│   ├── App.tsx               ← HashRouter + ルート定義
│   ├── i18n/
│   │   ├── index.ts          ← i18next 設定
│   │   ├── ja.json           ← 日本語テキスト
│   │   └── en.json           ← 英語テキスト
│   ├── components/
│   │   ├── Navbar.tsx
│   │   └── Footer.tsx
│   ├── pages/
│   │   ├── LandingPage.tsx
│   │   └── guide/
│   │       ├── GuideLayout.tsx   ← サイドバー + Outlet
│   │       ├── InstallPage.tsx
│   │       ├── SetupPage.tsx
│   │       ├── UsagePage.tsx
│   │       ├── SettingsPage.tsx
│   │       ├── FaqPage.tsx
│   │       └── TroubleshootPage.tsx
│   └── index.css
├── index.html
├── vite.config.ts
├── tailwind.config.ts
└── package.json
```

---

## デプロイ

```json
// package.json
{
  "homepage": "https://<username>.github.io/lumina-whisper-site",
  "scripts": {
    "predeploy": "npm run build",
    "deploy": "gh-pages -d dist"
  }
}
```

```yaml
# .github/workflows/deploy.yml
name: Deploy
on:
  push:
    branches: [main]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: 20 }
      - run: npm ci
      - run: npm run build
      - uses: peaceiris/actions-gh-pages@v4
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
```

---

## i18n 方針

- デフォルト言語: 日本語（`ja`）
- 言語切替: ナビバーの `JA / EN` トグル
- 翻訳キー: フラットな JSON（ネストは1階層まで）
- ガイドの本文は Markdown ではなく JSX で直接記述（翻訳量が少ないため）

---

## 成功基準

1. `https://<username>.github.io/lumina-whisper-site` でLPが表示される
2. ダウンロードボタンが .dmg ファイルへリンクする（GitHub Releases を想定）
3. ユーザーガイド全6ページが表示され、サイドバーナビで遷移できる
4. JA/EN 言語切替が動作する
5. `npm run deploy` でデプロイが完了する
