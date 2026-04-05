import fs from 'node:fs'
import path from 'node:path'

function parseArgs(argv) {
  const args = {}
  for (let i = 0; i < argv.length; i += 1) {
    const token = argv[i]
    if (!token.startsWith('--')) continue
    const key = token.slice(2)
    const next = argv[i + 1]
    if (!next || next.startsWith('--')) {
      args[key] = 'true'
      continue
    }
    args[key] = next
    i += 1
  }
  return args
}

function required(args, key) {
  const value = args[key]
  if (!value) {
    throw new Error(`Missing required argument: --${key}`)
  }
  return value
}

function escapeXml(value) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&apos;')
}

function toRfc2822(input) {
  const date = new Date(input)
  if (Number.isNaN(date.getTime())) {
    throw new Error(`Invalid --pub-date: ${input}`)
  }
  return date.toUTCString()
}

function createXml({
  title,
  feedLink,
  releaseNotesLink,
  pubDate,
  version,
  shortVersion,
  minimumSystemVersion,
  enclosureUrl,
  enclosureLength,
  edSignature,
}) {
  return `<?xml version="1.0" encoding="utf-8"?>
<rss version="2.0" xmlns:sparkle="http://www.andymatuschak.org/xml-namespaces/sparkle" xmlns:dc="http://purl.org/dc/elements/1.1/">
  <channel>
    <title>${escapeXml(title)}</title>
    <link>${escapeXml(feedLink)}</link>
    <description>${escapeXml(title)} updates</description>
    <language>ja</language>
    <item>
      <title>Version ${escapeXml(shortVersion)}</title>
      <sparkle:version>${escapeXml(version)}</sparkle:version>
      <sparkle:shortVersionString>${escapeXml(shortVersion)}</sparkle:shortVersionString>
      <sparkle:minimumSystemVersion>${escapeXml(minimumSystemVersion)}</sparkle:minimumSystemVersion>
      <pubDate>${escapeXml(pubDate)}</pubDate>
      <enclosure
        url="${escapeXml(enclosureUrl)}"
        type="application/octet-stream"
        sparkle:edSignature="${escapeXml(edSignature)}"
        length="${escapeXml(enclosureLength)}" />
      <sparkle:releaseNotesLink>${escapeXml(releaseNotesLink)}</sparkle:releaseNotesLink>
    </item>
  </channel>
</rss>
`
}

function main() {
  const args = parseArgs(process.argv.slice(2))
  const outputPath = args.output ?? 'public/appcast.xml'
  const title = args.title ?? 'Lumina Whisper'
  const feedLink = args['feed-link'] ?? 'https://lumina-whisper.com/'
  const releaseNotesLink = args['release-notes-link'] ?? 'https://lumina-whisper.com/ja/release/'
  const minimumSystemVersion = args['minimum-system-version'] ?? '14.0'
  const pubDate = toRfc2822(args['pub-date'] ?? new Date().toISOString())

  const version = required(args, 'version')
  const shortVersion = args['short-version'] ?? version
  const enclosureUrl = required(args, 'url')
  const enclosureLength = required(args, 'length')
  const edSignature = required(args, 'ed-signature')

  const xml = createXml({
    title,
    feedLink,
    releaseNotesLink,
    pubDate,
    version,
    shortVersion,
    minimumSystemVersion,
    enclosureUrl,
    enclosureLength,
    edSignature,
  })

  const resolvedOutput = path.resolve(process.cwd(), outputPath)
  fs.mkdirSync(path.dirname(resolvedOutput), { recursive: true })
  fs.writeFileSync(resolvedOutput, xml, 'utf8')
  console.log(`Wrote ${resolvedOutput}`)
}

try {
  main()
} catch (error) {
  console.error(String(error instanceof Error ? error.message : error))
  process.exit(1)
}
