import { useTranslation } from 'react-i18next'
import { Helmet } from 'react-helmet-async'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import AppDemoSection from '../components/AppDemoSection'

const DOWNLOAD_URL = 'https://github.com/k1e1n04/lumina-whisper-site/releases/latest/download/LuminaWhisper.dmg'

const FEATURES = [
  { key: 'hotkey' },
  { key: 'local' },
  { key: 'silicon' },
  { key: 'llm' },
  { key: 'multilingual' },
] as const

const HOW_TO_USE_STEPS = ['step1', 'step2', 'step3', 'step4'] as const

export default function LandingPage() {
  const { t } = useTranslation()

  return (
    <div data-testid="landing-page" className="min-h-screen bg-bg">
      <Helmet>
        <title>Mac 音声入力アプリ — オフライン・高精度 | Lumina Whisper</title>
        <meta
          name="description"
          content="Lumina Whisper は Mac 専用の音声入力アプリ。完全ローカル処理でプライバシーを守りながら高精度な文字起こしを実現。Apple Silicon 最適化、インターネット不要で高速動作。"
        />
        <meta property="og:title" content="Mac 音声入力アプリ — オフライン・高精度 | Lumina Whisper" />
        <meta
          property="og:description"
          content="Lumina Whisper は Mac 専用の音声入力アプリ。完全ローカル処理でプライバシーを守りながら高精度な文字起こしを実現。Apple Silicon 最適化、インターネット不要で高速動作。"
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://lumina-whisper.com/" />
        <meta property="og:image" content="https://lumina-whisper.com/ogp.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Mac 音声入力アプリ — オフライン・高精度 | Lumina Whisper" />
        <meta
          name="twitter:description"
          content="Lumina Whisper は Mac 専用の音声入力アプリ。完全ローカル処理でプライバシーを守りながら高精度な文字起こしを実現。Apple Silicon 最適化、インターネット不要で高速動作。"
        />
        <meta name="twitter:image" content="https://lumina-whisper.com/ogp.png" />
        <link rel="canonical" href="https://lumina-whisper.com/" />
        <link rel="alternate" hrefLang="ja" href="https://lumina-whisper.com/" />
        <link rel="alternate" hrefLang="en" href="https://lumina-whisper.com/" />
        <link rel="alternate" hrefLang="x-default" href="https://lumina-whisper.com/" />
      </Helmet>
      <Navbar />

      {/* Hero */}
      <section className="relative flex min-h-screen items-center justify-center overflow-hidden px-6 pt-14">
        {/* Faint horizontal rule grid */}
        <div className="pointer-events-none absolute inset-0" aria-hidden>
          {[20, 35, 50, 65, 80].map((pct) => (
            <div
              key={pct}
              className="absolute w-full border-t border-text/[0.04]"
              style={{ top: `${pct}%` }}
            />
          ))}
          {/* Subtle radial glow behind text */}
          <div
            className="absolute left-1/2 top-1/2 h-[600px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-[0.06]"
            style={{ background: 'radial-gradient(ellipse, #2B2D5F 0%, transparent 70%)' }}
          />
        </div>

        <div className="relative mx-auto max-w-3xl text-center">
          <p className="anim-fade-up anim-fade-up-1 mb-10 text-xs tracking-[0.1em] text-text-dim uppercase">
            Mac Voice Recognition
          </p>
          <h1
            className="anim-fade-up anim-fade-up-2 mb-8 font-serif text-5xl leading-[1.3] font-normal text-text sm:text-6xl"
            style={{ fontFamily: 'var(--font-serif)' }}
          >
            {t('hero.tagline')}
          </h1>
          <p className="anim-fade-up anim-fade-up-3 mx-auto mb-14 max-w-md text-base leading-loose text-text-muted">
            {t('hero.subtext')}
          </p>
          <div className="anim-fade-up anim-fade-up-4">
            <a
              href={DOWNLOAD_URL}
              className="inline-block border border-accent px-10 py-3.5 text-xs tracking-[0.1em] text-accent no-underline transition-all duration-200 hover:bg-accent hover:text-white uppercase"
            >
              {t('hero.download')}
            </a>
            <p className="mt-6 text-xs tracking-[0.05em] text-text-dim">
              {t('hero.requirements')}
            </p>
          </div>
        </div>

        {/* Bottom fade */}
        <div
          className="pointer-events-none absolute bottom-0 left-0 right-0 h-32"
          style={{ background: 'linear-gradient(to bottom, transparent, #FAFAFA)' }}
          aria-hidden
        />
      </section>

      <AppDemoSection />

      {/* Pain → Solution */}
      <section className="border-t border-border px-6 py-24">
        <div className="mx-auto max-w-3xl">
          <p className="mb-8 text-sm leading-loose text-text-muted">
            {t('pain.question')}
          </p>
          <ul className="mb-8 space-y-3">
            {(t('pain.items', { returnObjects: true }) as string[]).map((item) => (
              <li key={item} className="flex items-center gap-3 text-sm text-text-muted">
                <span className="h-px w-4 shrink-0 bg-text-dim" />
                {item}
              </li>
            ))}
          </ul>
          <p className="text-base font-normal text-text" style={{ fontFamily: 'var(--font-serif)' }}>
            {t('pain.answer')}
          </p>
        </div>
      </section>

      {/* Features */}
      <section className="px-6 py-28">
        <div className="mx-auto max-w-3xl">
          <div className="mb-16 flex items-center gap-6">
            <span className="text-xs tracking-[0.1em] text-text-dim uppercase">Features</span>
            <div className="flex-1 border-t border-border" />
          </div>

          <h2
            className="mb-16 text-2xl font-normal text-text"
            style={{ fontFamily: 'var(--font-serif)' }}
          >
            {t('features.title')}
          </h2>

          <div>
            {FEATURES.map(({ key }, index) => (
              <div
                key={key}
                className="group flex gap-10 border-t border-border py-9 last:border-b transition-colors duration-150 hover:bg-surface"
              >
                <span className="w-6 shrink-0 pt-0.5 text-xs tabular-nums text-text-dim">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <div>
                  <h3
                    className="mb-2 text-lg font-normal text-text transition-colors duration-150 group-hover:text-accent"
                    style={{ fontFamily: 'var(--font-serif)' }}
                  >
                    {t(`features.${key}.title`)}
                  </h3>
                  <p className="text-sm leading-loose text-text-muted">
                    {t(`features.${key}.desc`)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How to use */}
      <section className="border-y border-border bg-surface px-6 py-28">
        <div className="mx-auto max-w-3xl">
          <div className="mb-16 flex items-center gap-6">
            <span className="text-xs tracking-[0.1em] text-text-dim uppercase">How to use</span>
            <div className="flex-1 border-t border-border" />
          </div>

          <h2
            className="mb-16 text-2xl font-normal text-text"
            style={{ fontFamily: 'var(--font-serif)' }}
          >
            {t('howToUse.title')}
          </h2>

          <div className="grid grid-cols-2 gap-px bg-border lg:grid-cols-4">
            {HOW_TO_USE_STEPS.map((step, index) => (
              <div key={step} className="bg-surface p-8">
                <div
                  className="mb-6 text-4xl font-normal text-text-dim"
                  style={{ fontFamily: 'var(--font-serif)' }}
                >
                  {index + 1}
                </div>
                <p className="mb-3 text-xs tracking-[0.1em] text-text-dim">
                  {t(`howToUse.${step}.label`)}
                </p>
                <p
                  className="text-sm leading-relaxed text-text"
                  style={{ fontFamily: 'var(--font-serif)' }}
                >
                  {t(`howToUse.${step}.text`)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 py-28 text-center">
        <div className="mx-auto max-w-xl">
          <h2
            className="mb-12 text-3xl font-normal text-text"
            style={{ fontFamily: 'var(--font-serif)' }}
          >
            {t('cta.title')}
          </h2>
          <a
            href={DOWNLOAD_URL}
            className="inline-block border border-accent bg-accent px-12 py-4 text-xs tracking-[0.1em] text-white no-underline transition-all duration-200 hover:bg-transparent hover:text-accent uppercase"
          >
            {t('cta.button')}
          </a>
          <p className="mt-6 text-xs tracking-[0.05em] text-text-dim">
            {t('cta.requirements')}
          </p>
        </div>
      </section>

      <Footer />
    </div>
  )
}
