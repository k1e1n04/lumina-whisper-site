import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import ja from './ja.json'
import en from './en.json'
import zh from './zh.json'
import ko from './ko.json'
import fr from './fr.json'
import de from './de.json'
import {
  LANGUAGE_STORAGE_KEY,
  DEFAULT_LANGUAGE,
  detectPreferredLanguage,
  normalizeLanguage,
  type SupportedLanguage,
} from './languages'

const initialLanguage: SupportedLanguage = detectPreferredLanguage()

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
