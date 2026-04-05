// src/components/AccuracySection.tsx
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useInView } from '../hooks/useInView'

type BenchmarkSample = {
  id: string
  reference: string
  lumina: string
  apple: string
}

type BenchmarkData = {
  lumina: { cer: number; sampleCount: number }
  apple: { cer: number; sampleCount: number }
  dataset: string
  measuredAt: string
  modelName: string
  samples: BenchmarkSample[]
}

export default function AccuracySection() {
  const { t } = useTranslation()
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.15 })
  const [data, setData] = useState<BenchmarkData | null>(null)

  useEffect(() => {
    fetch('/benchmark-results.json')
      .then((r) => r.json())
      .then((d: BenchmarkData) => setData(d))
      .catch(() => {
        // Graceful degradation: hide section if JSON is unavailable
      })
  }, [])

  if (!data) return null

  const maxCer = Math.max(data.lumina.cer, data.apple.cer)

  return (
    <section className="border-t border-border px-6 py-28">
      <div ref={ref} className="mx-auto max-w-3xl">
        {/* Section header */}
        <div className="mb-16 flex items-center gap-6">
          <span className="text-xs tracking-[0.1em] text-text-dim uppercase">
            {t('accuracy.label')}
          </span>
          <div className="flex-1 border-t border-border" />
        </div>

        <h2
          className="mb-4 text-2xl font-normal text-text"
          style={{ fontFamily: 'var(--font-serif)' }}
        >
          {t('accuracy.title')}
        </h2>
        <p className="mb-16 text-sm text-text-muted">{t('accuracy.subtitle')}</p>

        {/* CER bar comparison */}
        <div className="mb-20 space-y-8">
          {(
            [
              { key: 'lumina', cer: data.lumina.cer },
              { key: 'apple', cer: data.apple.cer },
            ] as const
          ).map(({ key, cer }, i) => (
            <div
              key={key}
              className={`reveal ${inView ? 'in-view' : ''}`}
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <div className="mb-2 flex items-center justify-between">
                <span className="text-sm text-text">
                  {t(`accuracy.${key}`)}
                </span>
                <span
                  className="text-xl font-normal text-accent tabular-nums"
                  style={{ fontFamily: 'var(--font-serif)' }}
                >
                  {cer}%
                </span>
              </div>
              <div className="h-px w-full bg-border">
                <div
                  className="h-px bg-accent transition-all duration-1000 ease-out"
                  style={{ width: inView ? `${(cer / maxCer) * 100}%` : '0%' }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Sample comparisons */}
        {data.samples.length > 0 && (
          <>
            <div className="mb-8 flex items-center gap-6">
              <span className="text-xs tracking-[0.1em] text-text-dim uppercase">
                {t('accuracy.samplesLabel')}
              </span>
              <div className="flex-1 border-t border-border" />
            </div>

            <div className="space-y-0">
              {data.samples.map((sample, i) => {
                const isLuminaCorrect = sample.lumina === sample.reference
                const isAppleCorrect = sample.apple === sample.reference
                return (
                  <div
                    key={sample.id}
                    className={`border-t border-border py-8 last:border-b reveal ${inView ? 'in-view' : ''}`}
                    style={{ animationDelay: `${0.2 + i * 0.08}s` }}
                  >
                    <p className="mb-4 text-xs tabular-nums text-text-dim">
                      {String(i + 1).padStart(2, '0')}
                    </p>
                    <p
                      className="mb-4 text-sm leading-loose text-text-muted"
                      style={{ fontFamily: 'var(--font-serif)' }}
                    >
                      {sample.reference}
                    </p>
                    <div className="grid grid-cols-2 gap-4">
                      {(
                        [
                          {
                            label: t('accuracy.lumina'),
                            text: sample.lumina,
                            correct: isLuminaCorrect,
                          },
                          {
                            label: t('accuracy.apple'),
                            text: sample.apple,
                            correct: isAppleCorrect,
                          },
                        ] as const
                      ).map(({ label, text, correct }) => (
                        <div key={label} className="space-y-1">
                          <p className="text-xs tracking-[0.08em] text-text-dim">
                            {label}
                          </p>
                          <p
                            className={`text-sm leading-loose ${correct ? 'text-text' : 'text-text-muted line-through decoration-accent/60'}`}
                          >
                            {text}
                          </p>
                          <p
                            className={`text-xs ${correct ? 'text-accent' : 'text-text-dim'}`}
                          >
                            {correct ? t('accuracy.correct') : t('accuracy.incorrect')}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )
              })}
            </div>
          </>
        )}

        {/* Data source */}
        <p className="mt-10 text-xs text-text-dim">
          {t('accuracy.source', {
            dataset: data.dataset,
            count: data.lumina.sampleCount,
            date: data.measuredAt,
            model: data.modelName,
          })}
        </p>
      </div>
    </section>
  )
}
