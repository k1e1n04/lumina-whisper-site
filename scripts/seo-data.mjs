const BASE_URL = 'https://lumina-whisper.com'

export const SEO_DATA = {
  '/': {
    title: 'Mac 音声入力アプリ — オフライン・高精度 | Lumina Whisper',
    description:
      'Lumina Whisper は Mac 専用の音声入力アプリ。完全ローカル処理でプライバシーを守りながら高精度な文字起こしを実現。Apple Silicon 最適化、インターネット不要で高速動作。',
    ogImage: `${BASE_URL}/ogp.png`,
    canonical: `${BASE_URL}/`,
  },
  '/release': {
    title: 'リリースノート | Lumina Whisper',
    description: 'Lumina Whisper の更新履歴。新機能・バグ修正の詳細を版ごとに記載。',
    canonical: `${BASE_URL}/release/`,
  },
  '/guide/install': {
    title: 'インストール | Lumina Whisper ガイド',
    description:
      'macOS 14 以降の Apple Silicon Mac への Lumina Whisper インストール手順。DMGダウンロードからマイク権限設定まで。',
    canonical: `${BASE_URL}/guide/install/`,
  },
  '/guide/setup': {
    title: '初期設定 | Lumina Whisper ガイド',
    description:
      'Lumina Whisper の初回セットアップ手順。ホットキー確認・音声認識モデルのダウンロード方法を解説。',
    canonical: `${BASE_URL}/guide/setup/`,
  },
  '/guide/usage': {
    title: '基本的な使い方 | Lumina Whisper ガイド',
    description:
      'Option+Space を押すだけで音声入力を開始。テキスト入力フィールドへの自動挿入まで4ステップで解説。',
    canonical: `${BASE_URL}/guide/usage/`,
  },
  '/guide/settings': {
    title: '設定項目 | Lumina Whisper ガイド',
    description: 'Lumina Whisper の設定項目一覧。モデル選択・認識言語・ホットキー・LLM後処理の使い方。',
    canonical: `${BASE_URL}/guide/settings/`,
  },
  '/guide/faq': {
    title: 'よくある質問 | Lumina Whisper ガイド',
    description:
      'Lumina Whisper に関するよくある質問。対応 macOS・Intel Mac・プライバシー・ホットキーの問題について。',
    canonical: `${BASE_URL}/guide/faq/`,
  },
  '/guide/troubleshoot': {
    title: 'トラブルシューティング | Lumina Whisper ガイド',
    description: 'Lumina Whisper のトラブル対処法。マイク未認識・ホットキー無効・テキスト未挿入の解決手順。',
    canonical: `${BASE_URL}/guide/troubleshoot/`,
  },
}

/**
 * Generate helmet HTML tags string for a given route.
 */
export function buildHelmetTags(url, jsonLd = null) {
  const seo = SEO_DATA[url]
  if (!seo) return ''

  const tags = [
    `<title>${seo.title}</title>`,
    `<meta name="description" content="${seo.description}" />`,
  ]

  if (seo.canonical) {
    tags.push(`<link rel="canonical" href="${seo.canonical}" />`)
  }

  if (seo.ogImage) {
    tags.push(`<meta property="og:title" content="${seo.title}" />`)
    tags.push(`<meta property="og:description" content="${seo.description}" />`)
    tags.push(`<meta property="og:type" content="website" />`)
    tags.push(`<meta property="og:url" content="${seo.canonical}" />`)
    tags.push(`<meta property="og:image" content="${seo.ogImage}" />`)
    tags.push(`<meta name="twitter:card" content="summary_large_image" />`)
    tags.push(`<meta name="twitter:title" content="${seo.title}" />`)
    tags.push(`<meta name="twitter:description" content="${seo.description}" />`)
    tags.push(`<meta name="twitter:image" content="${seo.ogImage}" />`)
    tags.push(`<link rel="alternate" hreflang="ja" href="${seo.canonical}" />`)
    tags.push(`<link rel="alternate" hreflang="en" href="${seo.canonical}" />`)
    tags.push(`<link rel="alternate" hreflang="x-default" href="${seo.canonical}" />`)
  }

  if (jsonLd) {
    tags.push(`<script type="application/ld+json">${JSON.stringify(jsonLd)}</script>`)
  }

  return tags.join('\n    ')
}

export const LANDING_JSON_LD = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Lumina Whisper',
  operatingSystem: 'macOS 14.0+',
  applicationCategory: 'UtilitiesApplication',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'JPY',
  },
  description:
    'Mac 専用の音声入力アプリ。完全ローカル処理でプライバシーを守りながら高精度な文字起こしを実現。Apple Silicon 最適化。',
  url: `${BASE_URL}/`,
  downloadUrl:
    'https://github.com/k1e1n04/lumina-whisper-site/releases/latest/download/LuminaWhisper.dmg',
  softwareVersion: '0.3.0',
  author: {
    '@type': 'Person',
    name: 'KenIshii',
  },
}
