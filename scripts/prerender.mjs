import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { buildHelmetTags, LANDING_JSON_LD } from './seo-data.mjs'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.resolve(__dirname, '..')
const BASE_URL = 'https://lumina-whisper.com'

const routes = [
  { url: '/', priority: '1.0' },
  { url: '/release', priority: '0.6' },
  { url: '/privacy', priority: '0.3' },
  { url: '/guide/install', priority: '0.8' },
  { url: '/guide/setup', priority: '0.8' },
  { url: '/guide/usage', priority: '0.8' },
  { url: '/guide/settings', priority: '0.7' },
  { url: '/guide/faq', priority: '0.7' },
  { url: '/guide/troubleshoot', priority: '0.7' },
]

const template = fs.readFileSync(path.join(root, 'dist/index.html'), 'utf-8')
const { render } = await import(path.join(root, 'dist-ssr/entry-server.js'))

console.log('Pre-rendering routes...')
for (const { url } of routes) {
  const { html: appHtml } = render(url)

  const jsonLd = url === '/' ? LANDING_JSON_LD : null
  const helmetTags = buildHelmetTags(url, jsonLd)

  const html = template
    .replace('<!--ssr-outlet-->', appHtml)
    .replace('<!--helmet-tags-->', helmetTags)

  const outFile =
    url === '/'
      ? path.join(root, 'dist/index.html')
      : path.join(root, `dist${url}/index.html`)

  fs.mkdirSync(path.dirname(outFile), { recursive: true })
  fs.writeFileSync(outFile, html)
  console.log(`  ✓ ${url}`)
}

// Generate sitemap.xml
const sitemapEntries = routes
  .map(
    ({ url, priority }) =>
      `  <url>\n    <loc>${BASE_URL}${url === '/' ? '/' : url + '/'}</loc>\n    <priority>${priority}</priority>\n  </url>`,
  )
  .join('\n')

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapEntries}
</urlset>`

fs.writeFileSync(path.join(root, 'dist/sitemap.xml'), sitemap)
console.log('  ✓ sitemap.xml')

// Clean up SSR build artifacts
fs.rmSync(path.join(root, 'dist-ssr'), { recursive: true })
console.log('Done.')
