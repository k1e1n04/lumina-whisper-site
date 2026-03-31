import { StrictMode } from 'react'
import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import type { FilledContext } from 'react-helmet-async'
import './i18n'
import App from './App'

export function render(url: string): { html: string; helmet: FilledContext['helmet'] } {
  const helmetContext: Partial<FilledContext> = {}
  const html = renderToString(
    <StrictMode>
      <HelmetProvider context={helmetContext}>
        <StaticRouter location={url}>
          <App routerless />
        </StaticRouter>
      </HelmetProvider>
    </StrictMode>,
  )
  return { html, helmet: (helmetContext as FilledContext).helmet }
}
