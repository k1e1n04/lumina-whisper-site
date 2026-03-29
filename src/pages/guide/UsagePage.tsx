import { useTranslation } from 'react-i18next'

export default function UsagePage() {
  const { t } = useTranslation()
  return (
    <article data-testid="guide-usage" className="max-w-none prose">
      <h1 className="mb-6 text-3xl font-bold text-primary">{t('guide.usage.title')}</h1>

      <h2 className="mt-8 mb-3 text-xl font-semibold text-gray-800">音声入力の手順</h2>
      <ol className="mb-6 list-none space-y-4">
        {[
          {
            step: '1',
            label: 'テキスト入力フィールドにフォーカスを当てる',
            desc: 'テキストを入力したい場所（テキストエディタ、メール本文など）をクリックします。',
          },
          {
            step: '2',
            label: 'Option+Space を押す',
            desc: '録音が開始されます。メニューバーのアイコンが点滅して録音中を示します。',
          },
          {
            step: '3',
            label: '話す',
            desc: 'はっきりした声で話してください。句読点は自動的に挿入されます。',
          },
          {
            step: '4',
            label: '再度 Option+Space を押す',
            desc: '録音を停止します。認識されたテキストが自動的にカーソル位置に挿入されます。',
          },
        ].map(({ step, label, desc }) => (
          <li key={step} className="flex gap-4">
            <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-accent text-sm font-bold text-white">
              {step}
            </span>
            <div>
              <p className="mb-1 font-semibold text-gray-800">{label}</p>
              <p className="text-sm text-gray-600">{desc}</p>
            </div>
          </li>
        ))}
      </ol>

      <div className="rounded-lg border border-yellow-200 bg-yellow-50 p-4">
        <p className="text-sm text-yellow-800">
          <strong>ヒント:</strong> 静かな環境での使用が最も精度が高くなります。外部マイクの使用もお勧めです。
        </p>
      </div>
    </article>
  )
}
