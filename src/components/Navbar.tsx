import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

const DOWNLOAD_URL = 'https://github.com/ishiiken/lumina-whisper/releases/latest/download/LuminaWhisper.dmg'

export default function Navbar() {
  const { t, i18n } = useTranslation()

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-[#272218] bg-[#0c0b09]/95 backdrop-blur">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-6">
        <Link to="/" className="flex items-center gap-2.5 no-underline">
          <img src="/lumina-whisper-site/icon.png" alt="LuminaWhisper" className="h-6 w-6 rounded" />
          <span className="text-sm tracking-wide text-[#e8ddd0]">LuminaWhisper</span>
        </Link>

        <div className="flex items-center gap-7">
          <Link
            to="/guide/install"
            className="text-[11px] tracking-[0.2em] text-[#3a312a] no-underline transition-colors hover:text-[#6b5f52] uppercase"
          >
            {t('nav.guide')}
          </Link>

          <div className="flex items-center gap-0 text-[10px] tracking-[0.2em]">
            <button
              onClick={() => i18n.changeLanguage('ja')}
              className={`px-2 py-1 transition-colors ${
                i18n.language === 'ja' ? 'text-[#c8955f]' : 'text-[#3a312a] hover:text-[#6b5f52]'
              }`}
            >
              JA
            </button>
            <span className="text-[#272218]">/</span>
            <button
              onClick={() => i18n.changeLanguage('en')}
              className={`px-2 py-1 transition-colors ${
                i18n.language === 'en' ? 'text-[#c8955f]' : 'text-[#3a312a] hover:text-[#6b5f52]'
              }`}
            >
              EN
            </button>
          </div>

          <a
            href={DOWNLOAD_URL}
            className="border border-[#272218] px-4 py-2 text-[10px] tracking-[0.2em] text-[#6b5f52] no-underline transition-all duration-150 hover:border-[#c8955f] hover:text-[#c8955f] uppercase"
          >
            {t('nav.download')}
          </a>
        </div>
      </div>
    </nav>
  )
}
