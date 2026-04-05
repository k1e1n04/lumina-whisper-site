import { useTranslation } from 'react-i18next'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import PageSeo from '../components/PageSeo'

const RELEASES = [
  {
    version: '0.4.1',
    date: '2026-04-06',
    key: 'v041',
    features: [] as string[],
    fixes: ['llmConversationalResponse'],
  },
  {
    version: '0.4.0',
    date: '2026-04-06',
    key: 'v040',
    features: [
      'mlxLlmBackend',
      'llmModelManagerUi',
      'onboardingLlmDownloadStep',
      'newReplacementPresets',
    ] as string[],
    fixes: ['llmPromptRefinement', 'onboardingDownloadTaskCancellation', 'agileKatakanaCorrection'],
  },
  {
    version: '0.3.2',
    date: '2026-04-06',
    key: 'v032',
    features: [] as string[],
    fixes: ['accuracyImprovements'],
  },
  {
    version: '0.3.1',
    date: '2026-04-05',
    key: 'v031',
    features: [] as string[],
    fixes: ['partialWordReplacement'],
  },
  {
    version: '0.3.0',
    date: '2026-04-05',
    key: 'v030',
    features: ['sparkleAutoUpdate', 'directDistributionOnly', 'appcastPipeline'],
    fixes: [] as string[],
  },
  {
    version: '0.2.0',
    date: '2026-04-04',
    key: 'v020',
    features: [
      'onboardingWizard',
      'warmupOverlay',
      'accessibilityLanguageStep',
      'defaultFnHotkey',
      'multilingualSupport',
    ],
    fixes: [
      'micPermissionOnLaunch',
      'silenceDetection',
      'pasteDelay',
      'modelInit',
      'onboardingHitTest',
    ] as string[],
  },
  {
    version: '0.1.0',
    date: '2026-04-02',
    key: 'v010',
    features: [
      'hotkeyInput',
      'whisperkitEngine',
      'textInsertion',
      'modelSelection',
      'llmPostProcessing',
      'replacements',
      'dictionary',
      'history',
    ],
    fixes: [] as string[],
  },
] as const

export default function ReleasePage() {
  const { t } = useTranslation()

  return (
    <div className="min-h-screen bg-bg">
      <PageSeo page="release" />
      <Navbar />

      <main className="mx-auto max-w-3xl px-6 pt-28 pb-24">
        <p className="mb-4 text-xs tracking-[0.1em] text-text-dim uppercase">
          {t('release.subtitle')}
        </p>
        <h1 className="mb-16 font-serif text-4xl font-normal text-text" style={{ fontFamily: 'var(--font-serif)' }}>
          {t('release.title')}
        </h1>

        <div className="space-y-16">
          {RELEASES.map((release) => (
            <section key={release.version}>
              <div className="mb-8 flex items-baseline gap-4 border-b border-border pb-4">
                <h2 className="text-xl font-semibold text-text">v{release.version}</h2>
                <span className="text-xs text-text-dim">{release.date}</span>
              </div>

              {release.features.length > 0 && (
                <div className="mb-6">
                  <h3 className="mb-3 text-xs tracking-[0.1em] text-accent uppercase">
                    {t('release.newFeatures')}
                  </h3>
                  <ul className="space-y-2">
                    {release.features.map((key) => (
                      <li key={key} className="flex items-start gap-3 text-sm text-text-muted">
                        <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-accent" />
                        {t(`release.${release.key}.features.${key}`)}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {release.fixes.length > 0 && (
                <div>
                  <h3 className="mb-3 text-xs tracking-[0.1em] text-text-dim uppercase">
                    {t('release.bugFixes')}
                  </h3>
                  <ul className="space-y-2">
                    {release.fixes.map((key) => (
                      <li key={key} className="flex items-start gap-3 text-sm text-text-muted">
                        <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-border" />
                        {t(`release.${release.key}.fixes.${key}`)}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </section>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  )
}
