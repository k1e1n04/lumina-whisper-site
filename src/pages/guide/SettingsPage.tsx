import { useTranslation } from 'react-i18next'

const SETTINGS = [
  {
    name: 'ホットキー',
    default: 'Option+Space',
    desc: '音声入力の開始・停止に使うキーボードショートカット。他のアプリと競合する場合は変更してください。',
  },
  {
    name: '認識言語',
    default: '日本語',
    desc: '音声認識に使用する言語。日本語・英語・中国語などから選択できます。',
  },
  {
    name: 'LLM 後処理',
    default: 'オン',
    desc: '音声認識後にローカル LLM で誤字補正・整形を行う機能。オフにすると認識結果をそのまま挿入します。',
  },
  {
    name: 'ログイン時に起動',
    default: 'オフ',
    desc: 'Mac ログイン時に LuminaWhisper を自動起動します。',
  },
]

export default function SettingsPage() {
  const { t } = useTranslation()
  return (
    <article data-testid="guide-settings" className="max-w-none prose">
      <h1 className="mb-6 text-3xl font-bold text-primary">{t('guide.settings.title')}</h1>
      <p className="mb-6 text-gray-600">メニューバーのアイコンをクリック → 「設定...」から設定画面を開けます。</p>

      <div className="space-y-4">
        {SETTINGS.map(({ name, default: def, desc }) => (
          <div key={name} className="rounded-lg border border-gray-200 p-4">
            <div className="mb-1 flex items-baseline justify-between">
              <h3 className="font-semibold text-gray-800">{name}</h3>
              <span className="text-xs text-gray-400">デフォルト: {def}</span>
            </div>
            <p className="text-sm text-gray-600">{desc}</p>
          </div>
        ))}
      </div>
    </article>
  )
}
