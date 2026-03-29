import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

const GITHUB_URL = 'https://github.com/ishiiken/lumina-whisper'

export default function Footer() {
  const { t } = useTranslation()

  return (
    <footer className="border-t border-gray-200 bg-gray-50 py-8">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 text-sm text-gray-500 sm:flex-row">
        <span>{t('footer.copyright')}</span>
        <div className="flex gap-6">
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="no-underline transition-colors hover:text-primary"
          >
            {t('footer.github')}
          </a>
          <Link to="/guide/install" className="no-underline transition-colors hover:text-primary">
            {t('footer.guide')}
          </Link>
        </div>
      </div>
    </footer>
  )
}
