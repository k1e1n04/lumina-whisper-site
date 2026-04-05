import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import ja from './ja.json'
import en from './en.json'
import zh from './zh.json'
import ko from './ko.json'
import fr from './fr.json'
import de from './de.json'

const STORAGE_KEY = 'preferred_language'
const SUPPORTED_LANGUAGES = ['ja', 'en', 'zh', 'ko', 'fr', 'de'] as const
type SupportedLanguage = (typeof SUPPORTED_LANGUAGES)[number]

function normalizeLanguage(value: string | null | undefined): SupportedLanguage | null {
  if (!value) return null
  const normalized = value.toLowerCase().split('-')[0]
  return SUPPORTED_LANGUAGES.includes(normalized as SupportedLanguage)
    ? (normalized as SupportedLanguage)
    : null
}

function detectInitialLanguage(): SupportedLanguage {
  if (typeof window === 'undefined') return 'en'

  const fromStorage = normalizeLanguage(window.localStorage.getItem(STORAGE_KEY))
  if (fromStorage) return fromStorage

  const candidates = window.navigator.languages?.length
    ? window.navigator.languages
    : [window.navigator.language]

  for (const language of candidates) {
    const normalized = normalizeLanguage(language)
    if (normalized) return normalized
  }

  return 'en'
}

const initialLanguage = detectInitialLanguage()

i18n.use(initReactI18next).init({
  resources: {
    ja: { translation: ja },
    en: { translation: en },
    zh: { translation: zh },
    ko: { translation: ko },
    fr: { translation: fr },
    de: { translation: de },
  },
  lng: initialLanguage,
  fallbackLng: 'en',
  interpolation: { escapeValue: false },
})

if (typeof window !== 'undefined') {
  i18n.on('languageChanged', (language) => {
    const normalized = normalizeLanguage(language)
    if (!normalized) return
    window.localStorage.setItem(STORAGE_KEY, normalized)
    document.documentElement.lang = normalized
  })
  document.documentElement.lang = normalizeLanguage(i18n.language) ?? 'en'
}

export default i18n
