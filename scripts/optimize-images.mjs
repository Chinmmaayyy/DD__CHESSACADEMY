/**
 * Compresses images in src/assets in place: resizes anything larger than
 * MAX_EDGE and re-encodes at a sensible quality. Safe to re-run — already
 * optimized files simply get skipped (they're under the size threshold).
 *
 * Usage:  node scripts/optimize-images.mjs
 *
 * Originals are recoverable from git history if you ever need them.
 */
import { readdir, stat, rename, unlink } from 'node:fs/promises'
import { join, dirname, extname, basename } from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const dir = join(root, 'src', 'assets')

const MAX_EDGE = 1600 // plenty for full-screen lightbox viewing
const JPEG_QUALITY = 80
const PNG_QUALITY = 80

const isJpeg = (f) => /\.jpe?g$/i.test(f)
const isPng = (f) => /\.png$/i.test(f)

const fmt = (b) => `${(b / 1048576).toFixed(2)} MB`

const files = (await readdir(dir)).filter((f) => isJpeg(f) || isPng(f))

let before = 0
let after = 0
let changed = 0

for (const file of files) {
  const src = join(dir, file)
  const originalSize = (await stat(src)).size
  before += originalSize

  const tmp = join(dir, `.tmp-${basename(file, extname(file))}${extname(file)}`)
  try {
    const img = sharp(src, { failOn: 'none' })
    const meta = await img.metadata()
    const needsResize = Math.max(meta.width ?? 0, meta.height ?? 0) > MAX_EDGE

    let pipeline = img.rotate() // respect EXIF orientation
    if (needsResize) {
      pipeline = pipeline.resize({
        width: MAX_EDGE,
        height: MAX_EDGE,
        fit: 'inside',
        withoutEnlargement: true,
      })
    }
    pipeline = isPng(file)
      ? pipeline.png({ quality: PNG_QUALITY, compressionLevel: 9, palette: true })
      : pipeline.jpeg({ quality: JPEG_QUALITY, mozjpeg: true })

    await pipeline.toFile(tmp)

    const newSize = (await stat(tmp)).size
    // Only keep the new file if it's actually smaller.
    if (newSize < originalSize) {
      await rename(tmp, src)
      after += newSize
      changed++
      console.log(
        `  ${file}: ${fmt(originalSize)} -> ${fmt(newSize)} (-${Math.round((1 - newSize / originalSize) * 100)}%)`,
      )
    } else {
      await unlink(tmp)
      after += originalSize
    }
  } catch (err) {
    console.warn(`  ! skipped ${file}: ${err.message}`)
    after += originalSize
    try {
      await unlink(tmp)
    } catch {
      /* nothing to clean up */
    }
  }
}

console.log(
  `\nOptimized ${changed}/${files.length} images: ${fmt(before)} -> ${fmt(after)} ` +
    `(saved ${fmt(before - after)}, -${Math.round((1 - after / before) * 100)}%)`,
)
