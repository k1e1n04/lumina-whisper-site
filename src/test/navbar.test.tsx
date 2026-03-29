import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import '../i18n'
import i18n from '../i18n'
import Navbar from '../components/Navbar'

function renderNavbar() {
  return render(
    <MemoryRouter>
      <Navbar />
    </MemoryRouter>,
  )
}

describe('Navbar', () => {
  it('ガイドリンクが表示される', () => {
    renderNavbar()
    expect(screen.getByText('ガイド')).toBeInTheDocument()
  })

  it('ダウンロードボタンが表示される', () => {
    renderNavbar()
    expect(screen.getByText('ダウンロード')).toBeInTheDocument()
  })

  it('EN ボタンをクリックすると言語が英語に切り替わる', async () => {
    const user = userEvent.setup()
    renderNavbar()
    await user.click(screen.getByRole('button', { name: 'EN' }))
    expect(i18n.language).toBe('en')
    await i18n.changeLanguage('ja')
  })

  it('JA ボタンをクリックすると言語が日本語に切り替わる', async () => {
    const user = userEvent.setup()
    await i18n.changeLanguage('en')
    renderNavbar()
    await user.click(screen.getByRole('button', { name: 'JA' }))
    expect(i18n.language).toBe('ja')
  })
})
