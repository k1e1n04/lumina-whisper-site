import { useTranslation } from 'react-i18next'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const DOWNLOAD_URL = 'https://github.com/ishiiken/lumina-whisper/releases/latest/download/LuminaWhisper.dmg'

const FEATURES = [
  { key: 'hotkey', icon: '⌨️' },
  { key: 'local', icon: '🔒' },
  { key: 'silicon', icon: '⚡' },
  { key: 'llm', icon: '✨' },
] as const

const HOW_TO_USE_STEPS = ['step1', 'step2', 'step3', 'step4'] as const

export default function LandingPage() {
  const { t } = useTranslation()

  return (
    <div data-testid="landing-page" className="min-h-screen">
      <Navbar />

      <section className="bg-gradient-to-b from-slate-50 to-white px-6 pt-32 pb-20 text-center">
        <div className="mx-auto max-w-3xl">
          <h1 className="mb-4 text-5xl leading-tight font-bold text-primary">{t('hero.tagline')}</h1>
          <p className="mb-8 text-xl text-gray-600">{t('hero.subtext')}</p>
          <a
            href={DOWNLOAD_URL}
            className="inline-block rounded-xl bg-accent px-8 py-4 text-lg font-semibold text-white no-underline transition-colors hover:bg-blue-600"
          >
            {t('hero.download')}
          </a>
          <p className="mt-4 text-sm text-gray-400">{t('hero.requirements')}</p>
        </div>
      </section>

      <section className="px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <h2 className="mb-12 text-center text-3xl font-bold text-primary">{t('features.title')}</h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {FEATURES.map(({ key, icon }) => (
              <div
                key={key}
                className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
              >
                <div className="mb-3 text-3xl">{icon}</div>
                <h3 className="mb-2 font-semibold text-primary">{t(`features.${key}.title`)}</h3>
                <p className="text-sm leading-relaxed text-gray-600">{t(`features.${key}.desc`)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-slate-50 px-6 py-20">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-12 text-center text-3xl font-bold text-primary">{t('howToUse.title')}</h2>
          <div className="grid grid-cols-2 gap-6 lg:grid-cols-4">
            {HOW_TO_USE_STEPS.map((step, index) => (
              <div key={step} className="text-center">
                <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-accent text-lg font-bold text-white">
                  {index + 1}
                </div>
                <p className="mb-1 text-sm font-medium text-gray-500">{t(`howToUse.${step}.label`)}</p>
                <p className="text-sm font-semibold text-primary">{t(`howToUse.${step}.text`)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-primary px-6 py-20 text-center text-white">
        <div className="mx-auto max-w-2xl">
          <h2 className="mb-6 text-3xl font-bold">{t('cta.title')}</h2>
          <a
            href={DOWNLOAD_URL}
            className="inline-block rounded-xl bg-white px-8 py-4 text-lg font-semibold text-primary no-underline transition-colors hover:bg-gray-100"
          >
            {t('cta.button')}
          </a>
          <p className="mt-4 text-sm text-blue-200">{t('cta.requirements')}</p>
        </div>
      </section>

      <Footer />
    </div>
  )
}
