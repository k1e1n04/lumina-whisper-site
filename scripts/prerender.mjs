import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import {
  BASE_URL,
  DEFAULT_LANGUAGE,
  PAGE_PATHS,
  SUPPORTED_LANGUAGES,
  buildHelmetTags,
  buildLandingJsonLd,
} from './seo-data.mjs'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.resolve(__dirname, '..')
const baseRoutes = [
  { path: PAGE_PATHS.landing, priority: '1.0' },
  { path: PAGE_PATHS.release, priority: '0.6' },
  { path: PAGE_PATHS.privacy, priority: '0.3' },
  { path: PAGE_PATHS.guideInstall, priority: '0.8' },
  { path: PAGE_PATHS.guideSetup, priority: '0.8' },
  { path: PAGE_PATHS.guideUsage, priority: '0.8' },
  { path: PAGE_PATHS.guideSettings, priority: '0.7' },
  { path: PAGE_PATHS.guideFaq, priority: '0.7' },
  { path: PAGE_PATHS.guideTroubleshoot, priority: '0.7' },
]

const routes = SUPPORTED_LANGUAGES.flatMap((language) =>
  baseRoutes.map(({ path, priority }) => {
    const suffix = path === '/' ? '' : path
    return {
      url: `/${language}${suffix}`,
      priority,
      language,
      pagePath: path,
    }
  }),
)

const template = fs.readFileSync(path.join(root, 'dist/index.html'), 'utf-8')
const { render } = await import(path.join(root, 'dist-ssr/entry-server.js'))

console.log('Pre-rendering routes...')
for (const { url, pagePath, language } of routes) {
  const { html: appHtml } = render(url)

  const jsonLd = pagePath === '/' ? buildLandingJsonLd(language) : null
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
      `  <url>\n    <loc>${BASE_URL}${url}/</loc>\n    <priority>${priority}</priority>\n  </url>`,
  )
  .join('\n')

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapEntries}
</urlset>`

fs.writeFileSync(path.join(root, 'dist/sitemap.xml'), sitemap)
console.log('  ✓ sitemap.xml')

// Root legacy redirect to default language
const rootRedirectHtml = template.replace(
  '<!--ssr-outlet-->',
  `<script>window.location.replace('/${DEFAULT_LANGUAGE}/')</script>`,
)
fs.writeFileSync(path.join(root, 'dist/index.html'), rootRedirectHtml)

// Clean up SSR build artifacts
fs.rmSync(path.join(root, 'dist-ssr'), { recursive: true })
console.log('Done.')
