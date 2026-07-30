import { readdir } from 'node:fs/promises'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const dir = join(root, 'src', 'assets')
const out = process.argv[2] || dir

const TILE = 230
const LABEL = 30
const COLS = 6
const ROWS = 5
const PER = COLS * ROWS

const files = (await readdir(dir))
  .filter((f) => /^gallery_\d+\.(jpe?g)$/i.test(f))
  .sort((a, b) => Number(a.match(/\d+/)[0]) - Number(b.match(/\d+/)[0]))

async function tile(file) {
  const num = file.match(/gallery_(\d+)/)[1]
  const img = await sharp(join(dir, file))
    .resize(TILE, TILE, { fit: 'cover' })
    .toBuffer()
  const label = Buffer.from(
    `<svg width="${TILE}" height="${TILE + LABEL}">
       <rect width="${TILE}" height="${TILE + LABEL}" fill="#0b1220"/>
       <text x="${TILE / 2}" y="${TILE + 21}" font-family="Arial" font-size="18"
             font-weight="bold" fill="#d4af37" text-anchor="middle">#${num}</text>
     </svg>`,
  )
  return sharp(label).composite([{ input: img, top: 0, left: 0 }]).png().toBuffer()
}

let sheet = 0
for (let i = 0; i < files.length; i += PER) {
  sheet++
  const batch = files.slice(i, i + PER)
  const tiles = await Promise.all(batch.map(tile))
  const rows = Math.ceil(batch.length / COLS)
  const W = COLS * TILE
  const H = rows * (TILE + LABEL)
  const composites = tiles.map((input, k) => ({
    input,
    left: (k % COLS) * TILE,
    top: Math.floor(k / COLS) * (TILE + LABEL),
  }))
  await sharp({ create: { width: W, height: H, channels: 3, background: '#1b2436' } })
    .composite(composites)
    .jpeg({ quality: 78 })
    .toFile(join(out, `sheet_${sheet}.jpg`))
  console.log(`sheet_${sheet}.jpg  (#${batch[0].match(/\d+/)[0]}–#${batch.at(-1).match(/\d+/)[0]})`)
}
