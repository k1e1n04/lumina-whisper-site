import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useState, useRef, useEffect } from 'react'

const DOWNLOAD_URL = 'https://github.com/k1e1n04/lumina-whisper-site/releases/latest/download/LuminaWhisper.dmg'

const LANGUAGES = [
  { code: 'ja', label: '日本語' },
  { code: 'en', label: 'English' },
  { code: 'zh', label: '中文' },
  { code: 'ko', label: '한국어' },
  { code: 'fr', label: 'Français' },
  { code: 'de', label: 'Deutsch' },
] as const

export default function Navbar() {
  const { t, i18n } = useTranslation()
  const [menuOpen, setMenuOpen] = useState(false)
  const [langOpen, setLangOpen] = useState(false)
  const langRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(e.target as Node)) {
        setLangOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const close = () => setMenuOpen(false)

  const currentLang = LANGUAGES.find((l) => l.code === i18n.language) ?? LANGUAGES[0]

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-white/95 backdrop-blur">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-6">
        <Link to="/" className="flex items-center gap-2.5 no-underline" onClick={close}>
          <img src="/icon.png" alt="LuminaWhisper" className="h-6 w-6 rounded" />
          <span className="text-sm tracking-wide text-text">LuminaWhisper</span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-7">
          <Link
            to="/guide/install"
            className="text-sm tracking-[0.05em] text-text-dim no-underline transition-colors hover:text-text-muted uppercase"
          >
            {t('nav.guide')}
          </Link>

          <Link
            to="/release"
            className="text-sm tracking-[0.05em] text-text-dim no-underline transition-colors hover:text-text-muted uppercase"
          >
            {t('nav.release')}
          </Link>

          <div className="relative" ref={langRef}>
            <button
              onClick={() => setLangOpen(!langOpen)}
              className="flex items-center gap-1 px-2 py-1 text-xs tracking-[0.05em] text-text-dim transition-colors hover:text-text-muted"
            >
              <span>{currentLang.code.toUpperCase()}</span>
              <svg
                className={`h-3 w-3 transition-transform duration-150 ${langOpen ? 'rotate-180' : ''}`}
                viewBox="0 0 12 12"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <path d="M2 4l4 4 4-4" />
              </svg>
            </button>
            {langOpen && (
              <div className="absolute right-0 top-full mt-1 min-w-[110px] border border-border bg-white shadow-sm">
                {LANGUAGES.map(({ code, label }) => (
                  <button
                    key={code}
                    onClick={() => { i18n.changeLanguage(code); setLangOpen(false) }}
                    className={`w-full px-3 py-2 text-left text-xs tracking-[0.03em] transition-colors hover:bg-surface ${
                      i18n.language === code ? 'text-accent' : 'text-text-muted'
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            )}
          </div>

          <a
            href={DOWNLOAD_URL}
            className="border border-border px-4 py-2 text-xs tracking-[0.05em] text-text-muted no-underline transition-all duration-150 hover:border-accent hover:text-accent uppercase"
          >
            {t('nav.download')}
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col justify-center gap-[5px] p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="メニュー"
          aria-expanded={menuOpen}
        >
          <span
            className={`block h-px w-5 bg-text transition-all duration-200 origin-center ${
              menuOpen ? 'translate-y-[6px] rotate-45' : ''
            }`}
          />
          <span
            className={`block h-px w-5 bg-text transition-all duration-200 ${
              menuOpen ? 'opacity-0' : ''
            }`}
          />
          <span
            className={`block h-px w-5 bg-text transition-all duration-200 origin-center ${
              menuOpen ? '-translate-y-[6px] -rotate-45' : ''
            }`}
          />
        </button>
      </div>

      {/* Mobile dropdown */}
      {menuOpen && (
        <div className="md:hidden border-t border-border bg-white/95 px-6 py-5 flex flex-col gap-5">
          <Link
            to="/guide/install"
            onClick={close}
            className="text-sm tracking-[0.05em] text-text-dim no-underline transition-colors hover:text-text-muted uppercase"
          >
            {t('nav.guide')}
          </Link>
          <Link
            to="/release"
            onClick={close}
            className="text-sm tracking-[0.05em] text-text-dim no-underline transition-colors hover:text-text-muted uppercase"
          >
            {t('nav.release')}
          </Link>
          <div className="flex flex-wrap gap-x-1 gap-y-1">
            {LANGUAGES.map(({ code, label }) => (
              <button
                key={code}
                onClick={() => { i18n.changeLanguage(code); close() }}
                className={`px-2 py-1 text-xs tracking-[0.03em] transition-colors ${
                  i18n.language === code ? 'text-accent' : 'text-text-dim hover:text-text-muted'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
          <a
            href={DOWNLOAD_URL}
            onClick={close}
            className="w-fit border border-border px-4 py-2 text-xs tracking-[0.05em] text-text-muted no-underline transition-all duration-150 hover:border-accent hover:text-accent uppercase"
          >
            {t('nav.download')}
          </a>
        </div>
      )}
    </nav>
  )
}
