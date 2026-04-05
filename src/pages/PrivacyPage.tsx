import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import PageSeo from '../components/PageSeo'

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-bg">
      <PageSeo page="privacy" />
      <Navbar />

      <main className="mx-auto max-w-3xl px-6 py-28">
        <p className="mb-8 text-xs tracking-[0.1em] text-text-dim uppercase">Privacy Policy</p>
        <h1
          className="mb-16 text-3xl font-normal text-text"
          style={{ fontFamily: 'var(--font-serif)' }}
        >
          プライバシーポリシー
        </h1>

        <div className="space-y-12 text-sm leading-loose text-text-muted">
          <section>
            <p>
              Lumina Whisper（以下「本アプリ」）は、ユーザーのプライバシーを最優先に設計されています。
              本アプリは個人情報を一切収集しません。
            </p>
          </section>

          <section>
            <h2
              className="mb-4 text-base font-normal text-text"
              style={{ fontFamily: 'var(--font-serif)' }}
            >
              データの収集について
            </h2>
            <p>
              本アプリはいかなる個人情報・使用データも収集・送信しません。
              音声データはすべてデバイス上でのみ処理され、外部サーバーに送信されることはありません。
            </p>
          </section>

          <section>
            <h2
              className="mb-4 text-base font-normal text-text"
              style={{ fontFamily: 'var(--font-serif)' }}
            >
              マイクへのアクセス
            </h2>
            <p>
              本アプリは音声入力のためにマイクへのアクセスを必要とします。
              録音された音声はテキスト変換のためにデバイス上でのみ処理され、保存・送信されることはありません。
            </p>
          </section>

          <section>
            <h2
              className="mb-4 text-base font-normal text-text"
              style={{ fontFamily: 'var(--font-serif)' }}
            >
              分析・トラッキング
            </h2>
            <p>
              本アプリはアナリティクスツール、広告SDK、およびトラッキング機能を一切使用しません。
            </p>
          </section>

          <section>
            <h2
              className="mb-4 text-base font-normal text-text"
              style={{ fontFamily: 'var(--font-serif)' }}
            >
              お問い合わせ
            </h2>
            <p>
              プライバシーに関するお問い合わせは、{' '}
              <a
                href="https://github.com/k1e1n04/lumina-whisper/issues"
                className="text-accent no-underline hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub Issues
              </a>{' '}
              までご連絡ください。
            </p>
          </section>

          <section>
            <h2
              className="mb-4 text-base font-normal text-text"
              style={{ fontFamily: 'var(--font-serif)' }}
            >
              改定
            </h2>
            <p>最終更新日：2026年4月2日</p>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  )
}
