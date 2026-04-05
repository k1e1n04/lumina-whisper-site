import { describe, it, expect, beforeEach, vi } from 'vitest'

const STORAGE_KEY = 'preferred_language'

describe('i18n language preference', () => {
  beforeEach(() => {
    vi.resetModules()
    window.localStorage.clear()
  })

  it('localStorage に保存された言語を初期言語として使う', async () => {
    window.localStorage.setItem(STORAGE_KEY, 'en')
    const { default: i18n } = await import('../i18n')
    expect(i18n.language).toBe('en')
  })

  it('changeLanguage すると localStorage に保存される', async () => {
    const { default: i18n } = await import('../i18n')
    await i18n.changeLanguage('de')
    expect(window.localStorage.getItem(STORAGE_KEY)).toBe('de')
  })

  it('保存済み言語がない場合はブラウザ言語を使う', async () => {
    const { default: i18n } = await import('../i18n')
    expect(i18n.language).toBe('en')
  })

  it('保存済み言語もブラウザ言語も未対応なら英語にフォールバックする', async () => {
    Object.defineProperty(window.navigator, 'languages', {
      configurable: true,
      value: ['es-ES'],
    })
    const { default: i18n } = await import('../i18n')
    expect(i18n.language).toBe('en')
  })
})
