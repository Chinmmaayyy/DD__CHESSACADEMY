# DD Chess Academy — Theme Palettes

The site supports two themes. **Dark theme = the current design** (navy `#0B1220`
+ gold). **Light theme** uses the palette below (provided by the client).

## Light theme (semantic tokens)
| Token | HSL | Hex |
|---|---|---|
| `--background` | 210 33% 98% | `#F8FAFC` |
| `--foreground` | 220 30% 18% | `#20293C` |
| `--card` / `--popover` | 0 0% 100% | `#FFFFFF` |
| `--primary` | 220 70% 50% | `#2662D9` |
| `--primary-foreground` | 0 0% 100% | `#FFFFFF` |
| `--secondary` (gold) | 45 90% 55% | `#F4C025` |
| `--secondary-foreground` | 220 30% 18% | `#20293C` |
| `--accent` (green) | 145 55% 44% | `#66AE33` |
| `--destructive` | 0 84% 60% | `#EF4444` |
| `--muted` | 210 20% 94% | `#EDF0F3` |
| `--muted-foreground` | 220 15% 45% | `#626D84` |
| `--border` / `--input` | 210 20% 90% | `#E0E6F0` |
| `--ring` | 220 70% 50% | `#2662D9` |

### Accent / utility pastels
| Token | Hex |
|---|---|
| `--gold` | `#F4C025` |
| `--gold-light` | `#FBD460` |
| `--sky` | `#DAF0FB` |
| `--peach` | `#FBE8DF` |
| `--lavender` | `#EDE6F9` |
| `--mint` | `#ECF5E0` |

## Implementation plan (theme toggle)
1. Add semantic CSS variables for both themes under `:root[data-theme='dark']`
   and `:root[data-theme='light']` in `index.css`.
2. Convert component surfaces to semantic utilities (`bg-[var(--card)]`,
   `text-[var(--foreground)]`, `border-[var(--border)]`, etc.).
3. `ThemeProvider` + toggle in the navbar; persist to `localStorage`; default
   follows system preference.
