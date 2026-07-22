/**
 * Generates raster favicons (+ a real .ico) from public/favicon.svg.
 * Google requires a crawlable, square favicon — it prefers /favicon.ico and
 * sizes that are multiples of 48. Run: node scripts/gen-favicons.mjs
 */
import { readFile, writeFile } from 'node:fs/promises'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const pub = join(root, 'public')
const svg = await readFile(join(pub, 'favicon.svg'))

// PNG favicons Google + browsers + mobile home screens use.
const PNGS = [
  ['favicon-48x48.png', 48],
  ['favicon-96x96.png', 96],
  ['favicon-192x192.png', 192],
  ['favicon-512x512.png', 512],
  ['apple-touch-icon.png', 180],
]

for (const [name, size] of PNGS) {
  await sharp(svg, { density: 384 })
    .resize(size, size, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toFile(join(pub, name))
  console.log(`  ${name} (${size}x${size})`)
}

/** Build a genuine multi-size .ico containing PNG entries. */
const icoSizes = [16, 32, 48]
const images = await Promise.all(
  icoSizes.map((s) =>
    sharp(svg, { density: 384 })
      .resize(s, s, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
      .png()
      .toBuffer(),
  ),
)

const header = Buffer.alloc(6)
header.writeUInt16LE(0, 0) // reserved
header.writeUInt16LE(1, 2) // type: icon
header.writeUInt16LE(icoSizes.length, 4)

let offset = 6 + 16 * icoSizes.length
const entries = images.map((img, i) => {
  const e = Buffer.alloc(16)
  const s = icoSizes[i]
  e.writeUInt8(s === 256 ? 0 : s, 0) // width
  e.writeUInt8(s === 256 ? 0 : s, 1) // height
  e.writeUInt8(0, 2) // palette
  e.writeUInt8(0, 3) // reserved
  e.writeUInt16LE(1, 4) // colour planes
  e.writeUInt16LE(32, 6) // bits per pixel
  e.writeUInt32LE(img.length, 8) // size of image data
  e.writeUInt32LE(offset, 12) // offset
  offset += img.length
  return e
})

await writeFile(join(pub, 'favicon.ico'), Buffer.concat([header, ...entries, ...images]))
console.log(`  favicon.ico (${icoSizes.join(', ')})`)
console.log('\nFavicons generated.')
