import { useTranslation } from 'react-i18next'

const ISSUES = [
  {
    title: 'マイクが認識されない',
    steps: [
      '「システム設定」→「プライバシーとセキュリティ」→「マイク」を開く',
      'LuminaWhisper のトグルがオンになっているか確認する',
      'LuminaWhisper を再起動する',
    ],
  },
  {
    title: 'ホットキーが動作しない',
    steps: [
      '「システム設定」→「プライバシーとセキュリティ」→「アクセシビリティ」を開く',
      'LuminaWhisper を許可リストに追加する（なければ「+」ボタンで追加）',
      'Mac を再起動する',
    ],
  },
  {
    title: 'アプリが起動しない',
    steps: [
      'macOS 14 以降・Apple Silicon であるか確認する',
      '「システム設定」→「プライバシーとセキュリティ」でアプリの実行が許可されているか確認する',
      'アプリを削除して再インストールする',
    ],
  },
  {
    title: 'テキストが挿入されない',
    steps: [
      '録音を停止する前にテキスト入力フィールドにフォーカスが当たっているか確認する',
      'アクセシビリティ権限が付与されているか確認する',
    ],
  },
]

export default function TroubleshootPage() {
  const { t } = useTranslation()
  return (
    <article data-testid="guide-troubleshoot" className="max-w-none prose">
      <h1 className="mb-6 text-3xl font-bold text-primary">{t('guide.troubleshoot.title')}</h1>

      <div className="space-y-6">
        {ISSUES.map(({ title, steps }) => (
          <div key={title} className="rounded-lg border border-gray-200 p-5">
            <h2 className="mb-3 text-lg font-semibold text-gray-800">{title}</h2>
            <ol className="list-inside list-decimal space-y-1.5 text-sm text-gray-600">
              {steps.map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ol>
          </div>
        ))}
      </div>

      <div className="mt-8 rounded-lg border border-gray-200 bg-gray-50 p-4">
        <p className="text-sm text-gray-600">
          解決しない場合は{' '}
          <a
            href="https://github.com/ishiiken/lumina-whisper/issues"
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent hover:underline"
          >
            GitHub Issues
          </a>{' '}
          でご報告ください。
        </p>
      </div>
    </article>
  )
}
