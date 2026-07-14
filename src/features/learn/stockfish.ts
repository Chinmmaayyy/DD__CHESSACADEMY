/**
 * Thin UCI client for Stockfish 18 (lite, single-threaded) running in a Web Worker.
 * Single-threaded means no SharedArrayBuffer, so it works on plain static hosting.
 *
 * If the engine fails to load for any reason, callers fall back to the built-in
 * JS engine — the game never breaks.
 */
const ENGINE_URL = '/engine/stockfish-18-lite-single.js'

export interface EngineMove {
  from: string
  to: string
  promotion?: string
}

type Listener = (line: string) => void

let worker: Worker | null = null
let failed = false
const listeners = new Set<Listener>()

function ensureWorker(): Worker | null {
  if (worker) return worker
  if (failed || typeof window === 'undefined') return null
  try {
    const w = new Worker(ENGINE_URL)
    w.onmessage = (e: MessageEvent) => {
      const line: string =
        typeof e.data === 'string' ? e.data : ((e.data && e.data.data) as string) || ''
      if (line) listeners.forEach((l) => l(line))
    }
    w.onerror = () => {
      failed = true
      worker = null
    }
    w.postMessage('uci')
    w.postMessage('isready')
    worker = w
    return w
  } catch {
    failed = true
    return null
  }
}

/** Start loading the engine early (the WASM is ~7 MB) so the first move isn't slow. */
export function warmupEngine(): void {
  ensureWorker()
}

export function engineAvailable(): boolean {
  return !failed
}

/**
 * Ask Stockfish for the best move.
 * Resolves to null if the engine is unavailable or times out (caller should fall back).
 */
export function stockfishBestMove(
  fen: string,
  opts: { skill: number; depth: number; movetime: number; timeoutMs?: number },
): Promise<EngineMove | null> {
  const { skill, depth, movetime, timeoutMs = 20_000 } = opts
  return new Promise((resolve) => {
    const w = ensureWorker()
    if (!w) return resolve(null)

    let settled = false
    const finish = (result: EngineMove | null) => {
      if (settled) return
      settled = true
      listeners.delete(onLine)
      window.clearTimeout(timer)
      resolve(result)
    }

    const onLine = (line: string) => {
      if (!line.startsWith('bestmove')) return
      const uci = line.split(/\s+/)[1]
      if (!uci || uci === '(none)') return finish(null)
      finish({
        from: uci.slice(0, 2),
        to: uci.slice(2, 4),
        promotion: uci.length > 4 ? uci[4] : undefined,
      })
    }

    // Generous timeout: the first call also downloads/compiles the WASM.
    const timer = window.setTimeout(() => finish(null), timeoutMs)

    listeners.add(onLine)
    try {
      w.postMessage(`setoption name Skill Level value ${skill}`)
      w.postMessage(`position fen ${fen}`)
      w.postMessage(`go depth ${depth} movetime ${movetime}`)
    } catch {
      finish(null)
    }
  })
}
