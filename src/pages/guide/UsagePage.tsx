import { useTranslation } from 'react-i18next'
import { Helmet } from 'react-helmet-async'

export default function UsagePage() {
  const { t } = useTranslation()

  const steps = [
    { step: '1', labelKey: 'guide.usage.step1Label', descKey: 'guide.usage.step1Desc' },
    { step: '2', labelKey: 'guide.usage.step2Label', descKey: 'guide.usage.step2Desc' },
    { step: '3', labelKey: 'guide.usage.step3Label', descKey: 'guide.usage.step3Desc' },
    { step: '4', labelKey: 'guide.usage.step4Label', descKey: 'guide.usage.step4Desc' },
  ]

  return (
    <article data-testid="guide-usage" className="max-w-none prose">
      <Helmet>
        <title>基本的な使い方 | Lumina Whisper ガイド</title>
        <meta
          name="description"
          content="Fn キーを押すだけで音声入力を開始。テキスト入力フィールドへの自動挿入まで4ステップで解説。"
        />
      </Helmet>
      <h1 className="mb-6 text-3xl font-bold text-accent">{t('guide.usage.title')}</h1>

      <h2 className="mt-8 mb-3 text-xl font-semibold text-text">{t('guide.usage.stepsTitle')}</h2>
      <ol className="mb-6 list-none space-y-4">
        {steps.map(({ step, labelKey, descKey }) => (
          <li key={step} className="flex gap-4">
            <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-accent text-sm font-bold text-white">
              {step}
            </span>
            <div>
              <p className="mb-1 font-semibold text-text">{t(labelKey)}</p>
              <p className="text-sm text-text-muted">{t(descKey)}</p>
            </div>
          </li>
        ))}
      </ol>

      <div className="rounded-lg border border-border bg-surface p-4">
        <p className="text-sm text-text-muted">
          <strong>{t('guide.usage.tipLabel')}</strong> {t('guide.usage.tipDesc')}
        </p>
      </div>
    </article>
  )
}
