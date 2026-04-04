import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'

const PHRASES = [
  'ログイン機能のバグを修正して',
  'このコンポーネントにテストを書いて',
  'APIレスポンスの型定義を追加して',
]

const TIMINGS = [1000, 2800, 4600]
const LOOP_DELAY = 4000

const BAR_HEIGHTS = [20, 26, 20, 14, 22, 18, 24, 16, 20, 12, 22, 10]

export default function AppDemoSection() {
  const { t } = useTranslation()
  const [visiblePhrases, setVisiblePhrases] = useState(0)
  const timeoutsRef = useRef<ReturnType<typeof setTimeout>[]>([])

  useEffect(() => {
    function schedule() {
      timeoutsRef.current.forEach(clearTimeout)
      timeoutsRef.current = []

      TIMINGS.forEach((delay, i) => {
        const id = setTimeout(() => {
          setVisiblePhrases(i + 1)
        }, delay)
        timeoutsRef.current.push(id)
      })

      const resetId = setTimeout(() => {
        setVisiblePhrases(0)
        const restartId = setTimeout(schedule, 1000)
        timeoutsRef.current.push(restartId)
      }, TIMINGS[TIMINGS.length - 1] + LOOP_DELAY)
      timeoutsRef.current.push(resetId)
    }

    schedule()

    return () => {
      timeoutsRef.current.forEach(clearTimeout)
    }
  }, [])

  return (
    <section className="px-6 pb-24">
      <div className="mx-auto max-w-5xl">
        <div className="flex flex-col items-start gap-12 lg:flex-row lg:items-center">
          {/* Left: description text */}
          <div className="flex-1 min-w-0">
            <p className="mb-4 text-xs tracking-[0.1em] text-text-dim uppercase">
              {t('demo.label')}
            </p>
            <h2
              className="mb-6 text-2xl font-normal leading-relaxed text-text"
              style={{ fontFamily: 'var(--font-serif)' }}
            >
              {t('demo.title')}
            </h2>
            <p className="mb-8 text-sm leading-loose text-text-muted">
              {t('demo.desc')}
            </p>
            <ol className="space-y-4">
              {(['step1', 'step2', 'step3'] as const).map((step, i) => (
                <li key={step} className="flex items-start gap-4">
                  <span
                    className="mt-0.5 shrink-0 text-lg font-normal text-accent"
                    style={{ fontFamily: 'var(--font-serif)' }}
                  >
                    {i + 1}
                  </span>
                  <span className="text-sm leading-loose text-text-muted">
                    {t(`demo.${step}`)}
                  </span>
                </li>
              ))}
            </ol>
          </div>

          {/* Right: Mac window frame */}
          <div className="w-full lg:w-[480px] shrink-0">
            <div
              style={{
                borderRadius: 12,
                boxShadow: '0 8px 40px rgba(0,0,0,0.28)',
                overflow: 'hidden',
              }}
            >
              {/* Title bar */}
              <div
                style={{
                  background: '#2B2B2B',
                  height: 40,
                  display: 'flex',
                  alignItems: 'center',
                  paddingLeft: 14,
                  gap: 8,
                  position: 'relative',
                }}
              >
                <span style={{ width: 12, height: 12, borderRadius: '50%', background: '#FF5F57', display: 'inline-block' }} />
                <span style={{ width: 12, height: 12, borderRadius: '50%', background: '#FEBC2E', display: 'inline-block' }} />
                <span style={{ width: 12, height: 12, borderRadius: '50%', background: '#28C840', display: 'inline-block' }} />
                <span
                  style={{
                    position: 'absolute',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    color: '#9CA3AF',
                    fontSize: 12,
                    fontFamily: 'monospace',
                    userSelect: 'none',
                  }}
                >
                  claude — ~/Develop/lumina-whisper
                </span>
              </div>

              {/* Claude Code body */}
              <div
                style={{
                  background: '#1a1b26',
                  fontFamily: 'monospace',
                  fontSize: 13,
                  color: '#C0CAF5',
                  position: 'relative',
                }}
              >
                {/* Header */}
                <div style={{ padding: '12px 16px 8px', color: '#565f89', fontSize: 12 }}>
                  Claude Code v2.1.92 / Sonnet 4.6 · Claude Pro / ~/Develop/lumina-whisper
                </div>

                {/* Status line */}
                <div
                  style={{
                    background: '#141520',
                    padding: '4px 16px',
                    fontSize: 12,
                    color: '#7aa2f7',
                    display: 'flex',
                    gap: 16,
                  }}
                >
                  <span>3h26m35s ✦</span>
                  <span>⊙ 20:54</span>
                </div>

                {/* Input area */}
                <div style={{ padding: '16px 16px 88px 16px', minHeight: 120 }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <span style={{ color: '#565f89' }}>›</span>
                    {PHRASES.map((phrase, i) => {
                      const visible = i < visiblePhrases
                      const isCurrent = i === visiblePhrases - 1
                      return (
                        <span
                          key={i}
                          style={{
                            opacity: visible ? 1 : 0,
                            transform: visible ? 'translateY(0)' : 'translateY(4px)',
                            transition: 'opacity 300ms ease, transform 300ms ease',
                            color: '#C0CAF5',
                            paddingLeft: 16,
                            display: 'flex',
                            alignItems: 'center',
                          }}
                        >
                          {phrase}
                          {isCurrent && (
                            <span
                              style={{
                                display: 'inline-block',
                                width: 8,
                                height: 14,
                                background: '#7aa2f7',
                                marginLeft: 2,
                                animation: 'blink 1s step-end infinite',
                              }}
                            />
                          )}
                        </span>
                      )
                    })}
                  </div>
                </div>

                {/* Pill overlay */}
                <div
                  style={{
                    position: 'absolute',
                    bottom: 18,
                    left: '50%',
                    transform: 'translateX(-50%)',
                    height: 52,
                    borderRadius: 26,
                    background: 'rgba(28, 28, 32, 0.96)',
                    boxShadow: '0 -4px 14px rgba(0,0,0,0.5)',
                    display: 'flex',
                    alignItems: 'center',
                    paddingLeft: 8,
                    paddingRight: 20,
                    gap: 12,
                    whiteSpace: 'nowrap',
                  }}
                >
                  {/* App icon */}
                  <div
                    style={{
                      width: 36,
                      height: 36,
                      borderRadius: '50%',
                      background: '#1C1C28',
                      overflow: 'hidden',
                      flexShrink: 0,
                    }}
                  >
                    <img src="/icon.png" alt="" width={36} height={36} style={{ display: 'block', transform: 'scale(1.05)' }} />
                  </div>

                  {/* Waveform */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                    {BAR_HEIGHTS.map((h, i) => (
                      <div
                        key={i}
                        style={{
                          width: 3,
                          height: h,
                          borderRadius: 1.5,
                          background: '#ffffff',
                          animation: `waveBar 0.8s ease-in-out infinite`,
                          animationDelay: `${i * 0.067}s`,
                          transformOrigin: 'center',
                        }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        @keyframes waveBar {
          0%, 100% { transform: scaleY(0.35); }
          50% { transform: scaleY(1.0); }
        }
      `}</style>
    </section>
  )
}
