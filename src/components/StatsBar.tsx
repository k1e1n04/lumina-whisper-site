import { useTranslation } from 'react-i18next'

export default function StatsBar() {
  const { t } = useTranslation()

  return (
    <section className="border-y border-border bg-surface px-6 py-20">
      <div className="mx-auto max-w-3xl">
        <div className="mb-12 flex items-center gap-6">
          <span className="text-xs tracking-[0.1em] text-text-dim uppercase">
            {t('stats.label')}
          </span>
          <div className="flex-1 border-t border-border" />
        </div>

        <div className="grid grid-cols-2 gap-px bg-border lg:grid-cols-4">
          {/* 13 言語対応 */}
          <div className="bg-surface p-8">
            <div
              className="mb-3 text-4xl font-normal text-accent"
              style={{ fontFamily: 'var(--font-serif)' }}
            >
              13
            </div>
            <p className="mb-1 text-sm font-normal text-text">{t('stats.languages')}</p>
            <p className="text-xs text-text-dim">{t('stats.languagesSub')}</p>
          </div>

          {/* 外部送信ゼロ */}
          <div className="bg-surface p-8">
            <div
              className="mb-3 text-2xl font-normal leading-snug text-accent"
              style={{ fontFamily: 'var(--font-serif)' }}
            >
              {t('stats.privacy')}
            </div>
            <p className="mb-1 text-sm font-normal text-text">{t('stats.privacySub')}</p>
            <p className="text-xs text-text-dim">{t('stats.privacySub2')}</p>
          </div>

          {/* Neural Engine */}
          <div className="bg-surface p-8">
            <div
              className="mb-3 text-xl font-normal text-text-dim"
              style={{ fontFamily: 'monospace', letterSpacing: '0.02em' }}
            >
              Neural Engine
            </div>
            <p
              className="mb-1 text-xl font-normal text-accent"
              style={{ fontFamily: 'var(--font-serif)' }}
            >
              {t('stats.engine')}
            </p>
            <p className="text-xs text-text-dim">{t('stats.engineSub')}</p>
          </div>

          {/* 4 モデル */}
          <div className="bg-surface p-8">
            <div
              className="mb-3 text-4xl font-normal text-accent"
              style={{ fontFamily: 'var(--font-serif)' }}
            >
              4
            </div>
            <p className="mb-1 text-sm font-normal text-text">{t('stats.models')}</p>
            <p className="text-xs text-text-dim">{t('stats.modelsSub')}</p>
          </div>
        </div>
      </div>
    </section>
  )
}
