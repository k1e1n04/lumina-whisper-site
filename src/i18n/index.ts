import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import ja from './ja.json'
import en from './en.json'
import zh from './zh.json'
import ko from './ko.json'
import fr from './fr.json'
import de from './de.json'
import {
  DEFAULT_LANGUAGE,
  LANGUAGE_STORAGE_KEY,
  type SupportedLanguage,
  normalizeLanguage,
} from './languages'

function detectInitialLanguage(): SupportedLanguage {
  if (typeof window === 'undefined') return DEFAULT_LANGUAGE

  const fromStorage = normalizeLanguage(window.localStorage.getItem(LANGUAGE_STORAGE_KEY))
  if (fromStorage) return fromStorage

  const candidates = window.navigator.languages?.length
    ? window.navigator.languages
    : [window.navigator.language]

  for (const language of candidates) {
    const normalized = normalizeLanguage(language)
    if (normalized) return normalized
  }

  return DEFAULT_LANGUAGE
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
  fallbackLng: DEFAULT_LANGUAGE,
  interpolation: { escapeValue: false },
})

if (typeof window !== 'undefined') {
  i18n.on('languageChanged', (language) => {
    const normalized = normalizeLanguage(language)
    if (!normalized) return
    window.localStorage.setItem(LANGUAGE_STORAGE_KEY, normalized)
    document.documentElement.lang = normalized
  })
  document.documentElement.lang = normalizeLanguage(i18n.language) ?? DEFAULT_LANGUAGE
}

export default i18n
