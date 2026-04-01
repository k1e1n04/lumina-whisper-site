import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import ReleasePage from './pages/ReleasePage'
import GuideLayout from './pages/guide/GuideLayout'
import InstallPage from './pages/guide/InstallPage'
import SetupPage from './pages/guide/SetupPage'
import UsagePage from './pages/guide/UsagePage'
import SettingsPage from './pages/guide/SettingsPage'
import FaqPage from './pages/guide/FaqPage'
import TroubleshootPage from './pages/guide/TroubleshootPage'

interface AppProps {
  routerless?: boolean
}

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/release" element={<ReleasePage />} />
      <Route path="/guide" element={<Navigate to="/guide/install" replace />} />
      <Route path="/guide" element={<GuideLayout />}>
        <Route path="install" element={<InstallPage />} />
        <Route path="setup" element={<SetupPage />} />
        <Route path="usage" element={<UsagePage />} />
        <Route path="settings" element={<SettingsPage />} />
        <Route path="faq" element={<FaqPage />} />
        <Route path="troubleshoot" element={<TroubleshootPage />} />
      </Route>
    </Routes>
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
