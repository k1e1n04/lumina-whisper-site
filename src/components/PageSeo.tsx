import { Helmet } from 'react-helmet-async'
import { useParams } from 'react-router-dom'
import { DEFAULT_LANGUAGE, SUPPORTED_LANGUAGES, normalizeLanguage } from '../i18n/languages'
import { getCanonicalUrl, getSeoMetadata, type SeoPageKey } from '../seo/metadata'

interface PageSeoProps {
  page: SeoPageKey
  includeOgImage?: boolean
}

export default function PageSeo({ page, includeOgImage = false }: PageSeoProps) {
  const { lang } = useParams()
  const language = normalizeLanguage(lang) ?? DEFAULT_LANGUAGE
  const { title, description } = getSeoMetadata(language, page)
  const canonical = getCanonicalUrl(language, page)
  const ogImage = 'https://lumina-whisper.com/ogp.png'

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonical} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={canonical} />
      {includeOgImage && <meta property="og:image" content={ogImage} />}
      {includeOgImage && <meta name="twitter:card" content="summary_large_image" />}
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      {includeOgImage && <meta name="twitter:image" content={ogImage} />}
      {SUPPORTED_LANGUAGES.map((code) => (
        <link key={code} rel="alternate" hrefLang={code} href={getCanonicalUrl(code, page)} />
      ))}
      <link rel="alternate" hrefLang="x-default" href={getCanonicalUrl(DEFAULT_LANGUAGE, page)} />
    </Helmet>
  )
}
