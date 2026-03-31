import { Trans, useTranslation } from 'react-i18next'
import { Helmet } from 'react-helmet-async'

export default function InstallPage() {
  const { t } = useTranslation()
  return (
    <article data-testid="guide-install" className="max-w-none prose">
      <Helmet>
        <title>インストール | Lumina Whisper ガイド</title>
        <meta
          name="description"
          content="macOS 13 以降の Apple Silicon Mac への Lumina Whisper インストール手順。DMGダウンロードからマイク権限設定まで。"
        />
      </Helmet>
      <h1 className="mb-6 text-3xl font-bold text-accent">{t('guide.install.title')}</h1>

      <h2 className="mt-8 mb-3 text-xl font-semibold text-text">{t('guide.install.section1')}</h2>
      <p className="mb-4 text-text-muted">
        <Trans
          i18nKey="guide.install.downloadDesc"
          components={{
            link: (
              <a
                href="https://github.com/k1e1n04/lumina-whisper-site/releases/latest"
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent hover:underline"
              />
            ),
            code: <code className="rounded bg-surface px-1" />,
          }}
        />
      </p>

      <h2 className="mt-8 mb-3 text-xl font-semibold text-text">{t('guide.install.section2')}</h2>
      <ol className="list-inside list-decimal space-y-2 text-text-muted">
        <li>
          {t('guide.install.installStep1Pre')}{' '}
          <code className="rounded bg-surface px-1">.dmg</code>{' '}
          {t('guide.install.installStep1Post')}
        </li>
        <li>{t('guide.install.installStep2')}</li>
        <li>{t('guide.install.installStep3')}</li>
      </ol>

      <h2 className="mt-8 mb-3 text-xl font-semibold text-text">{t('guide.install.section3')}</h2>
      <p className="mb-2 text-text-muted">{t('guide.install.micDesc1')}</p>
      <p className="text-text-muted">{t('guide.install.micDesc2')}</p>

      <div className="mt-6 rounded-lg border border-border bg-surface p-4">
        <p className="text-sm text-accent">
          <strong>{t('guide.install.requirementsLabel')}</strong> {t('guide.install.requirementsValue')}
        </p>
      </div>
    </article>
  )
}
