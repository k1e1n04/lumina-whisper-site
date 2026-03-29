import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
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
    <div data-testid="guide-layout" className="flex min-h-screen flex-col">
      <Navbar />
      <div className="mx-auto flex w-full max-w-6xl flex-1 gap-8 px-6 pt-16 py-10">
        <aside className="hidden w-56 shrink-0 md:block">
          <nav className="sticky top-24">
            {SIDEBAR_SECTIONS.map(({ groupKey, pages }) => (
              <div key={groupKey} className="mb-6">
                <p className="mb-2 px-3 text-xs font-semibold tracking-wider text-gray-400 uppercase">
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
                        `block rounded-lg px-3 py-2 text-sm no-underline transition-colors ${
                          isActive
                            ? 'bg-accent/10 font-semibold text-accent'
                            : 'text-gray-600 hover:bg-gray-50 hover:text-primary'
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
          <Outlet />
          <GuidePageNav />
        </main>
      </div>
      <Footer />
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
    <div className="mt-12 flex justify-between border-t border-gray-200 pt-6">
      {prev ? (
        <button onClick={() => navigate(prev.path)} className="text-sm text-accent hover:underline">
          {'<'} {t('guide.nav.prev')}: {t(`guide.sidebar.${prev.key}`)}
        </button>
      ) : (
        <div />
      )}
      {next ? (
        <button onClick={() => navigate(next.path)} className="text-sm text-accent hover:underline">
          {t('guide.nav.next')}: {t(`guide.sidebar.${next.key}`)} {'>'}
        </button>
      ) : (
        <div />
      )}
    </div>
  )
}
