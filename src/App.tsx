import { useEffect } from 'react'
import {
  BrowserRouter,
  Navigate,
  Outlet,
  Route,
  Routes,
  useLocation,
  useParams,
} from 'react-router-dom'
import GoogleAnalytics from './components/GoogleAnalytics'
import LandingPage from './pages/LandingPage'
import ReleasePage from './pages/ReleasePage'
import PrivacyPage from './pages/PrivacyPage'
import GuideLayout from './pages/guide/GuideLayout'
import InstallPage from './pages/guide/InstallPage'
import SetupPage from './pages/guide/SetupPage'
import UsagePage from './pages/guide/UsagePage'
import SettingsPage from './pages/guide/SettingsPage'
import FaqPage from './pages/guide/FaqPage'
import TroubleshootPage from './pages/guide/TroubleshootPage'
import i18n from './i18n'
import {
  DEFAULT_LANGUAGE,
  detectPreferredLanguage,
  normalizeLanguage,
  replaceLanguageInPath,
} from './i18n/languages'

interface AppProps {
  routerless?: boolean
}

function LanguageLayout() {
  const { lang } = useParams()
  const location = useLocation()
  const normalizedLanguage = normalizeLanguage(lang) ?? DEFAULT_LANGUAGE

  useEffect(() => {
    void i18n.changeLanguage(normalizedLanguage)
  }, [normalizedLanguage])

  if (lang !== normalizedLanguage) {
    return (
      <Navigate
        replace
        to={`${replaceLanguageInPath(location.pathname, normalizedLanguage)}${location.search}${location.hash}`}
      />
    )
  }

  return <Outlet />
}

function LegacyPathRedirect() {
  const location = useLocation()
  const targetLanguage = detectPreferredLanguage()
  return (
    <Navigate
      replace
      to={`/${targetLanguage}${location.pathname}${location.search}${location.hash}`}
    />
  )
}

function AppRoutes() {
  return (
    <>
      <GoogleAnalytics />
      <Routes>
        <Route path="/:lang" element={<LanguageLayout />}>
          <Route index element={<LandingPage />} />
          <Route path="release" element={<ReleasePage />} />
          <Route path="privacy" element={<PrivacyPage />} />
          <Route path="guide" element={<Navigate to="install" replace />} />
          <Route path="guide" element={<GuideLayout />}>
            <Route path="install" element={<InstallPage />} />
            <Route path="setup" element={<SetupPage />} />
            <Route path="usage" element={<UsagePage />} />
            <Route path="settings" element={<SettingsPage />} />
            <Route path="faq" element={<FaqPage />} />
            <Route path="troubleshoot" element={<TroubleshootPage />} />
          </Route>
        </Route>

        <Route path="*" element={<LegacyPathRedirect />} />
      </Routes>
    </>
  )
}

export default function App({ routerless = false }: AppProps) {
  if (routerless) {
    return <AppRoutes />
  }
  return (
    <BrowserRouter basename="/">
      <AppRoutes />
    </BrowserRouter>
  )
}
