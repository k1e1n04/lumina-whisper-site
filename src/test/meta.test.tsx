// src/test/meta.test.tsx
import { describe, it, expect, beforeEach } from 'vitest'
import { render, waitFor } from '@testing-library/react'
import { HelmetProvider } from 'react-helmet-async'
import { MemoryRouter } from 'react-router-dom'
import '../i18n'
import LandingPage from '../pages/LandingPage'
import ReleasePage from '../pages/ReleasePage'
import InstallPage from '../pages/guide/InstallPage'
import SetupPage from '../pages/guide/SetupPage'
import UsagePage from '../pages/guide/UsagePage'
import SettingsPage from '../pages/guide/SettingsPage'
import FaqPage from '../pages/guide/FaqPage'
import TroubleshootPage from '../pages/guide/TroubleshootPage'

function renderWithHelmet(ui: React.ReactElement) {
  return render(
    <HelmetProvider>
      <MemoryRouter>{ui}</MemoryRouter>
    </HelmetProvider>,
  )
}

describe('page titles', () => {
  beforeEach(() => {
    document.title = ''
  })

  it('LandingPage', async () => {
    renderWithHelmet(<LandingPage />)
    await waitFor(() => {
      expect(document.title).toBe(
        'Mac 音声入力アプリ — オフライン・高精度 | Lumina Whisper',
      )
    })
  })

  it('ReleasePage', async () => {
    renderWithHelmet(<ReleasePage />)
    await waitFor(() => {
      expect(document.title).toBe('リリースノート | Lumina Whisper')
    })
  })

  it('InstallPage', async () => {
    renderWithHelmet(<InstallPage />)
    await waitFor(() => {
      expect(document.title).toBe('インストール | Lumina Whisper ガイド')
    })
  })

  it('SetupPage', async () => {
    renderWithHelmet(<SetupPage />)
    await waitFor(() => {
      expect(document.title).toBe('初期設定 | Lumina Whisper ガイド')
    })
  })

  it('UsagePage', async () => {
    renderWithHelmet(<UsagePage />)
    await waitFor(() => {
      expect(document.title).toBe('基本的な使い方 | Lumina Whisper ガイド')
    })
  })

  it('SettingsPage', async () => {
    renderWithHelmet(<SettingsPage />)
    await waitFor(() => {
      expect(document.title).toBe('設定項目 | Lumina Whisper ガイド')
    })
  })

  it('FaqPage', async () => {
    renderWithHelmet(<FaqPage />)
    await waitFor(() => {
      expect(document.title).toBe('よくある質問 | Lumina Whisper ガイド')
    })
  })

  it('TroubleshootPage', async () => {
    renderWithHelmet(<TroubleshootPage />)
    await waitFor(() => {
      expect(document.title).toBe(
        'トラブルシューティング | Lumina Whisper ガイド',
      )
    })
  })
})
