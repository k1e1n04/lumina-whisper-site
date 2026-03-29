import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

const GITHUB_URL = 'https://github.com/ishiiken/lumina-whisper'

export default function Footer() {
  const { t } = useTranslation()

  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 py-8 sm:flex-row">
        <span className="text-xs tracking-[0.05em] text-text-dim">{t('footer.copyright')}</span>
        <div className="flex gap-8">
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs tracking-[0.05em] text-text-dim no-underline transition-colors hover:text-text-muted uppercase"
          >
            {t('footer.github')}
          </a>
          <Link
            to="/guide/install"
            className="text-xs tracking-[0.05em] text-text-dim no-underline transition-colors hover:text-text-muted uppercase"
          >
            {t('footer.guide')}
          </Link>
        </div>
      </div>
    </footer>
  )
}
