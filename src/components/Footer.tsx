import { Link, useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { DEFAULT_LANGUAGE, normalizeLanguage, withLanguagePrefix } from '../i18n/languages'

export default function Footer() {
  const { t } = useTranslation()
  const { lang } = useParams()
  const currentLanguage = normalizeLanguage(lang) ?? DEFAULT_LANGUAGE

  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 py-8 sm:flex-row">
        <span className="text-xs tracking-[0.05em] text-text-dim">{t('footer.copyright')}</span>
        <div className="flex gap-8">
          <Link
            to={withLanguagePrefix(currentLanguage, '/guide/install')}
            className="text-xs tracking-[0.05em] text-text-dim no-underline transition-colors hover:text-text-muted uppercase"
          >
            {t('footer.guide')}
          </Link>
          <Link
            to={withLanguagePrefix(currentLanguage, '/privacy')}
            className="text-xs tracking-[0.05em] text-text-dim no-underline transition-colors hover:text-text-muted uppercase"
          >
            Privacy
          </Link>
        </div>
      </div>
    </footer>
  )
}
