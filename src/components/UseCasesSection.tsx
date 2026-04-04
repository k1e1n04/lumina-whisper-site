import { useState } from 'react'
import { useTranslation } from 'react-i18next'

const TABS = ['tab2', 'tab3', 'tab1'] as const

function CodeEditorMock() {
  const { t } = useTranslation()
  return (
    <div
      style={{
        borderRadius: 10,
        overflow: 'hidden',
        boxShadow: '0 4px 24px rgba(0,0,0,0.22)',
        fontFamily: 'monospace',
        fontSize: 12,
      }}
    >
      <div
        style={{
          background: '#1e1e2e',
          height: 36,
          display: 'flex',
          alignItems: 'center',
          paddingLeft: 12,
          gap: 6,
        }}
      >
        <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#FF5F57', display: 'inline-block' }} />
        <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#FEBC2E', display: 'inline-block' }} />
        <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#28C840', display: 'inline-block' }} />
        <span style={{ marginLeft: 8, color: '#565f89', fontSize: 11 }}>LuminaWhisper.swift</span>
      </div>
      <div style={{ background: '#1a1b26', padding: '14px 16px', color: '#C0CAF5', lineHeight: 1.7 }}>
        <div style={{ color: '#565f89' }}>{'// func transcribe(_ audio: AVAudioBuffer) {'}</div>
        <div><span style={{ color: '#bb9af7' }}>func</span> <span style={{ color: '#7aa2f7' }}>transcribe</span>{'(_ audio: AVAudioBuffer) {'}</div>
        <div style={{ paddingLeft: 20 }}>
          <span style={{ color: '#565f89' }}>{'// '}</span>
          <span style={{ color: '#9ece6a' }}>{t('useCases.mockCode.comment')}</span>
          <span
            style={{
              display: 'inline-block',
              width: 7,
              height: 13,
              background: '#7aa2f7',
              marginLeft: 2,
              verticalAlign: 'middle',
              animation: 'blink 1s step-end infinite',
            }}
          />
        </div>
        <div style={{ paddingLeft: 20, color: '#f7768e' }}>{'engine.process(audio)'}</div>
        <div>{'}'}</div>
      </div>
      <style>{`
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
      `}</style>
    </div>
  )
}

function NotionMock() {
  const { t } = useTranslation()
  return (
    <div
      style={{
        borderRadius: 10,
        overflow: 'hidden',
        boxShadow: '0 4px 24px rgba(0,0,0,0.12)',
        background: '#ffffff',
        fontFamily: 'var(--font-sans)',
      }}
    >
      <div
        style={{
          background: '#f7f7f5',
          height: 36,
          display: 'flex',
          alignItems: 'center',
          paddingLeft: 12,
          gap: 6,
          borderBottom: '1px solid #e8e8e4',
        }}
      >
        <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#e0e0df', display: 'inline-block' }} />
        <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#e0e0df', display: 'inline-block' }} />
        <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#e0e0df', display: 'inline-block' }} />
        <span style={{ marginLeft: 8, color: '#9b9b9b', fontSize: 11 }}>{t('useCases.mockNotion.windowTitle')}</span>
      </div>
      <div style={{ padding: '16px 20px', color: '#1A1C2E', lineHeight: 1.8 }}>
        <p style={{ fontSize: 16, fontWeight: 600, marginBottom: 10 }}>{t('useCases.mockNotion.title')}</p>
        <p style={{ fontSize: 13, color: '#6b6b6b', marginBottom: 4 }}>{t('useCases.mockNotion.attendees')}</p>
        <div style={{ borderLeft: '3px solid #DDE1EF', paddingLeft: 12, marginTop: 8 }}>
          <p style={{ fontSize: 13, color: '#1A1C2E', marginBottom: 4 }}>
            {t('useCases.mockNotion.item1')}
          </p>
          <p style={{ fontSize: 13, color: '#1A1C2E', marginBottom: 0, display: 'flex', alignItems: 'center', gap: 4 }}>
            {t('useCases.mockNotion.item2')}
            <span
              style={{
                display: 'inline-block',
                width: 7,
                height: 13,
                background: '#2B2D5F',
                verticalAlign: 'middle',
                animation: 'blink2 1s step-end infinite',
              }}
            />
          </p>
        </div>
      </div>
      <style>{`
        @keyframes blink2 {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
      `}</style>
    </div>
  )
}

function SlackMock() {
  const { t } = useTranslation()
  return (
    <div
      style={{
        borderRadius: 10,
        overflow: 'hidden',
        boxShadow: '0 4px 24px rgba(0,0,0,0.18)',
        fontFamily: 'var(--font-sans)',
      }}
    >
      <div
        style={{
          background: '#3f0f40',
          height: 36,
          display: 'flex',
          alignItems: 'center',
          paddingLeft: 14,
          gap: 6,
        }}
      >
        <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#FF5F57', display: 'inline-block' }} />
        <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#FEBC2E', display: 'inline-block' }} />
        <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#28C840', display: 'inline-block' }} />
        <span style={{ marginLeft: 8, color: '#c49fc4', fontSize: 11 }}># general</span>
      </div>
      <div style={{ background: '#1a1d21', padding: '14px 16px' }}>
        <div style={{ display: 'flex', gap: 10, marginBottom: 12 }}>
          <div
            style={{
              width: 32,
              height: 32,
              borderRadius: 6,
              background: '#2B2D5F',
              flexShrink: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#fff',
              fontSize: 13,
              fontWeight: 600,
            }}
          >
            K
          </div>
          <div>
            <p style={{ color: '#d1d2d3', fontSize: 13, fontWeight: 600, margin: 0 }}>Ken</p>
            <p style={{ color: '#c9cacb', fontSize: 13, margin: '2px 0 0' }}>
              {t('useCases.mockSlack.message')}
            </p>
          </div>
        </div>
        <div
          style={{
            background: '#222529',
            border: '1px solid #393b3e',
            borderRadius: 8,
            padding: '8px 12px',
            display: 'flex',
            alignItems: 'center',
            gap: 8,
          }}
        >
          <span style={{ color: '#7b7e83', fontSize: 13, flex: 1 }}>
            {t('useCases.mockSlack.typing')}
            <span
              style={{
                display: 'inline-block',
                width: 7,
                height: 13,
                background: '#7b7e83',
                marginLeft: 2,
                verticalAlign: 'middle',
                animation: 'blink3 1s step-end infinite',
              }}
            />
          </span>
        </div>
      </div>
      <style>{`
        @keyframes blink3 {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
      `}</style>
    </div>
  )
}

const MOCKS = [NotionMock, SlackMock, CodeEditorMock]

export default function UseCasesSection() {
  const { t } = useTranslation()
  const [activeTab, setActiveTab] = useState(0)

  const ActiveMock = MOCKS[activeTab]

  return (
    <section className="px-6 py-28">
      <div className="mx-auto max-w-3xl">
        <div className="mb-16 flex items-center gap-6">
          <span className="text-xs tracking-[0.1em] text-text-dim uppercase">
            {t('useCases.label')}
          </span>
          <div className="flex-1 border-t border-border" />
        </div>

        <h2
          className="mb-12 text-2xl font-normal text-text"
          style={{ fontFamily: 'var(--font-serif)' }}
        >
          {t('useCases.title')}
        </h2>

        {/* Tab bar */}
        <div className="mb-10 flex gap-2">
          {TABS.map((tab, i) => (
            <button
              key={tab}
              onClick={() => setActiveTab(i)}
              className={[
                'px-5 py-2 text-xs tracking-[0.08em] transition-all duration-150 rounded-full border',
                activeTab === i
                  ? 'bg-accent border-accent text-white'
                  : 'bg-transparent border-border text-text-muted hover:border-accent hover:text-accent',
              ].join(' ')}
              style={{ cursor: 'pointer' }}
            >
              {t(`useCases.${tab}`)}
            </button>
          ))}
        </div>

        {/* Tab content */}
        <div
          className="flex flex-col items-start gap-10 lg:flex-row lg:items-start"
          style={{ opacity: 1, transition: 'opacity 200ms ease' }}
        >
          {/* Left: text */}
          <div className="flex-1 min-w-0">
            <h3
              className="mb-4 text-lg font-normal leading-relaxed text-text"
              style={{ fontFamily: 'var(--font-serif)' }}
            >
              {t(`useCases.${TABS[activeTab]}Title`)}
            </h3>
            <p className="mb-6 text-sm leading-loose text-text-muted">
              {t(`useCases.${TABS[activeTab]}Desc`)}
            </p>
            <p className="text-xs tracking-[0.06em] text-text-dim">
              {t(`useCases.${TABS[activeTab]}Apps`)}
            </p>
          </div>

          {/* Right: mock */}
          <div className="w-full lg:w-[360px] shrink-0">
            <ActiveMock />
          </div>
        </div>
      </div>
    </section>
  )
}
