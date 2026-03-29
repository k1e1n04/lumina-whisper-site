import { useTranslation } from 'react-i18next'

const FAQS = [
  {
    q: 'macOS 13 (Ventura) で使えますか？',
    a: 'いいえ。LuminaWhisper は macOS 14 (Sonoma) 以降の Apple Silicon Mac が必要です。',
  },
  {
    q: 'Intel Mac には対応していますか？',
    a: '現在は Apple Silicon (M1 以降) 専用です。Intel Mac への対応は予定していません。',
  },
  {
    q: '音声データはどこに送られますか？',
    a: '音声データはデバイス外に送信されません。全ての処理は Mac 上でローカルに行われます。',
  },
  {
    q: 'ホットキーが反応しません',
    a: '「システム設定」→「プライバシーとセキュリティ」→「アクセシビリティ」で LuminaWhisper を許可しているか確認してください。',
  },
  {
    q: '認識精度を上げるには？',
    a: 'できるだけ静かな環境で、マイクに近い位置で話すと精度が向上します。LLM 後処理をオンにすることも効果的です。',
  },
]

export default function FaqPage() {
  const { t } = useTranslation()
  return (
    <article data-testid="guide-faq" className="max-w-none prose">
      <h1 className="mb-6 text-3xl font-bold text-primary">{t('guide.faq.title')}</h1>

      <div className="space-y-4">
        {FAQS.map(({ q, a }) => (
          <details key={q} className="group rounded-lg border border-gray-200">
            <summary className="flex cursor-pointer list-none items-center justify-between px-4 py-3 font-semibold text-gray-800 hover:text-primary">
              {q}
              <span className="text-gray-400 transition-transform group-open:rotate-180">▼</span>
            </summary>
            <p className="px-4 pb-4 text-sm text-gray-600">{a}</p>
          </details>
        ))}
      </div>
    </article>
  )
}
