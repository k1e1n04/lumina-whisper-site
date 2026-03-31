import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.resolve(__dirname, '..')

const routes = [
  '/',
  '/release',
  '/guide/install',
  '/guide/setup',
  '/guide/usage',
  '/guide/settings',
  '/guide/faq',
  '/guide/troubleshoot',
]

const template = fs.readFileSync(path.join(root, 'dist/index.html'), 'utf-8')
const { render } = await import(path.join(root, 'dist-ssr/entry-server.js'))

console.log('Pre-rendering routes...')
for (const url of routes) {
  const appHtml = render(url)
  const html = template.replace('<!--ssr-outlet-->', appHtml)

  const outFile =
    url === '/'
      ? path.join(root, 'dist/index.html')
      : path.join(root, `dist${url}/index.html`)

  fs.mkdirSync(path.dirname(outFile), { recursive: true })
  fs.writeFileSync(outFile, html)
  console.log(`  ✓ ${url}`)
}

// Clean up SSR build artifacts
fs.rmSync(path.join(root, 'dist-ssr'), { recursive: true })
console.log('Done.')
