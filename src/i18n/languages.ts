export const SUPPORTED_LANGUAGES = ['ja', 'en', 'zh', 'ko', 'fr', 'de'] as const
export type SupportedLanguage = (typeof SUPPORTED_LANGUAGES)[number]

export const DEFAULT_LANGUAGE: SupportedLanguage = 'en'
export const LANGUAGE_STORAGE_KEY = 'preferred_language'

export function normalizeLanguage(value: string | null | undefined): SupportedLanguage | null {
  if (!value) return null
  const normalized = value.toLowerCase().split('-')[0]
  return SUPPORTED_LANGUAGES.includes(normalized as SupportedLanguage)
    ? (normalized as SupportedLanguage)
    : null
}

export function withLanguagePrefix(language: string, path: string): string {
  const normalized = normalizeLanguage(language) ?? DEFAULT_LANGUAGE
  const suffix = path === '/' ? '' : path
  return `/${normalized}${suffix}`
}

export function replaceLanguageInPath(pathname: string, language: string): string {
  const normalized = normalizeLanguage(language) ?? DEFAULT_LANGUAGE
  const suffix = pathname.replace(/^\/[^/]+/, '') || ''
  return `/${normalized}${suffix || '/'}`
}
