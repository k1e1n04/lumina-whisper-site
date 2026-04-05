// src/test/meta.test.tsx
import { describe, it, expect, beforeEach } from 'vitest'
import { render, waitFor } from '@testing-library/react'
import { HelmetProvider } from 'react-helmet-async'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import '../i18n'
import LandingPage from '../pages/LandingPage'
import ReleasePage from '../pages/ReleasePage'
import InstallPage from '../pages/guide/InstallPage'
import SetupPage from '../pages/guide/SetupPage'
import UsagePage from '../pages/guide/UsagePage'
import SettingsPage from '../pages/guide/SettingsPage'
import FaqPage from '../pages/guide/FaqPage'
import TroubleshootPage from '../pages/guide/TroubleshootPage'

function renderWithHelmet(ui: React.ReactElement, route: string) {
  return render(
    <HelmetProvider>
      <MemoryRouter initialEntries={[route]}>
        <Routes>
          <Route path="/:lang" element={ui} />
          <Route path="/:lang/release" element={ui} />
          <Route path="/:lang/guide/install" element={ui} />
          <Route path="/:lang/guide/setup" element={ui} />
          <Route path="/:lang/guide/usage" element={ui} />
          <Route path="/:lang/guide/settings" element={ui} />
          <Route path="/:lang/guide/faq" element={ui} />
          <Route path="/:lang/guide/troubleshoot" element={ui} />
        </Routes>
      </MemoryRouter>
    </HelmetProvider>,
  )
}

describe('page titles', () => {
  beforeEach(() => {
    document.title = ''
  })

  it('LandingPage', async () => {
    renderWithHelmet(<LandingPage />, '/en')
    await waitFor(() => {
      expect(document.title).toBe(
        'Mac voice typing app - offline and accurate | Lumina Whisper',
      )
    })
  })

  it('ReleasePage', async () => {
    renderWithHelmet(<ReleasePage />, '/en/release')
    await waitFor(() => {
      expect(document.title).toBe('Release Notes | Lumina Whisper')
    })
  })

  it('InstallPage', async () => {
    renderWithHelmet(<InstallPage />, '/en/guide/install')
    await waitFor(() => {
      expect(document.title).toBe('Installation | Lumina Whisper Guide')
    })
  })

  it('SetupPage', async () => {
    renderWithHelmet(<SetupPage />, '/en/guide/setup')
    await waitFor(() => {
      expect(document.title).toBe('Initial Setup | Lumina Whisper Guide')
    })
  })

  it('UsagePage', async () => {
    renderWithHelmet(<UsagePage />, '/en/guide/usage')
    await waitFor(() => {
      expect(document.title).toBe('Basic Usage | Lumina Whisper Guide')
    })
  })

  it('SettingsPage', async () => {
    renderWithHelmet(<SettingsPage />, '/en/guide/settings')
    await waitFor(() => {
      expect(document.title).toBe('Settings | Lumina Whisper Guide')
    })
  })

  it('FaqPage', async () => {
    renderWithHelmet(<FaqPage />, '/en/guide/faq')
    await waitFor(() => {
      expect(document.title).toBe('FAQ | Lumina Whisper Guide')
    })
  })

  it('TroubleshootPage', async () => {
    renderWithHelmet(<TroubleshootPage />, '/en/guide/troubleshoot')
    await waitFor(() => {
      expect(document.title).toBe(
        'Troubleshooting | Lumina Whisper Guide',
      )
    })
  })

  it('ja ルートでは canonical と hreflang が ja URLになる', async () => {
    renderWithHelmet(<ReleasePage />, '/ja/release')
    await waitFor(() => {
      const canonical = document.head.querySelector('link[rel="canonical"]')
      expect(canonical?.getAttribute('href')).toBe('https://lumina-whisper.com/ja/release/')
      const jaAlt = document.head.querySelector('link[rel="alternate"][hreflang="ja"]')
      expect(jaAlt?.getAttribute('href')).toBe('https://lumina-whisper.com/ja/release/')
    })
  })
})
