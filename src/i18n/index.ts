import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import ja from './ja.json'
import en from './en.json'
import zh from './zh.json'
import ko from './ko.json'
import fr from './fr.json'
import de from './de.json'

i18n.use(initReactI18next).init({
  resources: {
    ja: { translation: ja },
    en: { translation: en },
    zh: { translation: zh },
    ko: { translation: ko },
    fr: { translation: fr },
    de: { translation: de },
  },
  lng: 'ja',
  fallbackLng: 'ja',
  interpolation: { escapeValue: false },
})

export default i18n
