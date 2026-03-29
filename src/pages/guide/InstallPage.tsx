import { useTranslation } from 'react-i18next'

export default function InstallPage() {
  const { t } = useTranslation()
  return (
    <article data-testid="guide-install" className="max-w-none prose">
      <h1 className="mb-6 text-3xl font-bold text-primary">{t('guide.install.title')}</h1>

      <h2 className="mt-8 mb-3 text-xl font-semibold text-gray-800">1. ダウンロード</h2>
      <p className="mb-4 text-gray-600">
        <a
          href="https://github.com/ishiiken/lumina-whisper/releases/latest"
          target="_blank"
          rel="noopener noreferrer"
          className="text-accent hover:underline"
        >
          GitHub Releases
        </a>{' '}
        から最新の <code className="rounded bg-gray-100 px-1">LuminaWhisper.dmg</code> をダウンロードします。
      </p>

      <h2 className="mt-8 mb-3 text-xl font-semibold text-gray-800">2. インストール</h2>
      <ol className="list-inside list-decimal space-y-2 text-gray-600">
        <li>
          ダウンロードした <code className="rounded bg-gray-100 px-1">.dmg</code> ファイルを開きます。
        </li>
        <li>LuminaWhisper アイコンを「アプリケーション」フォルダにドラッグします。</li>
        <li>「アプリケーション」フォルダから LuminaWhisper を起動します。</li>
      </ol>

      <h2 className="mt-8 mb-3 text-xl font-semibold text-gray-800">3. マイク権限の許可</h2>
      <p className="mb-2 text-gray-600">
        初回起動時にマイクへのアクセス許可を求めるダイアログが表示されます。「OK」をクリックしてください。
      </p>
      <p className="text-gray-600">
        権限を後から変更する場合は、「システム設定」→「プライバシーとセキュリティ」→「マイク」から LuminaWhisper
        を有効にします。
      </p>

      <div className="mt-6 rounded-lg border border-blue-200 bg-blue-50 p-4">
        <p className="text-sm text-blue-700">
          <strong>必要環境:</strong> macOS 14.0 (Sonoma) 以降 · Apple Silicon (M1 以降)
        </p>
      </div>
    </article>
  )
}
