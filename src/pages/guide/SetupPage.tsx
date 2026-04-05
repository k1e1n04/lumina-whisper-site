import { useTranslation } from 'react-i18next'
import PageSeo from '../../components/PageSeo'

export default function SetupPage() {
  const { t } = useTranslation()
  return (
    <article data-testid="guide-setup" className="max-w-none prose">
      <PageSeo page="guideSetup" />
      <h1 className="mb-6 text-3xl font-bold text-accent">{t('guide.setup.title')}</h1>

      <h2 className="mt-8 mb-3 text-xl font-semibold text-text">{t('guide.setup.menubarTitle')}</h2>
      <p className="mb-4 text-text-muted">{t('guide.setup.menubarDesc')}</p>

      <h2 className="mt-8 mb-3 text-xl font-semibold text-text">{t('guide.setup.hotkeyTitle')}</h2>
      <p className="mb-4 text-text-muted">
        {t('guide.setup.hotkeyDescPre')}{' '}
        <kbd className="rounded bg-surface-2 px-2 py-0.5 font-mono text-sm">Fn</kbd>
        {t('guide.setup.hotkeyDescPost')}
      </p>

      <h2 className="mt-8 mb-3 text-xl font-semibold text-text">{t('guide.setup.modelTitle')}</h2>
      <p className="text-text-muted">{t('guide.setup.modelDesc')}</p>
    </article>
  )
}
