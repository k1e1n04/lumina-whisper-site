import { useTranslation } from 'react-i18next'

export default function SetupPage() {
  const { t } = useTranslation()
  return (
    <article data-testid="guide-setup" className="max-w-none prose">
      <h1 className="mb-6 text-3xl font-bold text-accent">{t('guide.setup.title')}</h1>

      <h2 className="mt-8 mb-3 text-xl font-semibold text-text">メニューバーアイコン</h2>
      <p className="mb-4 text-text-muted">
        アプリを起動するとメニューバーに LuminaWhisper のアイコンが表示されます。アイコンをクリックして設定画面を開けます。
      </p>

      <h2 className="mt-8 mb-3 text-xl font-semibold text-text">ホットキーの確認</h2>
      <p className="mb-4 text-text-muted">
        デフォルトのホットキーは <kbd className="rounded bg-surface-2 px-2 py-0.5 font-mono text-sm">Option+Space</kbd>
        です。他のアプリと競合する場合は、設定画面からカスタマイズできます。
      </p>

      <h2 className="mt-8 mb-3 text-xl font-semibold text-text">ログイン時に自動起動</h2>
      <p className="text-text-muted">
        設定画面の「ログイン時に起動」を有効にすると、Mac 起動時に自動的に LuminaWhisper が起動します。
      </p>
    </article>
  )
}
