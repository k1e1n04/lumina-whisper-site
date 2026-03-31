import { StrictMode } from 'react'
import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import './i18n'
import App from './App'

export function render(url: string): { html: string } {
  const html = renderToString(
    <StrictMode>
      <HelmetProvider>
        <StaticRouter location={url}>
          <App routerless />
        </StaticRouter>
      </HelmetProvider>
    </StrictMode>,
  )
  return { html }
}
