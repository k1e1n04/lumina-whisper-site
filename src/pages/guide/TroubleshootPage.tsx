import { useTranslation } from 'react-i18next'

export default function TroubleshootPage() {
  const { t } = useTranslation()

  const issues = [
    {
      titleKey: 'guide.troubleshoot.issue1Title',
      stepKeys: [
        'guide.troubleshoot.issue1Step1',
        'guide.troubleshoot.issue1Step2',
        'guide.troubleshoot.issue1Step3',
      ],
    },
    {
      titleKey: 'guide.troubleshoot.issue2Title',
      stepKeys: [
        'guide.troubleshoot.issue2Step1',
        'guide.troubleshoot.issue2Step2',
        'guide.troubleshoot.issue2Step3',
      ],
    },
    {
      titleKey: 'guide.troubleshoot.issue3Title',
      stepKeys: [
        'guide.troubleshoot.issue3Step1',
        'guide.troubleshoot.issue3Step2',
        'guide.troubleshoot.issue3Step3',
      ],
    },
    {
      titleKey: 'guide.troubleshoot.issue4Title',
      stepKeys: [
        'guide.troubleshoot.issue4Step1',
        'guide.troubleshoot.issue4Step2',
        'guide.troubleshoot.issue4Step3',
      ],
    },
  ]

  return (
    <article data-testid="guide-troubleshoot" className="max-w-none prose">
      <h1 className="mb-6 text-3xl font-bold text-accent">{t('guide.troubleshoot.title')}</h1>

      <div className="space-y-6">
        {issues.map(({ titleKey, stepKeys }) => (
          <div key={titleKey} className="rounded-lg border border-border p-5">
            <h2 className="mb-3 text-lg font-semibold text-text">{t(titleKey)}</h2>
            <ol className="list-inside list-decimal space-y-1.5 text-sm text-text-muted">
              {stepKeys.map((stepKey) => (
                <li key={stepKey}>{t(stepKey)}</li>
              ))}
            </ol>
          </div>
        ))}
      </div>

      <div className="mt-8 rounded-lg border border-border bg-bg p-4">
        <p className="text-sm text-text-muted">{t('guide.troubleshoot.contactDesc')}</p>
      </div>
    </article>
  )
}
