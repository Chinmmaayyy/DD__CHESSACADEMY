/**
 * Copies the single-threaded "lite" Stockfish build into public/engine/ so it can
 * be served as a Web Worker. Single-threaded = no SharedArrayBuffer, so it needs
 * no COOP/COEP headers and works on plain static hosting (Vercel).
 *
 * Runs automatically before `npm run dev` and `npm run build`.
 */
import { mkdirSync, copyFileSync, existsSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const src = join(root, 'node_modules', 'stockfish', 'bin')
const dest = join(root, 'public', 'engine')

const FILES = ['stockfish-18-lite-single.js', 'stockfish-18-lite-single.wasm']

if (!existsSync(src)) {
  console.warn('[copy-engine] stockfish package not found — skipping (AI falls back to the JS engine).')
  process.exit(0)
}

mkdirSync(dest, { recursive: true })
for (const file of FILES) {
  const from = join(src, file)
  if (!existsSync(from)) {
    console.warn(`[copy-engine] missing ${file} — skipping.`)
    continue
  }
  copyFileSync(from, join(dest, file))
}
console.log(`[copy-engine] Stockfish copied to public/engine/`)
