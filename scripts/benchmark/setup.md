# ベンチマーク実行手順

## 前提条件

1. **Python 3.10+** が使えること
2. **WhisperKit CLI** がビルド済みであること

   ```bash
   git clone https://github.com/argmaxinc/WhisperKit /tmp/WhisperKit
   cd /tmp/WhisperKit
   swift build -c release --product whisperkit-cli
   # バイナリ: /tmp/WhisperKit/.build/release/whisperkit-cli
   ```

3. **JSUT Basic5000** がダウンロード済みであること

   ```bash
   # https://sites.google.com/site/shinnosuketakamichi/publication/jsut からダウンロード
   # 解凍後のパス例: ~/datasets/jsut_ver1.1/basic5000/
   ```

4. Python 依存ライブラリのインストール

   ```bash
   cd scripts/benchmark
   pip install -r requirements.txt
   ```

## 実行手順

### 1. Lumina Whisper で自動変換

```bash
python scripts/benchmark/transcribe_lumina.py \
  ~/datasets/jsut_ver1.1 \
  /tmp/WhisperKit/.build/release/whisperkit-cli
# → scripts/benchmark/lumina_results.csv を生成
```

### 2. Apple キーボード音声入力で手動変換

1. `scripts/benchmark/apple_results.csv` を開く
2. `lumina_results.csv` の id と reference を参考に、同じ音声を Mac キーボード音声入力で変換
3. 変換結果を `hypothesis` 列に入力して保存

### 3. CER を計算して JSON を生成

```bash
python scripts/benchmark/calculate_wer.py
# → public/benchmark-results.json を生成
```

### 4. サイトをビルドして確認

```bash
npm run dev
# http://localhost:5173 で AccuracySection を確認
```
