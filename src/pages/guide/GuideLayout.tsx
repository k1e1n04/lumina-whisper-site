import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useState } from 'react'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'

const GUIDE_PAGES = [
  { path: '/guide/install', key: 'install' },
  { path: '/guide/setup', key: 'setup' },
  { path: '/guide/usage', key: 'usage' },
  { path: '/guide/settings', key: 'settings' },
  { path: '/guide/faq', key: 'faq' },
  { path: '/guide/troubleshoot', key: 'troubleshoot' },
] as const

type GuidePageKey = (typeof GUIDE_PAGES)[number]['key']

const SIDEBAR_SECTIONS = [
  {
    groupKey: 'gettingStarted',
    pages: ['install', 'setup'] as GuidePageKey[],
  },
  {
    groupKey: 'usageGroup',
    pages: ['usage', 'settings'] as GuidePageKey[],
  },
  {
    groupKey: 'support',
    pages: ['faq', 'troubleshoot'] as GuidePageKey[],
  },
]

export default function GuideLayout() {
  const { t } = useTranslation()

  return (
    <div data-testid="guide-layout" className="flex min-h-screen flex-col bg-bg">
      <Navbar />
      <div className="mx-auto flex w-full max-w-6xl flex-1 gap-12 px-6 pt-16 py-10">
        <aside className="hidden w-48 shrink-0 md:block">
          <nav className="sticky top-24">
            {SIDEBAR_SECTIONS.map(({ groupKey, pages }) => (
              <div key={groupKey} className="mb-8">
                <p className="mb-3 text-xs tracking-[0.1em] text-text-dim uppercase">
                  {t(`guide.sidebar.${groupKey}`)}
                </p>
                {pages.map((pageKey) => {
                  const page = GUIDE_PAGES.find((p) => p.key === pageKey)
                  if (!page) {
                    return null
                  }
                  return (
                    <NavLink
                      key={pageKey}
                      to={page.path}
                      className={({ isActive }) =>
                        `block py-2 text-sm no-underline transition-colors ${
                          isActive
                            ? 'font-medium text-accent'
                            : 'text-text-muted hover:text-text'
                        }`
                      }
                    >
                      {t(`guide.sidebar.${pageKey}`)}
                    </NavLink>
                  )
                })}
              </div>
            ))}
          </nav>
        </aside>

        <main className="min-w-0 flex-1">
          <MobileGuideNav />
          <Outlet />
          <GuidePageNav />
        </main>
      </div>
      <Footer />
    </div>
  )
}

function MobileGuideNav() {
  const { t } = useTranslation()
  const location = useLocation()
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)

  const currentPage = GUIDE_PAGES.find((p) => p.path === location.pathname)

  return (
    <div className="md:hidden mb-6 border border-border">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-4 py-3 text-sm text-text"
      >
        <span className="font-medium">
          {currentPage ? t(`guide.sidebar.${currentPage.key}`) : t('guide.nav.menu')}
        </span>
        <span
          className={`text-text-dim transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
        >
          ▾
        </span>
      </button>
      {open && (
        <div className="border-t border-border">
          {SIDEBAR_SECTIONS.map(({ groupKey, pages }) => (
            <div key={groupKey} className="py-2">
              <p className="px-4 py-1 text-xs tracking-[0.1em] text-text-dim uppercase">
                {t(`guide.sidebar.${groupKey}`)}
              </p>
              {pages.map((pageKey) => {
                const page = GUIDE_PAGES.find((p) => p.key === pageKey)
                if (!page) return null
                const isActive = location.pathname === page.path
                return (
                  <button
                    key={pageKey}
                    onClick={() => {
                      navigate(page.path)
                      setOpen(false)
                    }}
                    className={`w-full text-left px-4 py-2 text-sm transition-colors ${
                      isActive ? 'font-medium text-accent' : 'text-text-muted hover:text-text'
                    }`}
                  >
                    {t(`guide.sidebar.${pageKey}`)}
                  </button>
                )
              })}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

function GuidePageNav() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const location = useLocation()
  const currentIndex = GUIDE_PAGES.findIndex((p) => p.path === location.pathname)
  const prev = currentIndex > 0 ? GUIDE_PAGES[currentIndex - 1] : null
  const next = currentIndex < GUIDE_PAGES.length - 1 ? GUIDE_PAGES[currentIndex + 1] : null

  return (
    <div className="mt-16 flex justify-between border-t border-border pt-6">
      {prev ? (
        <button
          onClick={() => navigate(prev.path)}
          className="text-sm tracking-[0.05em] text-text-muted transition-colors hover:text-accent"
        >
          ← {t('guide.nav.prev')}: {t(`guide.sidebar.${prev.key}`)}
        </button>
      ) : (
        <div />
      )}
      {next ? (
        <button
          onClick={() => navigate(next.path)}
          className="text-sm tracking-[0.05em] text-text-muted transition-colors hover:text-accent"
        >
          {t('guide.nav.next')}: {t(`guide.sidebar.${next.key}`)} →
        </button>
      ) : (
        <div />
      )}
    </div>
  )
}
