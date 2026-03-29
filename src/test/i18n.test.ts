import { describe, it, expect, beforeEach } from 'vitest'
import i18n from '../i18n'

describe('i18n', () => {
  beforeEach(() => i18n.changeLanguage('ja'))

  it('デフォルト言語は日本語', () => {
    expect(i18n.language).toBe('ja')
  })

  it('日本語でヒーローのキャッチコピーが返る', () => {
    expect(i18n.t('hero.tagline')).toBe('声をテキストに、瞬時に。')
  })

  it('英語に切り替えるとヒーローのキャッチコピーが英語になる', async () => {
    await i18n.changeLanguage('en')
    expect(i18n.t('hero.tagline')).toBe('Voice to text, instantly.')
  })

  it('全翻訳キーが ja と en の両方に存在する', () => {
    const jaKeys = Object.keys(i18n.getResourceBundle('ja', 'translation'))
    const enKeys = Object.keys(i18n.getResourceBundle('en', 'translation'))
    expect(jaKeys.sort()).toEqual(enKeys.sort())
  })
})
