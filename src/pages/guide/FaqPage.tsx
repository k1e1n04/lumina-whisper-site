import { useTranslation } from 'react-i18next'
import { Helmet } from 'react-helmet-async'

const FAQ_INDICES = [1, 2, 3, 4, 5] as const

export default function FaqPage() {
  const { t } = useTranslation()
  return (
    <article data-testid="guide-faq" className="max-w-none prose">
      <Helmet>
        <title>よくある質問 | Lumina Whisper ガイド</title>
        <meta
          name="description"
          content="Lumina Whisper に関するよくある質問。対応 macOS・Intel Mac・プライバシー・ホットキーの問題について。"
        />
      </Helmet>
      <h1 className="mb-6 text-3xl font-bold text-accent">{t('guide.faq.title')}</h1>

      <div className="space-y-4">
        {FAQ_INDICES.map((i) => (
          <details key={i} className="group rounded-lg border border-border">
            <summary className="flex cursor-pointer list-none items-center justify-between px-4 py-3 font-semibold text-text hover:text-accent">
              {t(`guide.faq.q${i}`)}
              <span className="text-text-dim transition-transform group-open:rotate-180">▼</span>
            </summary>
            <p className="px-4 pb-4 text-sm text-text-muted">{t(`guide.faq.a${i}`)}</p>
          </details>
        ))}
      </div>
    </article>
  )
}
