# ランディングページ充実化 — デザイン仕様

## 概要

Lumina Whisper のランディングページをよりワクワクするものにし、インストールへの動機を高める。情報量の増加・デモセクションの改修・新セクション追加により、競合（Aqua Voice 等）に対抗できるページを目指す。

**方針：** ソーシャルプルーフなし・「無料」訴求なしで、数字・プライバシーバッジ・ユースケースで差別化する。

---

## ページ構成（改修後）

| # | セクション | 変更種別 | 概要 |
|---|---|---|---|
| 1 | Hero | 改修 | バッジ3つを追加、「無料」文言を削除 |
| 2 | Demo Section | 改修 | 左右レイアウト化＋フレーズ刷新 |
| 3 | Stats Bar | 新規追加 | 4つの数値カード |
| 4 | Use Cases | 新規追加 | タブ切り替え3シナリオ |
| 5 | Pain → Solution | 現状維持 | — |
| 6 | Features | 現状維持 | — |
| 7 | How to use | 現状維持 | — |
| 8 | CTA | 改修 | 「無料」文言を削除 |

---

## セクション別仕様

### 1. Hero セクション（改修）

**変更点：**
- キャッチコピー・サブテキストは現状維持
- CTAボタン・要件テキストから「無料」を削除
- キャッチコピーとCTAの間に**バッジ**を3つ追加

**バッジ（ pill 形式）：**
```
🔒 外部送信ゼロ　⚡ Apple Neural Engine　🌍 13言語対応
```
スタイル：`background:#EEF2FF; border:1px solid #C7CDEE; border-radius:20px; color:#2B2D5F`

**削除：**
- `hero.requirements` の「無料」表現（i18n も更新）
- `cta.requirements` の「無料」表現（i18n も更新）
- `cta.button` の「.dmg をダウンロード」→「ダウンロード」に変更

---

### 2. Demo Section（改修）― `AppDemoSection.tsx`

**レイアウト：**
- 現在：アニメーションのみ、説明なし
- 改修後：左に説明テキスト ＋ 右に既存アニメーション（左右フレックス）

**左側（説明テキスト）：**
```
[ラベル] How it works
[見出し] Claude Code にも、声で指示できる
[本文]   どのアプリでも、カーソルがある場所に直接テキストが挿入されます。
         クリップボードを経由せず、キー一発で完結。
[ステップ]
  1. 入力したい場所にカーソルを置く
  2. Fn を押して話す
  3. 再度 Fn → テキストが挿入される
```

**右側（既存アニメーション）：**
- Mac ウィンドウフレーム（既存 `AppDemoSection` の UI をそのまま使用）
- `PHRASES` を以下に更新（「Claude Code に声で指示している」内容に）：
  ```ts
  const PHRASES = [
    'ログイン機能のバグを修正して',
    'このコンポーネントにテストを書いて',
    'APIレスポンスの型定義を追加して',
  ]
  ```
- 録音ピル（アイコン ＋ 波形バー）は現状のまま維持
- 「録音中」テキストは表示しない（現状のまま）

**i18n：**
- 説明テキスト・ステップは i18n キーを追加（`demo.howItWorks.*`）

---

### 3. Stats Bar（新規追加）

デモセクションの直後に配置。`#F0F2F8`（surface色）背景のグリッドレイアウト。

**セクションラベル：** `Why Lumina Whisper`

**4カード構成（左→右）：**

| 大見出し | 小見出し | サブ |
|---|---|---|
| 13 | 言語対応 | 日英中韓仏独他 |
| 外部送信ゼロ | 完全ローカル処理 | インターネット不要 |
| Neural Engine | フル活用 | Apple Silicon 最適化 |
| 4 | モデル選択可能 | tiny / base / small / medium |

**スタイル：**
- グリッド：`grid-cols-4`、gap なし（`gap-px bg-border`）
- 大見出し：serif フォント、`text-4xl`、`text-accent`
- 境界線グリッドで区切り（既存の How to use セクションと同じ手法）

**i18n：** `stats.*` キーを各言語に追加

---

### 4. Use Cases セクション（新規追加）

Stats Bar の直後（Pain→Solution の前）に配置。タブ切り替えで3シナリオを表示。

**セクションラベル：** `Use Cases`
**見出し（i18n）：** `どんな場面でも、声がそのままテキストになる`

**タブ3つ：**

#### タブ 1: コーディング
- 見出し：「コードのコメントやコミットメッセージを声で」
- 本文：エディタにフォーカスしたまま Fn を押して説明を話すだけ。タイピングより速く、思考の流れを止めない。
- アプリバッジ：VS Code・Xcode・Terminal
- 右側デモ：コードエディタ風のモックでコメントが音声入力される様子

#### タブ 2: 会議・メモ
- 見出し：「会議中のメモをリアルタイムで書き起こす」
- 本文：ノートアプリを開きながら議事録を音声で入力。完全ローカルなので機密情報も安心。
- アプリバッジ：Notion・Obsidian・Apple メモ
- 右側デモ：Notion 風のノートモック

#### タブ 3: メール・Slack
- 見出し：「返信文を声で下書き、LLM が整えてくれる」
- 本文：話し言葉で入力してもLLM後処理がフィラーを除去。「えっと」「あの」が消えた自然な文章に。
- アプリバッジ：Slack・メール・チャット
- 右側デモ：Slack 風モック

**実装：** React state（`useState`）でタブ管理。アニメーションは `opacity` transition。

**i18n：** `useCases.*` キーを各言語に追加

---

### 8. CTA セクション（改修）

- `cta.button`：「.dmg をダウンロード」→「ダウンロード」
- `cta.requirements`：「macOS 14.0 以降 · Apple Silicon」（「無料」削除）
- i18n の全言語ファイルを更新

---

## i18n 対応

以下のキーを全言語（ja/en/zh/ko/fr/de）に追加：

```
demo.label        = "How it works"
demo.title        = "Claude Code にも、声で指示できる"
demo.desc         = "どのアプリでも..."
demo.step1        = "入力したい場所にカーソルを置く"
demo.step2        = "Fn を押して話す"
demo.step3        = "再度 Fn → テキストが挿入される"

stats.label       = "Why Lumina Whisper"
stats.languages   = "言語対応"
stats.languagesSub = "日英中韓仏独他"
stats.privacy     = "外部送信ゼロ"
stats.privacySub  = "完全ローカル処理"
stats.privacySub2 = "インターネット不要"
stats.engine      = "フル活用"
stats.engineSub   = "Apple Silicon 最適化"
stats.models      = "モデル選択可能"
stats.modelsSub   = "tiny / base / small / medium"

useCases.label    = "Use Cases"
useCases.title    = "どんな場面でも、声がそのままテキストになる"
useCases.tab1     = "コーディング"
useCases.tab2     = "会議・メモ"
useCases.tab3     = "メール・Slack"
... (各タブの見出し・本文・バッジ)
```

---

## i18n 実装メモ

- ja.json は上記キーを日本語で追加
- en.json は英語訳を追加（例：`demo.title` = "Voice input, right inside Claude Code"）
- zh/ko/fr/de は既存の翻訳パターンに合わせて追加。翻訳が難しければ英語をフォールバックとして使用
- `PHRASES` 配列（AppDemoSection.tsx）は i18n 化せず、日本語のまま固定でよい（アニメーション用途のため）

---

## 制約・方針

- 「無料」という訴求は全セクションで使用しない（将来の有料化を考慮）
- ソーシャルプルーフ（レビュー・企業ロゴ）は追加しない（データなし）
- 既存のデザインシステム（Tailwind テーマ、serif フォント、accent カラー）を踏襲
- 既存テストが通ることを確認する
