import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import '../i18n'
import App from '../App'

function renderAt(path: string) {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <App routerless />
    </MemoryRouter>,
  )
}

describe('routing', () => {
  it('/en で LandingPage が表示される', () => {
    renderAt('/en')
    expect(screen.getByTestId('landing-page')).toBeInTheDocument()
  })

  it('/en/guide/install で InstallPage が表示される', () => {
    renderAt('/en/guide/install')
    expect(screen.getByTestId('guide-install')).toBeInTheDocument()
  })

  it('/guide/faq でも /en/guide/faq に正規化される', () => {
    window.localStorage.removeItem('preferred_language')
    renderAt('/guide/faq')
    expect(screen.getByTestId('guide-faq')).toBeInTheDocument()
  })

  it('保存言語が ja のときは旧URLから /ja に正規化される', () => {
    window.localStorage.setItem('preferred_language', 'ja')
    renderAt('/guide/install')
    expect(screen.getByTestId('guide-install')).toBeInTheDocument()
    window.localStorage.removeItem('preferred_language')
  })
})
