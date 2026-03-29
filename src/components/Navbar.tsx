import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

const DOWNLOAD_URL = 'https://github.com/ishiiken/lumina-whisper/releases/latest/download/LuminaWhisper.dmg'

export default function Navbar() {
  const { t, i18n } = useTranslation()

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-gray-100 bg-white/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <Link to="/" className="flex items-center gap-2 text-lg font-bold text-primary no-underline">
          <img src="/lumina-whisper-site/icon.png" alt="LuminaWhisper" className="h-7 w-7 rounded-lg" />
          LuminaWhisper
        </Link>

        <div className="flex items-center gap-6">
          <Link
            to="/guide/install"
            className="text-sm font-medium text-gray-600 no-underline transition-colors hover:text-primary"
          >
            {t('nav.guide')}
          </Link>

          <div className="flex items-center gap-1 text-sm">
            <button
              onClick={() => i18n.changeLanguage('ja')}
              className={`rounded px-2 py-1 transition-colors ${
                i18n.language === 'ja' ? 'bg-primary text-white' : 'text-gray-500 hover:text-primary'
              }`}
            >
              JA
            </button>
            <button
              onClick={() => i18n.changeLanguage('en')}
              className={`rounded px-2 py-1 transition-colors ${
                i18n.language === 'en' ? 'bg-primary text-white' : 'text-gray-500 hover:text-primary'
              }`}
            >
              EN
            </button>
          </div>

          <a
            href={DOWNLOAD_URL}
            className="rounded-lg bg-accent px-4 py-2 text-sm font-medium text-white no-underline transition-colors hover:bg-blue-600"
          >
            {t('nav.download')}
          </a>
        </div>
      </div>
    </nav>
  )
}
