# LuminaWhisper Site

LuminaWhisper の公式ランディングページとユーザーガイドを提供するサイトです。  
React + Vite + TypeScript で構築し、GitHub Pages へデプロイします。

## Tech Stack

- React
- TypeScript
- Vite
- React Router (`HashRouter`)
- react-i18next (JA / EN)
- Tailwind CSS v4
- Vitest + Testing Library

## Routes

- `/#/` : Landing Page
- `/#/guide/install`
- `/#/guide/setup`
- `/#/guide/usage`
- `/#/guide/settings`
- `/#/guide/faq`
- `/#/guide/troubleshoot`

## Setup

```bash
npm install
```

## Development

```bash
npm run dev
```

Default URL:

- [http://localhost:5173/lumina-whisper-site/](http://localhost:5173/lumina-whisper-site/)

## Test

```bash
npm run test:run
```

## Build

```bash
npm run build
```

## Preview

```bash
npm run preview
```

## Deploy

GitHub Actions (`.github/workflows/deploy.yml`) で `main` push 時に自動デプロイします。

手動デプロイする場合:

```bash
npm run deploy
```

## Notes

- `public/icon.png` はアプリアイコンとして使用します。
- ダウンロードリンクや GitHub URL は `src/components/Navbar.tsx` / `src/components/Footer.tsx` を更新してください。
