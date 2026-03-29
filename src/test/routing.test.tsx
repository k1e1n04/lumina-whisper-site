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
  it('/ で LandingPage が表示される', () => {
    renderAt('/')
    expect(screen.getByTestId('landing-page')).toBeInTheDocument()
  })

  it('/guide/install で InstallPage が表示される', () => {
    renderAt('/guide/install')
    expect(screen.getByTestId('guide-install')).toBeInTheDocument()
  })

  it('/guide/faq で FaqPage が表示される', () => {
    renderAt('/guide/faq')
    expect(screen.getByTestId('guide-faq')).toBeInTheDocument()
  })
})
