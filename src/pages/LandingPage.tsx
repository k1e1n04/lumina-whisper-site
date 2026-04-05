import { useTranslation } from 'react-i18next'
import { trackDownloadClick } from '../components/GoogleAnalytics'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import AppDemoSection from '../components/AppDemoSection'
import StatsBar from '../components/StatsBar'
import AccuracySection from '../components/AccuracySection'
import UseCasesSection from '../components/UseCasesSection'
import { useInView } from '../hooks/useInView'
import PageSeo from '../components/PageSeo'

const DOWNLOAD_URL = 'https://github.com/k1e1n04/lumina-whisper-site/releases/latest/download/LuminaWhisper.dmg'
const PURCHASE_URL = 'https://buy.polar.sh/polar_cl_XVHFZsZLBBvwWYUgL6Kb9vLzBUM6KsCoGnfA74ZMmXT'

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
  const pricingRows = t('pricingAdvantage.rows', {
    returnObjects: true,
  }) as Array<{ service: string; billing: string; price: string; note: string }>

  const { ref: painRef, inView: painInView } = useInView<HTMLDivElement>({ threshold: 0.15 })
  const { ref: featuresRef, inView: featuresInView } = useInView<HTMLDivElement>({ threshold: 0.05 })
  const { ref: howToUseRef, inView: howToUseInView } = useInView<HTMLDivElement>({ threshold: 0.1 })

  return (
    <div data-testid="landing-page" className="min-h-screen bg-bg">
      <PageSeo page="landing" includeOgImage />
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
          <p className="anim-fade-up anim-fade-up-3 mx-auto mb-8 max-w-md text-base leading-loose text-text-muted">
            {t('hero.subtext')}
          </p>

          {/* Key attributes */}
          <div className="anim-fade-up anim-fade-up-3 mb-10 flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
            {(['外部送信ゼロ', 'Apple Neural Engine', '13言語対応', '商用利用可'] as const).map((text, i) => (
              <span key={text} className="flex items-center gap-5">
                {i > 0 && <span className="text-text-dim" aria-hidden>·</span>}
                <span className="flex items-center gap-1.5 text-xs tracking-[0.08em] text-text-dim">
                  {i === 0 && (
                    <svg
                      className="shield-pulse"
                      width="11"
                      height="12"
                      viewBox="0 0 11 12"
                      fill="none"
                      aria-hidden
                    >
                      <path
                        d="M5.5 1L9.5 2.8V6c0 2.4-1.7 4.1-4 4.9C3.2 10.1 1.5 8.4 1.5 6V2.8L5.5 1z"
                        stroke="currentColor"
                        strokeWidth="1"
                        fill="none"
                      />
                    </svg>
                  )}
                  {text}
                </span>
              </span>
            ))}
          </div>

          <div className="anim-fade-up anim-fade-up-4 flex flex-col items-center gap-4">
            <a
              href={PURCHASE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block border border-accent bg-accent px-10 py-3.5 text-xs tracking-[0.1em] text-white no-underline transition-all duration-200 hover:bg-transparent hover:text-accent uppercase"
            >
              {t('hero.purchase')}
            </a>
            <a
              href={DOWNLOAD_URL}
              onClick={() => trackDownloadClick('hero')}
              className="text-xs tracking-[0.05em] text-text-dim no-underline hover:text-text-muted transition-colors duration-200"
            >
              {t('hero.download')}
            </a>
            <p className="text-xs tracking-[0.05em] text-text-dim">
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
        <div ref={painRef} className="mx-auto max-w-3xl">
          <p
            className={`mb-8 text-sm leading-loose text-text-muted reveal ${painInView ? 'in-view' : ''}`}
          >
            {t('pain.question')}
          </p>
          <ul className="mb-12 space-y-3">
            {(t('pain.items', { returnObjects: true }) as string[]).map((item, i) => (
              <li
                key={item}
                className={`flex items-center gap-3 text-sm text-text-muted reveal ${painInView ? 'in-view' : ''}`}
                style={{ animationDelay: `${0.05 + i * 0.1}s` }}
              >
                <span className="h-px w-4 shrink-0 bg-text-dim" />
                {item}
              </li>
            ))}
          </ul>
          <div
            className={`reveal ${painInView ? 'in-view' : ''} border-l-2 border-accent pl-8`}
            style={{ animationDelay: '0.35s' }}
          >
            <p
              className="text-2xl font-normal leading-relaxed text-text"
              style={{ fontFamily: 'var(--font-serif)' }}
            >
              {t('pain.answer')}
            </p>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="px-6 py-28">
        <div ref={featuresRef} className="mx-auto max-w-3xl">
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
                className={`group flex gap-10 border-t border-border py-9 last:border-b transition-colors duration-150 hover:bg-surface reveal ${featuresInView ? 'in-view' : ''}`}
                style={{ animationDelay: `${index * 0.08}s` }}
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

      <UseCasesSection />

      {/* Pricing advantage */}
      <section className="border-t border-border px-6 py-28">
        <div className="mx-auto max-w-4xl">
          <div className="mb-16 flex items-center gap-6">
            <span className="text-xs tracking-[0.1em] text-text-dim uppercase">Pricing</span>
            <div className="flex-1 border-t border-border" />
          </div>

          <h2
            className="mb-6 text-2xl font-normal text-text"
            style={{ fontFamily: 'var(--font-serif)' }}
          >
            {t('pricingAdvantage.title')}
          </h2>
          <p className="mb-3 text-sm leading-loose text-text-muted">
            {t('pricingAdvantage.lead1')}
          </p>
          <p className="mb-3 text-sm leading-loose text-text-muted">
            {t('pricingAdvantage.lead2')}
          </p>
          <p className="mb-10 text-sm leading-loose text-text-muted">
            {t('pricingAdvantage.lead3')}
          </p>

          <div className="overflow-x-auto border border-border">
            <table className="w-full min-w-[720px] border-collapse text-sm">
              <thead className="bg-surface">
                <tr>
                  <th className="border-b border-border px-4 py-3 text-left font-normal text-text">
                    {t('pricingAdvantage.table.service')}
                  </th>
                  <th className="border-b border-border px-4 py-3 text-left font-normal text-text">
                    {t('pricingAdvantage.table.billing')}
                  </th>
                  <th className="border-b border-border px-4 py-3 text-left font-normal text-text">
                    {t('pricingAdvantage.table.price')}
                  </th>
                  <th className="border-b border-border px-4 py-3 text-left font-normal text-text">
                    {t('pricingAdvantage.table.note')}
                  </th>
                </tr>
              </thead>
              <tbody>
                {pricingRows.map((row) => (
                  <tr key={row.service}>
                    <td className="border-b border-border px-4 py-3 text-text">{row.service}</td>
                    <td className="border-b border-border px-4 py-3 text-text-muted">{row.billing}</td>
                    <td className="border-b border-border px-4 py-3 text-text">{row.price}</td>
                    <td className="border-b border-border px-4 py-3 text-text-muted">{row.note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="mt-4 text-xs tracking-[0.03em] text-text-dim">
            {t('pricingAdvantage.disclaimer')}
          </p>
        </div>
      </section>

      {/* How to use */}
      <section className="border-y border-border bg-surface px-6 py-28">
        <div ref={howToUseRef} className="mx-auto max-w-3xl">
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
              <div
                key={step}
                className={`bg-surface p-8 reveal ${howToUseInView ? 'in-view' : ''}`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
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

      <StatsBar />

      <AccuracySection />

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
            href={PURCHASE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block border border-accent bg-accent px-12 py-4 text-xs tracking-[0.1em] text-white no-underline transition-all duration-200 hover:bg-transparent hover:text-accent uppercase"
          >
            {t('cta.purchase')}
          </a>
          <p className="mt-4">
            <a
              href={DOWNLOAD_URL}
              onClick={() => trackDownloadClick('cta')}
              className="text-xs tracking-[0.05em] text-text-dim no-underline hover:text-text-muted transition-colors duration-200"
            >
              {t('cta.download')}
            </a>
          </p>
          <p className="mt-4 text-xs tracking-[0.05em] text-text-dim">
            {t('cta.requirements')}
          </p>
          <p className="mt-2 text-xs tracking-[0.05em] text-text-dim">
            {t('cta.license')}
          </p>

        </div>
      </section>

      <Footer />
    </div>
  )
}
