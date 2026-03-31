import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import './i18n'
import App from './App'

const container = document.getElementById('root')!
const app = (
  <StrictMode>
    <BrowserRouter basename="/lumina-whisper-site">
      <App routerless />
    </BrowserRouter>
  </StrictMode>
)

if (container.hasChildNodes()) {
  hydrateRoot(container, app)
} else {
  createRoot(container).render(app)
}
