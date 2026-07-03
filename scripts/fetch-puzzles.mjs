import https from 'node:https'
import fs from 'node:fs'
import { Decompress } from 'fzstd'
import { Chess } from 'chess.js'

const LICHESS_URL = 'https://database.lichess.org/lichess_db_puzzle.csv.zst'
const MAX_TEXT = 6_000_000 // ~6MB of decompressed CSV is plenty

// Target counts per tier
const TARGET = { Beginner: 45, Intermediate: 40, Advanced: 30 }
const buckets = { Beginner: [], Intermediate: [], Advanced: [] }
const seenThemesCount = {}

let text = ''
let finished = false

function tierOf(rating) {
  if (rating < 1300) return 'Beginner'
  if (rating < 1750) return 'Intermediate'
  return 'Advanced'
}

function bucketsFull() {
  return Object.keys(TARGET).every((t) => buckets[t].length >= TARGET[t])
}

function processRow(line) {
  const cols = line.split(',')
  if (cols.length < 8) return
  const [, fen, movesStr, ratingStr, , popularityStr, nbPlaysStr, themesStr] = cols
  const rating = Number(ratingStr)
  const popularity = Number(popularityStr)
  const nbPlays = Number(nbPlaysStr)
  if (!fen || !movesStr || !Number.isFinite(rating)) return
  if (popularity < 80 || nbPlays < 50) return // quality filter

  const uci = movesStr.trim().split(' ')
  if (uci.length < 2) return
  const solution = uci.slice(1) // first move is the setup move
  const playerMoves = Math.ceil(solution.length / 2)
  if (playerMoves < 1 || playerMoves > 3) return // approachable length

  const tier = tierOf(rating)
  if (buckets[tier].length >= TARGET[tier]) return

  // Apply the setup move to get the position the solver actually sees.
  let game
  try {
    game = new Chess(fen)
    const setup = uci[0]
    game.move({ from: setup.slice(0, 2), to: setup.slice(2, 4), promotion: setup[4] })
  } catch {
    return
  }

  // Build a SAN line for the solution (for "show solution").
  const sanLine = []
  try {
    const g2 = new Chess(game.fen())
    for (const mv of solution) {
      const m = g2.move({ from: mv.slice(0, 2), to: mv.slice(2, 4), promotion: mv[4] })
      sanLine.push(m.san)
    }
  } catch {
    return
  }

  const themes = (themesStr || '').trim().split(' ').filter(Boolean)
  // Prefer thematic variety
  const primaryTheme = themes[0] || 'tactics'
  seenThemesCount[primaryTheme] = (seenThemesCount[primaryTheme] || 0) + 1

  buckets[tier].push({
    id: cols[0],
    fen: game.fen(),
    moves: solution,
    san: sanLine,
    rating,
    tier,
    sideToMove: game.turn() === 'w' ? 'White' : 'Black',
    themes: themes.slice(0, 3),
  })
}

function finish() {
  if (finished) return
  finished = true

  const all = [...buckets.Beginner, ...buckets.Intermediate, ...buckets.Advanced]
  // Stable id-based ordering within tiers already; assign sequential display numbers.
  all.forEach((p, i) => (p.n = i + 1))

  fs.writeFileSync('src/data/puzzles.generated.json', JSON.stringify(all))
  console.log(
    `Wrote ${all.length} puzzles →`,
    Object.fromEntries(Object.entries(buckets).map(([k, v]) => [k, v.length])),
  )
  process.exit(0)
}

const dec = new Decompress((chunk) => {
  text += Buffer.from(chunk).toString('utf8')
})

https.get(LICHESS_URL, (res) => {
  res.on('data', (d) => {
    if (finished) return
    try {
      dec.push(new Uint8Array(d))
    } catch {
      /* ignore trailing decode errors */
    }
    // Process complete lines we have so far
    const lastNl = text.lastIndexOf('\n')
    if (lastNl > 0) {
      const chunkLines = text.slice(0, lastNl).split('\n')
      text = text.slice(lastNl + 1)
      for (const line of chunkLines) {
        if (line.startsWith('PuzzleId')) continue
        processRow(line)
      }
      if (bucketsFull() || text.length > MAX_TEXT) {
        res.destroy()
        finish()
      }
    }
  })
  res.on('end', finish)
  res.on('error', finish)
}).on('error', (e) => {
  console.error('request error', e.message)
  finish()
})
