import { useTranslation } from 'react-i18next'

const SETTING_KEYS = ['model', 'language', 'hotkey', 'llm', 'clipboardFallback'] as const

export default function SettingsPage() {
  const { t } = useTranslation()
  return (
    <article data-testid="guide-settings" className="max-w-none prose">
      <h1 className="mb-6 text-3xl font-bold text-accent">{t('guide.settings.title')}</h1>
      <p className="mb-6 text-text-muted">{t('guide.settings.openDesc')}</p>

      <div className="space-y-4">
        {SETTING_KEYS.map((key) => (
          <div key={key} className="rounded-lg border border-border p-4">
            <div className="mb-1 flex items-baseline justify-between">
              <h3 className="font-semibold text-text">{t(`guide.settings.${key}.name`)}</h3>
              <span className="text-xs text-text-dim">
                {t('guide.settings.defaultLabel')}: {t(`guide.settings.${key}.default`)}
              </span>
            </div>
            <p className="text-sm text-text-muted">{t(`guide.settings.${key}.desc`)}</p>
          </div>
        ))}
      </div>
    </article>
  )
}
