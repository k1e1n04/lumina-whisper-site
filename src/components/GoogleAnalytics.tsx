import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

const GA_ID = 'G-5GZ7JG4K79'

declare global {
  interface Window {
    gtag: (...args: unknown[]) => void
    dataLayer: unknown[]
  }
}

export default function GoogleAnalytics() {
  const location = useLocation()

  useEffect(() => {
    if (typeof window.gtag !== 'function') return
    window.gtag('event', 'page_view', {
      page_location: window.location.href,
      page_path: location.pathname + location.search,
      send_to: GA_ID,
    })
  }, [location])

  return null
}
