// src/test/accuracy-section.test.tsx
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import '../i18n'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import AccuracySection from '../components/AccuracySection'

const MOCK_DATA = {
  lumina: { cer: 3.2, sampleCount: 50 },
  apple: { cer: 8.7, sampleCount: 50 },
  dataset: 'JSUT Basic5000',
  measuredAt: '2026-04-05',
  modelName: 'openai_whisper-small',
  samples: [
    {
      id: 'BASIC5000_0001',
      reference: 'テスト文章',
      lumina: 'テスト文章',
      apple: 'テスト文',
    },
  ],
}

function renderWithRouter(ui: React.ReactElement) {
  return render(
    <MemoryRouter initialEntries={['/en']}>
      <Routes>
        <Route path="/:lang" element={ui} />
      </Routes>
    </MemoryRouter>,
  )
}

describe('AccuracySection', () => {
  beforeEach(() => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({
        ok: true,
        json: () => Promise.resolve(MOCK_DATA),
      }),
    )
  })

  afterEach(() => {
    vi.unstubAllGlobals()
  })

  it('fetches benchmark-results.json on mount', async () => {
    renderWithRouter(<AccuracySection />)
    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith('/benchmark-results.json')
    })
  })

  it('renders CER values after fetch', async () => {
    renderWithRouter(<AccuracySection />)
    await waitFor(() => {
      expect(screen.getByText('3.2%')).toBeInTheDocument()
      expect(screen.getByText('8.7%')).toBeInTheDocument()
    })
  })

  it('renders sample comparison rows', async () => {
    renderWithRouter(<AccuracySection />)
    await waitFor(() => {
      expect(screen.getAllByText('テスト文章').length).toBeGreaterThan(0)
    })
  })

  it('renders nothing when fetch fails', async () => {
    vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new Error('Network error')))
    const { container } = renderWithRouter(<AccuracySection />)
    await waitFor(() => {
      expect(container.firstChild).toBeNull()
    })
  })
})
