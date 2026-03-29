import { useTranslation } from 'react-i18next'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const DOWNLOAD_URL = 'https://github.com/ishiiken/lumina-whisper/releases/latest/download/LuminaWhisper.dmg'

const FEATURES = [
  { key: 'hotkey' },
  { key: 'local' },
  { key: 'silicon' },
  { key: 'llm' },
] as const

const HOW_TO_USE_STEPS = ['step1', 'step2', 'step3', 'step4'] as const

export default function LandingPage() {
  const { t } = useTranslation()

  return (
    <div data-testid="landing-page" className="min-h-screen bg-[#0c0b09]">
      <Navbar />

      {/* Hero */}
      <section className="relative flex min-h-screen items-center justify-center overflow-hidden px-6 pt-14">
        {/* Faint horizontal rule grid */}
        <div className="pointer-events-none absolute inset-0" aria-hidden>
          {[20, 35, 50, 65, 80].map((pct) => (
            <div
              key={pct}
              className="absolute w-full border-t border-[#e8ddd0]/[0.03]"
              style={{ top: `${pct}%` }}
            />
          ))}
          {/* Subtle radial glow behind text */}
          <div
            className="absolute left-1/2 top-1/2 h-[600px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-[0.06]"
            style={{ background: 'radial-gradient(ellipse, #c8955f 0%, transparent 70%)' }}
          />
        </div>

        <div className="relative mx-auto max-w-3xl text-center">
          <p className="anim-fade-up anim-fade-up-1 mb-10 text-[10px] tracking-[0.4em] text-[#3a312a] uppercase">
            Mac Voice Recognition
          </p>
          <h1
            className="anim-fade-up anim-fade-up-2 mb-8 font-serif text-5xl leading-[1.3] font-normal text-[#e8ddd0] sm:text-6xl"
            style={{ fontFamily: 'var(--font-serif)' }}
          >
            {t('hero.tagline')}
          </h1>
          <p className="anim-fade-up anim-fade-up-3 mx-auto mb-14 max-w-md text-base leading-loose text-[#6b5f52]">
            {t('hero.subtext')}
          </p>
          <div className="anim-fade-up anim-fade-up-4">
            <a
              href={DOWNLOAD_URL}
              className="inline-block border border-[#c8955f] px-10 py-3.5 text-xs tracking-[0.25em] text-[#c8955f] no-underline transition-all duration-200 hover:bg-[#c8955f] hover:text-[#0c0b09] uppercase"
            >
              {t('hero.download')}
            </a>
            <p className="mt-6 text-[10px] tracking-[0.2em] text-[#3a312a]">
              {t('hero.requirements')}
            </p>
          </div>
        </div>

        {/* Bottom fade */}
        <div
          className="pointer-events-none absolute bottom-0 left-0 right-0 h-32"
          style={{ background: 'linear-gradient(to bottom, transparent, #0c0b09)' }}
          aria-hidden
        />
      </section>

      {/* Features */}
      <section className="px-6 py-28">
        <div className="mx-auto max-w-3xl">
          <div className="mb-16 flex items-center gap-6">
            <span className="text-[10px] tracking-[0.4em] text-[#3a312a] uppercase">Features</span>
            <div className="flex-1 border-t border-[#272218]" />
          </div>

          <h2
            className="mb-16 text-2xl font-normal text-[#e8ddd0]"
            style={{ fontFamily: 'var(--font-serif)' }}
          >
            {t('features.title')}
          </h2>

          <div>
            {FEATURES.map(({ key }, index) => (
              <div
                key={key}
                className="group flex gap-10 border-t border-[#272218] py-9 last:border-b transition-colors duration-150 hover:bg-[#131210]"
              >
                <span className="w-6 shrink-0 pt-0.5 text-[10px] tabular-nums text-[#3a312a]">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <div>
                  <h3
                    className="mb-2 text-lg font-normal text-[#e8ddd0] transition-colors duration-150 group-hover:text-[#c8955f]"
                    style={{ fontFamily: 'var(--font-serif)' }}
                  >
                    {t(`features.${key}.title`)}
                  </h3>
                  <p className="text-sm leading-loose text-[#6b5f52]">
                    {t(`features.${key}.desc`)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How to use */}
      <section className="border-y border-[#272218] bg-[#0f0d0b] px-6 py-28">
        <div className="mx-auto max-w-3xl">
          <div className="mb-16 flex items-center gap-6">
            <span className="text-[10px] tracking-[0.4em] text-[#3a312a] uppercase">How to use</span>
            <div className="flex-1 border-t border-[#272218]" />
          </div>

          <h2
            className="mb-16 text-2xl font-normal text-[#e8ddd0]"
            style={{ fontFamily: 'var(--font-serif)' }}
          >
            {t('howToUse.title')}
          </h2>

          <div className="grid grid-cols-2 gap-px bg-[#272218] lg:grid-cols-4">
            {HOW_TO_USE_STEPS.map((step, index) => (
              <div key={step} className="bg-[#0f0d0b] p-8">
                <div
                  className="mb-6 text-4xl font-normal text-[#272218]"
                  style={{ fontFamily: 'var(--font-serif)' }}
                >
                  {index + 1}
                </div>
                <p className="mb-3 text-[10px] tracking-[0.25em] text-[#3a312a]">
                  {t(`howToUse.${step}.label`)}
                </p>
                <p
                  className="text-sm leading-relaxed text-[#e8ddd0]"
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
            className="mb-12 text-3xl font-normal text-[#e8ddd0]"
            style={{ fontFamily: 'var(--font-serif)' }}
          >
            {t('cta.title')}
          </h2>
          <a
            href={DOWNLOAD_URL}
            className="inline-block border border-[#c8955f] bg-[#c8955f] px-12 py-4 text-xs tracking-[0.25em] text-[#0c0b09] no-underline transition-all duration-200 hover:bg-transparent hover:text-[#c8955f] uppercase"
          >
            {t('cta.button')}
          </a>
          <p className="mt-6 text-[10px] tracking-[0.2em] text-[#3a312a]">
            {t('cta.requirements')}
          </p>
        </div>
      </section>

      <Footer />
    </div>
  )
}
