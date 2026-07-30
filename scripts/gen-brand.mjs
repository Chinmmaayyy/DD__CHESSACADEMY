/**
 * Generates all brand assets:
 *   - favicons (.ico + PNGs + apple-touch + SVG): a bold gold circle + navy crown,
 *     WhatsApp-style — high contrast, clearly visible in any browser tab.
 *   - og-image.jpg (social/WhatsApp share card) from the full logo lockup.
 *
 * Run: node scripts/gen-brand.mjs
 */
import { readFile, writeFile } from 'node:fs/promises'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const assets = join(root, 'src', 'assets')
const pub = join(root, 'public')

const GOLD = '#d4af37'

// Square-cropped DD emblem for the favicon — crisp vector, white background baked in.
const logoSrc = await readFile(join(assets, 'logo.svg'), 'utf8')
const SQUARE_VB = '999 356 823 823'
const emblemSvg = (px) =>
  Buffer.from(
    logoSrc.replace(
      /<svg[^>]*>/,
      `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${SQUARE_VB}" width="${px}" height="${px}">`,
    ),
  )

const icon = (size) => sharp(emblemSvg(size)).png().toBuffer()

// --- PNG favicons (circle) ---
for (const [name, size] of [
  ['favicon-48x48.png', 48],
  ['favicon-96x96.png', 96],
  ['favicon-192x192.png', 192],
  ['favicon-512x512.png', 512],
]) {
  await writeFile(join(pub, name), await icon(size))
  console.log(`  ${name}`)
}
// apple-touch: white-tile emblem (iOS rounds the corners).
await writeFile(join(pub, 'apple-touch-icon.png'), await icon(180))
console.log('  apple-touch-icon.png')

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

// --- SVG favicon (crisp vector, scales to any size) ---
await writeFile(
  join(pub, 'favicon.svg'),
  Buffer.from(
    logoSrc.replace(
      /<svg[^>]*>/,
      `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${SQUARE_VB}">`,
    ),
  ),
)
console.log('  favicon.svg')

// --- OG / social share image (1200x630): full logo + headline + CTA ---
const OG_W = 1200
const OG_H = 630
const logoMeta = await sharp(join(assets, 'logo-full.png')).metadata()
const logoW = 660
const logoH = Math.round((logoW * (logoMeta.height ?? 1536)) / (logoMeta.width ?? 2816))
const lockup = await sharp(join(assets, 'logo-full.png')).resize({ width: logoW }).toBuffer()
const overlay = Buffer.from(
  `<svg width="${OG_W}" height="${OG_H}" xmlns="http://www.w3.org/2000/svg">
     <rect width="${OG_W}" height="10" fill="${GOLD}"/>
     <rect y="${OG_H - 10}" width="${OG_W}" height="10" fill="${GOLD}"/>
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
