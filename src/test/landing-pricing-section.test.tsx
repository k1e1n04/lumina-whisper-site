import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import i18n from '../i18n'
import LandingPage from '../pages/LandingPage'

function renderJaLanding() {
  return render(
    <MemoryRouter initialEntries={['/ja']}>
      <Routes>
        <Route path="/:lang" element={<LandingPage />} />
      </Routes>
    </MemoryRouter>,
  )
}

describe('LandingPage pricing advantage section', () => {
  it('価格優位セクションの見出し・比較ラベル・注記を表示する', () => {
    i18n.changeLanguage('ja')
    renderJaLanding()

    expect(screen.getByText('サブスクを払い続けるより、買い切りで終わらせる')).toBeInTheDocument()
    expect(screen.getByText('Lumina Whisper')).toBeInTheDocument()
    expect(screen.getByText('Aqua Voice')).toBeInTheDocument()
    expect(screen.getByText('Superwhisper')).toBeInTheDocument()
    expect(screen.getByText('Wispr Flow')).toBeInTheDocument()
    expect(screen.getByText('VoiceOS')).toBeInTheDocument()
    expect(screen.getByText(/※価格は 2026-04-05 時点/)).toBeInTheDocument()
  })
})
