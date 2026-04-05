const BASE_URL = 'https://lumina-whisper.com'
const SUPPORTED_LANGUAGES = ['ja', 'en', 'zh', 'ko', 'fr', 'de']
const DEFAULT_LANGUAGE = 'en'

const PAGE_PATHS = {
  landing: '/',
  release: '/release',
  privacy: '/privacy',
  guideInstall: '/guide/install',
  guideSetup: '/guide/setup',
  guideUsage: '/guide/usage',
  guideSettings: '/guide/settings',
  guideFaq: '/guide/faq',
  guideTroubleshoot: '/guide/troubleshoot',
}

const SEO_METADATA = {
  en: {
    landing: {
      title: 'Mac voice typing app - offline and accurate | Lumina Whisper',
      description:
        'Lumina Whisper is a voice typing app for Mac. Fully local processing keeps your audio private while delivering fast and accurate transcription on Apple Silicon.',
    },
    release: {
      title: 'Release Notes | Lumina Whisper',
      description: 'Version history for Lumina Whisper with new features, fixes, and updates.',
    },
    privacy: {
      title: 'Privacy Policy | Lumina Whisper',
      description: 'Privacy policy for Lumina Whisper.',
    },
    guideInstall: {
      title: 'Installation | Lumina Whisper Guide',
      description:
        'Install Lumina Whisper on Apple Silicon Macs running macOS 14 or later, from DMG download to microphone permissions.',
    },
    guideSetup: {
      title: 'Initial Setup | Lumina Whisper Guide',
      description:
        'First-run setup for Lumina Whisper, including hotkey check and speech model download.',
    },
    guideUsage: {
      title: 'Basic Usage | Lumina Whisper Guide',
      description:
        'Start voice typing and insert text automatically in four simple steps with Lumina Whisper.',
    },
    guideSettings: {
      title: 'Settings | Lumina Whisper Guide',
      description:
        'Overview of Lumina Whisper settings: model, recognition language, hotkey, and LLM post-processing.',
    },
    guideFaq: {
      title: 'FAQ | Lumina Whisper Guide',
      description:
        'Frequently asked questions about supported macOS versions, Intel Mac support, privacy, and hotkey issues.',
    },
    guideTroubleshoot: {
      title: 'Troubleshooting | Lumina Whisper Guide',
      description:
        'Troubleshooting for microphone detection, hotkey issues, and text insertion problems in Lumina Whisper.',
    },
  },
  ja: {
    landing: {
      title: 'Mac 音声入力アプリ — オフライン・高精度 | Lumina Whisper',
      description:
        'Lumina Whisper は Mac 専用の音声入力アプリ。完全ローカル処理でプライバシーを守りながら高精度な文字起こしを実現。Apple Silicon 最適化、インターネット不要で高速動作。',
    },
    release: {
      title: 'リリースノート | Lumina Whisper',
      description: 'Lumina Whisper の更新履歴。新機能・バグ修正の詳細を版ごとに記載。',
    },
    privacy: {
      title: 'プライバシーポリシー | Lumina Whisper',
      description: 'Lumina Whisper のプライバシーポリシー',
    },
    guideInstall: {
      title: 'インストール | Lumina Whisper ガイド',
      description:
        'macOS 14 以降の Apple Silicon Mac への Lumina Whisper インストール手順。DMGダウンロードからマイク権限設定まで。',
    },
    guideSetup: {
      title: '初期設定 | Lumina Whisper ガイド',
      description:
        'Lumina Whisper の初回セットアップ手順。ホットキー確認・音声認識モデルのダウンロード方法を解説。',
    },
    guideUsage: {
      title: '基本的な使い方 | Lumina Whisper ガイド',
      description:
        'Fn キーを押すだけで音声入力を開始。テキスト入力フィールドへの自動挿入まで4ステップで解説。',
    },
    guideSettings: {
      title: '設定項目 | Lumina Whisper ガイド',
      description: 'Lumina Whisper の設定項目一覧。モデル選択・認識言語・ホットキー・LLM後処理の使い方。',
    },
    guideFaq: {
      title: 'よくある質問 | Lumina Whisper ガイド',
      description:
        'Lumina Whisper に関するよくある質問。対応 macOS・Intel Mac・プライバシー・ホットキーの問題について。',
    },
    guideTroubleshoot: {
      title: 'トラブルシューティング | Lumina Whisper ガイド',
      description: 'Lumina Whisper のトラブル対処法。マイク未認識・ホットキー無効・テキスト未挿入の解決手順。',
    },
  },
  zh: {
    landing: {
      title: 'Mac 语音输入应用 - 离线高精度 | Lumina Whisper',
      description:
        'Lumina Whisper 是一款 Mac 语音输入应用。全程本地处理，保护隐私，同时在 Apple Silicon 上实现快速高精度转写。',
    },
    release: {
      title: '发行说明 | Lumina Whisper',
      description: 'Lumina Whisper 的更新记录，包含新功能与修复内容。',
    },
    privacy: {
      title: '隐私政策 | Lumina Whisper',
      description: 'Lumina Whisper 的隐私政策。',
    },
    guideInstall: {
      title: '安装 | Lumina Whisper 指南',
      description: '在 macOS 14 及以上的 Apple Silicon Mac 上安装 Lumina Whisper 的完整步骤。',
    },
    guideSetup: {
      title: '初始设置 | Lumina Whisper 指南',
      description: 'Lumina Whisper 首次设置步骤，包括快捷键确认与语音模型下载。',
    },
    guideUsage: {
      title: '基本用法 | Lumina Whisper 指南',
      description: '通过四个步骤开始语音输入，并自动插入文本。',
    },
    guideSettings: {
      title: '设置项目 | Lumina Whisper 指南',
      description: 'Lumina Whisper 设置总览：模型、识别语言、快捷键与 LLM 后处理。',
    },
    guideFaq: {
      title: '常见问题 | Lumina Whisper 指南',
      description: '关于支持系统、Intel Mac、隐私与快捷键问题的常见问答。',
    },
    guideTroubleshoot: {
      title: '故障排除 | Lumina Whisper 指南',
      description: '处理麦克风识别、快捷键无效、文本未插入等问题的步骤。',
    },
  },
  ko: {
    landing: {
      title: 'Mac 음성 입력 앱 - 오프라인 고정확도 | Lumina Whisper',
      description:
        'Lumina Whisper는 Mac용 음성 입력 앱입니다. 완전 로컬 처리로 개인정보를 보호하면서 Apple Silicon에서 빠르고 정확한 받아쓰기를 제공합니다.',
    },
    release: {
      title: '릴리즈 노트 | Lumina Whisper',
      description: 'Lumina Whisper의 업데이트 기록과 신규 기능, 버그 수정 내역입니다.',
    },
    privacy: {
      title: '개인정보 처리방침 | Lumina Whisper',
      description: 'Lumina Whisper 개인정보 처리방침입니다.',
    },
    guideInstall: {
      title: '설치 | Lumina Whisper 가이드',
      description: 'macOS 14 이상 Apple Silicon Mac에 Lumina Whisper를 설치하는 방법입니다.',
    },
    guideSetup: {
      title: '초기 설정 | Lumina Whisper 가이드',
      description: '핫키 확인과 음성 모델 다운로드를 포함한 초기 설정 절차입니다.',
    },
    guideUsage: {
      title: '기본 사용법 | Lumina Whisper 가이드',
      description: '4단계로 음성 입력을 시작하고 텍스트를 자동 삽입하는 방법을 안내합니다.',
    },
    guideSettings: {
      title: '설정 항목 | Lumina Whisper 가이드',
      description: '모델, 인식 언어, 핫키, LLM 후처리 등 설정 항목을 설명합니다.',
    },
    guideFaq: {
      title: '자주 묻는 질문 | Lumina Whisper 가이드',
      description: '지원 macOS, Intel Mac, 개인정보, 핫키 관련 자주 묻는 질문입니다.',
    },
    guideTroubleshoot: {
      title: '문제 해결 | Lumina Whisper 가이드',
      description: '마이크 인식, 핫키 동작, 텍스트 삽입 문제 해결 방법입니다.',
    },
  },
  fr: {
    landing: {
      title: 'App de saisie vocale Mac - hors ligne et précise | Lumina Whisper',
      description:
        'Lumina Whisper est une application de saisie vocale pour Mac. Traitement 100 % local pour protéger la vie privée avec une transcription rapide et précise sur Apple Silicon.',
    },
    release: {
      title: 'Notes de version | Lumina Whisper',
      description: 'Historique des versions de Lumina Whisper avec nouveautés et corrections.',
    },
    privacy: {
      title: 'Politique de confidentialité | Lumina Whisper',
      description: 'Politique de confidentialité de Lumina Whisper.',
    },
    guideInstall: {
      title: 'Installation | Guide Lumina Whisper',
      description:
        'Guide d’installation de Lumina Whisper sur Mac Apple Silicon sous macOS 14 ou version ultérieure.',
    },
    guideSetup: {
      title: 'Configuration initiale | Guide Lumina Whisper',
      description:
        'Configuration initiale de Lumina Whisper, y compris la vérification du raccourci et le téléchargement du modèle.',
    },
    guideUsage: {
      title: 'Utilisation de base | Guide Lumina Whisper',
      description: 'Commencez la saisie vocale et l’insertion automatique du texte en quatre étapes.',
    },
    guideSettings: {
      title: 'Paramètres | Guide Lumina Whisper',
      description:
        'Vue d’ensemble des paramètres: modèle, langue de reconnaissance, raccourci et post-traitement LLM.',
    },
    guideFaq: {
      title: 'FAQ | Guide Lumina Whisper',
      description:
        'Questions fréquentes sur macOS supporté, Intel Mac, confidentialité et problèmes de raccourci.',
    },
    guideTroubleshoot: {
      title: 'Dépannage | Guide Lumina Whisper',
      description: 'Solutions pour le micro non détecté, les raccourcis et l’insertion de texte.',
    },
  },
  de: {
    landing: {
      title: 'Mac Spracheingabe-App - offline und präzise | Lumina Whisper',
      description:
        'Lumina Whisper ist eine Spracheingabe-App für Mac. Vollständig lokale Verarbeitung schützt die Privatsphäre und bietet schnelle, präzise Transkription auf Apple Silicon.',
    },
    release: {
      title: 'Versionshinweise | Lumina Whisper',
      description: 'Versionsverlauf von Lumina Whisper mit neuen Funktionen und Fehlerbehebungen.',
    },
    privacy: {
      title: 'Datenschutzerklärung | Lumina Whisper',
      description: 'Datenschutzerklärung für Lumina Whisper.',
    },
    guideInstall: {
      title: 'Installation | Lumina Whisper Anleitung',
      description:
        'Installation von Lumina Whisper auf Apple Silicon Macs mit macOS 14 oder neuer.',
    },
    guideSetup: {
      title: 'Ersteinrichtung | Lumina Whisper Anleitung',
      description:
        'Ersteinrichtung von Lumina Whisper mit Hotkey-Prüfung und Download des Spracherkennungsmodells.',
    },
    guideUsage: {
      title: 'Grundlegende Verwendung | Lumina Whisper Anleitung',
      description:
        'Starten Sie Spracheingabe und automatische Texteinfügung in vier einfachen Schritten.',
    },
    guideSettings: {
      title: 'Einstellungen | Lumina Whisper Anleitung',
      description:
        'Übersicht der Einstellungen: Modell, Erkennungssprache, Hotkey und LLM-Nachbearbeitung.',
    },
    guideFaq: {
      title: 'FAQ | Lumina Whisper Anleitung',
      description:
        'Häufige Fragen zu unterstütztem macOS, Intel Mac, Datenschutz und Hotkey-Problemen.',
    },
    guideTroubleshoot: {
      title: 'Fehlerbehebung | Lumina Whisper Anleitung',
      description:
        'Fehlerbehebung für Mikrofonerkennung, Hotkey-Probleme und fehlende Texteinfügung.',
    },
  },
}

function normalizeLanguage(value) {
  return SUPPORTED_LANGUAGES.includes(value) ? value : DEFAULT_LANGUAGE
}

function toCanonicalPath(path) {
  return path.endsWith('/') ? path : `${path}/`
}

function withLanguagePrefix(language, path) {
  const normalized = normalizeLanguage(language)
  const suffix = path === '/' ? '' : path
  return `/${normalized}${suffix}`
}

function resolvePageAndLanguage(url) {
  const normalizedUrl = url.split('?')[0].split('#')[0]
  const parts = normalizedUrl.split('/').filter(Boolean)
  const candidate = parts[0]
  const language = normalizeLanguage(candidate)
  const relativePath = `/${parts.slice(1).join('/')}`

  const page = Object.entries(PAGE_PATHS).find(([, path]) => {
    if (path === '/') return relativePath === '/'
    return relativePath === path
  })

  return { language, pageKey: page?.[0] }
}

function getCanonicalUrl(language, pageKey) {
  const path = withLanguagePrefix(language, PAGE_PATHS[pageKey])
  return `${BASE_URL}${toCanonicalPath(path)}`
}

export function buildHelmetTags(url, jsonLd = null) {
  const { language, pageKey } = resolvePageAndLanguage(url)
  if (!pageKey) return ''

  const seo = SEO_METADATA[language][pageKey]
  const canonical = getCanonicalUrl(language, pageKey)
  const isLanding = pageKey === 'landing'

  const tags = [
    `<title>${seo.title}</title>`,
    `<meta name="description" content="${seo.description}" />`,
    `<link rel="canonical" href="${canonical}" />`,
    `<meta property="og:title" content="${seo.title}" />`,
    `<meta property="og:description" content="${seo.description}" />`,
    `<meta property="og:type" content="website" />`,
    `<meta property="og:url" content="${canonical}" />`,
    `<meta name="twitter:title" content="${seo.title}" />`,
    `<meta name="twitter:description" content="${seo.description}" />`,
  ]

  if (isLanding) {
    tags.push(`<meta property="og:image" content="${BASE_URL}/ogp.png" />`)
    tags.push('<meta name="twitter:card" content="summary_large_image" />')
    tags.push(`<meta name="twitter:image" content="${BASE_URL}/ogp.png" />`)
  }

  for (const code of SUPPORTED_LANGUAGES) {
    tags.push(`<link rel="alternate" hreflang="${code}" href="${getCanonicalUrl(code, pageKey)}" />`)
  }
  tags.push(`<link rel="alternate" hreflang="x-default" href="${getCanonicalUrl(DEFAULT_LANGUAGE, pageKey)}" />`)

  if (jsonLd) {
    tags.push(`<script type="application/ld+json">${JSON.stringify(jsonLd)}</script>`)
  }

  return tags.join('\n    ')
}

export function buildLandingJsonLd(language = DEFAULT_LANGUAGE) {
  const seo = SEO_METADATA[normalizeLanguage(language)].landing
  return {
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
    description: seo.description,
    url: getCanonicalUrl(language, 'landing'),
    downloadUrl:
      'https://github.com/k1e1n04/lumina-whisper-site/releases/latest/download/LuminaWhisper.dmg',
    softwareVersion: '0.3.1',
    author: {
      '@type': 'Person',
      name: 'KenIshii',
    },
  }
}

export { BASE_URL, SUPPORTED_LANGUAGES, PAGE_PATHS, DEFAULT_LANGUAGE }
