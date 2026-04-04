import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { Resvg } from '@resvg/resvg-js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.resolve(__dirname, '..')

// OGP image: 1200x630px, Latin text only (avoids font dependency in CI)
const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <!-- Background -->
  <rect width="1200" height="630" fill="#FAFAFA"/>
  <!-- Left accent border -->
  <rect x="0" y="0" width="8" height="630" fill="#863bff"/>
  <!-- Bottom accent line -->
  <rect x="0" y="610" width="1200" height="4" fill="#863bff" opacity="0.25"/>
  <!-- Category label -->
  <text x="80" y="210"
    font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif"
    font-size="22" font-weight="400" fill="#863bff" letter-spacing="4">
    MAC VOICE INPUT APP
  </text>
  <!-- App name -->
  <text x="80" y="310"
    font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif"
    font-size="88" font-weight="600" fill="#1A1A1A">
    Lumina Whisper
  </text>
  <!-- Tagline -->
  <text x="82" y="380"
    font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif"
    font-size="32" font-weight="300" fill="#666666">
    Private · Offline · Apple Silicon
  </text>
  <!-- Requirements -->
  <text x="82" y="555"
    font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif"
    font-size="22" fill="#999999">
    macOS 14.0+ · Apple Silicon · Free
  </text>
</svg>`

const resvg = new Resvg(svg, {
  fitTo: { mode: 'width', value: 1200 },
})
const pngData = resvg.render()
const pngBuffer = pngData.asPng()

const outPath = path.join(root, 'public/ogp.png')
fs.writeFileSync(outPath, pngBuffer)
console.log(`  ✓ ogp.png (${pngBuffer.length} bytes) → ${outPath}`)
