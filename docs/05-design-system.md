# Design system

Two sources of truth, deliberately split (Joseph, 2026-10-16):

| Layer | Source | Why |
|---|---|---|
| **Colour** | `https://mbgrowth.marketbetter.xyz/` (`mb-funnel.css`) | Superseded the Show's palette on Joseph's instruction — *"solo los colores"* |
| **Typography + geometry** | `https://www.marketbetter.xyz/` (the Show) | Unchanged: Archivo, the heading scale, the `.btn` box |

Both were extracted from the live stylesheets, not eyeballed from screenshots. The sections
below are ordered by that split — read [Colours](#colours-source-mbgrowth) for what ships
today and [the Show's palette](#superseded-the-shows-palette) only as history.

## Key finding: the fonts are free

The Show's stylesheet declares four commercial Pangram Pangram faces — **PP Monument Extended**,
**PP Agrandir Grand**, **PP Gatwick** — via `@font-face`. They look like a licensing
problem, but **they are never applied to any selector.** All 18 references sit inside
`@font-face` blocks; zero appear in a rule that targets an element. They are dead weight
inherited from an old Webflow template.

The font actually in use is **Archivo** (49 applied references), loaded from Google Fonts
at weights `300,400,500,600,700`. Free, open source, no licensing concern, available via
`next/font/google`.

**Implication:** we can match the Show's typography exactly at zero cost and zero legal
risk. Do not buy PP licenses, and do not copy the dead `@font-face` blocks forward.

## Colours (source: mbgrowth)

`mb-funnel.css` is hand-written and small (12 KB), with a single declared `:root` — no
template leftovers to filter. It ships a light and a dark theme (`:root[data-theme="dark"]`).
We use the light theme; the dark theme matters only because it supplies the accent that
stays legible on ink surfaces.

| mbgrowth var | Hex | Our token | Role here |
|---|---|---|---|
| `--accent` | `#f54e29` | `--color-accent` | **Primary action** — button background |
| `--accent-dark` | `#d63d1c` | `--color-accent-dark` | Primary button hover |
| `--accent` (dark theme) | `#ff6440` | `--color-accent-bright` | Accent on ink surfaces |
| `--structure` | `#432ead` | `--color-purple` | Eyebrows, links, focus rings |
| `--page` | `#f4f3f0` | `--color-cream` | Tinted section band |
| `--page-alt` | `#eceae5` | `--color-beige` | Second tinted band |
| `--band-card` | `#efeadc` | `--color-sand` | Warmest band (was lavender) |
| `--ink` | `#14140f` | `--color-ink` | **Primary text**, dark sections |
| `--card` | `#fffefc` | — | Within 3/255 of white; we kept `white` |

Two token renames came with the swap, because the old names would have lied about the new
values: `lime` → `accent` (the primary action is orange now) and `purple-light` → `sand`
(`#efeadc` is warm, not lavender). `orange` was folded into `accent` — they had resolved to
the same colour. `purple-bright` and `ink-deep` were dropped; nothing referenced them.

**Why `accent-bright` exists:** `#f54e29` on `#14140f` is legible but muddy at the small,
uppercase, letter-spaced sizes we use for eyebrows. mbgrowth already solved this — its dark
theme swaps in `#ff6440` (6.4:1 against ink). We use the same value in the same situation:
the footer, the dark ROI panel, and the featured pricing card.

### Superseded: the Show's palette

Kept for reference only — this is what shipped before 2026-10-16 and what the Show still
uses. Do not reintroduce it.

| Token | Hex | Role |
|---|---|---|
| Lime | `#ddf44e` | Was the primary action colour |
| Purple | `#5638ae` | Brand purple (also `--_color---dark-purple-mbs: #5639ae`) |
| Purple bright | `#8c52ff` | Accent / highlight purple |
| Lavender | `#cdd2fa` | Soft purple tint, backgrounds |
| Orange | `#f44e29` | Accent (also the Show's `--_color---orange-mbs`) |
| Cream | `#fff2d2` | Warm background |
| Beige | `#f6d6e1` | Soft pink-beige background |
| Black | `#282e32` | Primary text on light surfaces |
| Black (alt) | `#171710` | Deeper near-black, `--mb-black` |

If you ever go back to the Show's stylesheet for anything, **ignore** the `--sb-*`
namespace (old template), `--graymodern*` (a gray ramp from a different kit), and all
`--<unknown|relume-variable-*>` references — broken Relume variables that resolve to
nothing. Carrying them over would import someone else's design system on top of ours.

## Typography (source: the Show — unchanged by the colour swap)

Family: `Archivo, sans-serif` for everything — headings and body. Note mbgrowth uses Roboto;
we deliberately did **not** take that. Joseph's instruction was colours only.

| Element | Size | Weight | Line height | Letter spacing |
|---|---|---|---|---|
| h1 | `4rem` | 700 | 1 | `-0.1rem` |
| h2 | `3rem` | 700 | 1.1 | `-0.05rem` |
| h3 | `2.5rem` | 700 / 500 | 1.1 | `-0.05rem` |
| h4 | `2rem` | 500 | 1.1 | `-0.025rem` |
| h5 | `1.5rem` | 500 | 1.2 | `0` |
| body | `1rem` | 400 | 1.4 | — |

Note the deliberate pattern: **tighter negative tracking as size increases**, relaxing to
`0` by h5. Preserve this — it's what makes the headings feel like this brand rather than
default Archivo.

Body text scale (utility classes on the Show):

| Class | Size | Weight |
|---|---|---|
| `text-size-tiny` | `0.75rem` | — |
| `text-size-small` | `0.875rem` | — |
| `text-size-regular` | `1rem` | — |
| `text-size-medium` | `1.125rem` | 500 |
| `text-size-large` | `1.5rem` | 400 |

One h3 variant uses a fluid clamp: `clamp(1.5rem, 1.27143rem + 1.14286vw, 2.3rem)`.
Worth adopting fluid type for headings generally on the rebuild — the fixed `4rem` h1 will
be too large on mobile otherwise.

## Primary button

The canonical `.button` — geometry from the Show, colours from mbgrowth:

```css
background: #f54e29;        /* accent  (was #ddf44e lime) */
color: #ffffff;             /* (was #282e32 black)        */
border-radius: 10px;
padding: 0.75rem 1.75rem;
font-family: Archivo, sans-serif;
font-size: 0.9rem;
font-weight: 600;
line-height: 1;
letter-spacing: 0.02rem;
white-space: nowrap;
transition: border-color .3s, color .3s, background-color .3s;
```

Note `letter-spacing: 0.02rem` — positive tracking on buttons, opposite of the headings.

`.button-group` uses `gap: 1rem`, `flex-wrap: wrap`, `align-items: center`.

**Ignore `.button-2` through `.button-10`.** They're Relume/template leftovers with
inconsistent values (`#d14424`, 100px radius, broken variable refs) and no relationship to
the brand. Only `.button` reflects current design intent.

## As implemented

Tailwind 4 is configured CSS-first, so there is no `tailwind.config.ts` — the tokens live
in the `@theme` block of `web/app/globals.css`, which is the executable version of
everything above:

```css
@theme {
  --color-accent: #f54e29;
  --color-accent-dark: #d63d1c;
  --color-accent-bright: #ff6440;
  --color-purple: #432ead;
  --color-cream: #f4f3f0;
  --color-beige: #eceae5;
  --color-sand: #efeadc;
  --color-ink: #14140f;

  --font-sans: var(--font-archivo), sans-serif;
  --radius-btn: 10px;
}
```

## Logo

`web/public/mb-logo.png` — the stacked wordmark ("market" over "better."), supplied by
Joseph 2026-10-16 at 1247×717. `web/public/mb-logo-dark.png` is the cream-on-dark variant
taken from mbgrowth, used in the footer where the near-black default would disappear.

Being stacked rather than single-line, it needs roughly twice the height to stay readable —
mbgrowth renders it at 42px, we use 36px (`h-9`) in the header and footer.

## Mike's design (`/mike`) — a third, separate source

Added 2026-10-16 on Joseph's request: *"otra version de esta pagina web como lo diseño
Mike."* This is `market-better.lovable.app` rebuilt inside our Next.js app, so the two
directions can be compared on one dev server instead of across two platforms.

Everything above describes the in-house rebuild at `/`. **Mike's version shares none of
it** — different palette, different typeface, different geometry. Keeping them apart is
the whole point, so its tokens carry an `mk-` prefix inside the same `@theme` block.

Lovable stores its palette as HSL triplets in `:root` inside
`assets/index-lat2Vftg.css`. Converted to hex:

| Lovable var | Our token | Hex | Role |
|---|---|---|---|
| `--background` | `--color-mk-bg` | `#efeadc` | Page background — the same sand as ours, by coincidence |
| `--foreground` | `--color-mk-fg` | `#161519` | Body text |
| `--primary` | `--color-mk-primary` | `#432ead` | The purple bands — the same purple as mbgrowth |
| `--accent` | `--color-mk-accent` | `#ff4124` | Orange-red, on nearly every heading |
| `--secondary` | `--color-mk-secondary` | `#ada4d0` | The struck-through "vanity metrics" text |
| `--muted-foreground` | `--color-mk-muted-fg` | `#605e68` | Secondary copy |
| `--border` | `--color-mk-border` | `#b6b5c0` | Hairlines, slider track |
| `--card` | `--color-mk-card` | `#ffffff` | The non-featured pricing card |
| `--panel-ink` | `--color-mk-panel-ink` | `#121212` | The featured pricing card |
| `--peach` | `--color-mk-peach` | `#ffd9cc` | That card's border |

Worth noting: Mike's purple is `#432ead`, byte-identical to mbgrowth's. The two designs
are less far apart than they look — the real divergence is the typeface and the accent.

**Typeface: Poppins** 400–800 via `next/font/google`, exposed as `--font-display` so
`font-display` works as a Tailwind utility. (mbgrowth uses Roboto, the Show uses Archivo,
Lovable uses Poppins — three sites, three typefaces.)

**The heading conflict, and how it's resolved.** Our base layer gives `h1`–`h5` a fixed
scale with negative tracking. Lovable does the opposite: it strips headings to
`font-size: inherit; font-weight: inherit` and sizes each one with a utility class
(`text-9xl`, `leading-[.94]`, and so on). Both can't be globally true, so the reset is
scoped to a `.theme-mike` wrapper applied by the `/mike` layout. A class selector
outranks bare element selectors in the base layer, and utilities outrank both — exactly
the cascade order we need.

**Route layout.** `app/(show)/` is a route group holding the in-house version, so it can
own its header/footer without changing any URL. `app/mike/` is a real segment with its
own layout, header, and footer. The root layout now only owns `<html>`/`<body>` and loads
both fonts.

**Not reproduced:** Lovable bundles testimonial avatars and client logos as PNGs (Credit
Repair Cloud, DFY Real Estate, AAICT). We don't have those assets, so those cards render
attribution as text. Also not reproduced: Lovable's Supabase form wiring — the form posts
to a LeadConnector webhook instead, see [open questions](04-open-questions.md).

## Open items

- **Spacing scale** — the Show's section padding is scattered across per-component Webflow
  classes with no coherent scale. Recommend defining a clean one for the rebuild rather
  than reverse-engineering the inconsistency.
- **Dark sections** — the Show uses dark backgrounds (`#06090e` appears on `.button-2`).
  Confirm with Mike whether the corporate site should carry dark sections too.
