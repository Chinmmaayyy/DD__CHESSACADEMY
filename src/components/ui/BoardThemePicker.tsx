import { BOARD_THEMES } from '@/features/learn/boardTheme'
import { cn } from '@/lib/utils'

/** Chess.com-style board colour swatches. */
export function BoardThemePicker({
  value,
  onChange,
}: {
  value: string
  onChange: (id: string) => void
}) {
  return (
    <div className="rounded-2xl border border-hairline bg-surface p-4">
      <div className="mb-3 flex items-center justify-between">
        <p className="text-xs uppercase tracking-wider text-muted">Board theme</p>
        <p className="text-xs font-semibold text-muted">
          {BOARD_THEMES.find((t) => t.id === value)?.name}
        </p>
      </div>
      <div className="flex flex-wrap gap-2">
        {BOARD_THEMES.map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => onChange(t.id)}
            title={t.name}
            aria-label={`Board theme: ${t.name}`}
            aria-pressed={value === t.id}
            className={cn(
              'size-9 overflow-hidden rounded-lg border-2 transition-transform hover:scale-110',
              value === t.id ? 'border-gold-500' : 'border-hairline',
            )}
          >
            <span className="grid size-full grid-cols-2 grid-rows-2">
              <span style={{ background: t.light }} />
              <span style={{ background: t.dark }} />
              <span style={{ background: t.dark }} />
              <span style={{ background: t.light }} />
            </span>
          </button>
        ))}
      </div>
    </div>
  )
}
