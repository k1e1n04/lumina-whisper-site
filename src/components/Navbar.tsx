import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

const DOWNLOAD_URL = 'https://github.com/ishiiken/lumina-whisper/releases/latest/download/LuminaWhisper.dmg'

export default function Navbar() {
  const { t, i18n } = useTranslation()

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-white/95 backdrop-blur">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-6">
        <Link to="/" className="flex items-center gap-2.5 no-underline">
          <img src="/lumina-whisper-site/icon.png" alt="LuminaWhisper" className="h-6 w-6 rounded" />
          <span className="text-sm tracking-wide text-text">LuminaWhisper</span>
        </Link>

        <div className="flex items-center gap-7">
          <Link
            to="/guide/install"
            className="text-sm tracking-[0.05em] text-text-dim no-underline transition-colors hover:text-text-muted uppercase"
          >
            {t('nav.guide')}
          </Link>

          <div className="flex items-center gap-0 text-xs tracking-[0.05em]">
            <button
              onClick={() => i18n.changeLanguage('ja')}
              className={`px-2 py-1 transition-colors ${
                i18n.language === 'ja' ? 'text-accent' : 'text-text-dim hover:text-text-muted'
              }`}
            >
              JA
            </button>
            <span className="text-border">/</span>
            <button
              onClick={() => i18n.changeLanguage('en')}
              className={`px-2 py-1 transition-colors ${
                i18n.language === 'en' ? 'text-accent' : 'text-text-dim hover:text-text-muted'
              }`}
            >
              EN
            </button>
          </div>

          <a
            href={DOWNLOAD_URL}
            className="border border-border px-4 py-2 text-xs tracking-[0.05em] text-text-muted no-underline transition-all duration-150 hover:border-accent hover:text-accent uppercase"
          >
            {t('nav.download')}
          </a>
        </div>
      </div>
    </nav>
  )
}
