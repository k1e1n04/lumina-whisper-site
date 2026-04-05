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

## Accuracy Benchmark

ランディングページの精度比較セクション（AccuracySection）は `public/benchmark-results.json` を参照します。
このファイルはプレースホルダーが含まれており、実際の計測結果で上書きする必要があります。

### 前提条件

1. Python 3.10+
2. WhisperKit CLI（ビルド済み）
3. [JSUT Basic5000](https://sites.google.com/site/shinnosuketakamichi/publication/jsut) をダウンロード・展開

### 手順

```bash
# 1. Python 依存ライブラリをインストール
pip3 install -r scripts/benchmark/requirements.txt

# 2. Lumina Whisper で JSUT 50 サンプルを自動変換
python3 scripts/benchmark/transcribe_lumina.py \
  ~/datasets/jsut_ver1.1 \
  /tmp/WhisperKit/.build/release/whisperkit-cli
# → scripts/benchmark/lumina_results.csv が生成される

# 3. 同じ 50 サンプルを Mac の「キーボード音声入力」で手動変換し、
#    scripts/benchmark/apple_results.csv の hypothesis 列に入力して保存

# 4. CER を計算して public/benchmark-results.json を更新
python3 scripts/benchmark/calculate_wer.py
```

詳細は [`scripts/benchmark/setup.md`](scripts/benchmark/setup.md) を参照してください。

## Notes

- `public/icon.png` はアプリアイコンとして使用します。
- ダウンロードリンクや GitHub URL は `src/components/Navbar.tsx` / `src/components/Footer.tsx` を更新してください。
