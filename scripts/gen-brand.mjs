/**
 * Generates all brand assets from the DD Chess Academy logo:
 *   - favicons (.ico + PNG sizes + apple-touch-icon) from the emblem
 *   - og-image.jpg (social/WhatsApp share card) from the full lockup
 *
 * Sources: src/assets/logo-mark.png (emblem, transparent) + logo-full.png (lockup).
 * Run: node scripts/gen-brand.mjs
 */
import { readFile, writeFile } from 'node:fs/promises'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const assets = join(root, 'src', 'assets')
const pub = join(root, 'public')

const TRANSPARENT = { r: 0, g: 0, b: 0, alpha: 0 }
const WHITE = { r: 255, g: 255, b: 255, alpha: 1 }

// Tightly-cropped emblem (threshold ignores faint AI-export edge artifacts).
const markTrimmed = await sharp(join(assets, 'logo-mark.png'))
  .trim({ threshold: 50 })
  .png()
  .toBuffer()
// Save the trimmed emblem back for crisp use in the navbar/footer.
await writeFile(join(assets, 'logo-mark.png'), markTrimmed)

/** Square icon: emblem centred on a padded canvas (white so it reads on any tab). */
async function icon(size, { pad = 0.14, bg = WHITE } = {}) {
  const inner = Math.round(size * (1 - pad * 2))
  const resized = await sharp(markTrimmed)
    .resize(inner, inner, { fit: 'contain', background: TRANSPARENT })
    .toBuffer()
  return sharp({ create: { width: size, height: size, channels: 4, background: bg } })
    .composite([{ input: resized, gravity: 'center' }])
    .png()
    .toBuffer()
}

// --- PNG favicons + apple-touch (opaque white so iOS looks clean) ---
for (const [name, size, opts] of [
  ['favicon-48x48.png', 48, {}],
  ['favicon-96x96.png', 96, {}],
  ['favicon-192x192.png', 192, {}],
  ['favicon-512x512.png', 512, {}],
  ['apple-touch-icon.png', 180, { bg: WHITE, pad: 0.12 }],
]) {
  await writeFile(join(pub, name), await icon(size, opts))
  console.log(`  ${name}`)
}

// --- Real multi-size .ico (16/32/48) ---
const icoSizes = [16, 32, 48]
const icoImgs = await Promise.all(icoSizes.map((s) => icon(s)))
const header = Buffer.alloc(6)
header.writeUInt16LE(0, 0)
header.writeUInt16LE(1, 2)
header.writeUInt16LE(icoSizes.length, 4)
let offset = 6 + 16 * icoSizes.length
const entries = icoImgs.map((img, i) => {
  const e = Buffer.alloc(16)
  e.writeUInt8(icoSizes[i], 0)
  e.writeUInt8(icoSizes[i], 1)
  e.writeUInt16LE(1, 4)
  e.writeUInt16LE(32, 6)
  e.writeUInt32LE(img.length, 8)
  e.writeUInt32LE(offset, 12)
  offset += img.length
  return e
})
await writeFile(join(pub, 'favicon.ico'), Buffer.concat([header, ...entries, ...icoImgs]))
console.log('  favicon.ico')

// --- SVG favicon: embed the emblem PNG so modern browsers show the new mark too ---
const markB64 = markTrimmed.toString('base64')
const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect width="100" height="100" rx="16" fill="#ffffff"/><image href="data:image/png;base64,${markB64}" x="10" y="21" width="80" height="58" preserveAspectRatio="xMidYMid meet"/></svg>`
await writeFile(join(pub, 'favicon.svg'), svg)
console.log('  favicon.svg')

// --- OG / social share image (1200x630): logo + headline + call-to-action ---
const OG_W = 1200
const OG_H = 630
const logoMeta = await sharp(join(assets, 'logo-full.png')).metadata()
const logoW = 660
const logoH = Math.round((logoW * (logoMeta.height ?? 1536)) / (logoMeta.width ?? 2816))
const lockup = await sharp(join(assets, 'logo-full.png')).resize({ width: logoW }).toBuffer()
const overlay = Buffer.from(
  `<svg width="${OG_W}" height="${OG_H}" xmlns="http://www.w3.org/2000/svg">
     <rect width="${OG_W}" height="10" fill="#d4af37"/>
     <rect y="${OG_H - 10}" width="${OG_W}" height="10" fill="#d4af37"/>
     <text x="600" y="500" font-family="Arial, sans-serif" font-size="40" font-weight="700"
           fill="#16203a" text-anchor="middle">Chess Classes in Dombivli · Kalyan · Thakurli</text>
     <text x="600" y="556" font-family="Arial, sans-serif" font-size="30" font-weight="700"
           fill="#b8952b" text-anchor="middle">Book a Free Demo — National Arbiter &amp; FIDE Trainer</text>
   </svg>`,
)
await sharp({ create: { width: OG_W, height: OG_H, channels: 3, background: '#ffffff' } })
  .composite([
    { input: lockup, top: 70, left: Math.round((OG_W - logoW) / 2) },
    { input: overlay, top: 0, left: 0 },
  ])
  .jpeg({ quality: 88 })
  .toFile(join(pub, 'og-image.jpg'))
console.log(`  og-image.jpg (1200x630, logo ${logoW}x${logoH} + CTA)`)

const preview = await readFile(join(pub, 'og-image.jpg'))
console.log(`\nBrand assets generated. og-image ${(preview.length / 1024).toFixed(0)} KB`)
