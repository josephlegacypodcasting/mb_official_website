# Local development

**Nothing is deployed.** Per Joseph (2026-10-16): review locally, approve, then deploy.
No Vercel project exists yet and no domain is configured.

## Run it

```bash
cd web
npm run dev -- -p 3100
```

Then open <http://localhost:3100>.

Two versions run side by side:

| Version | Routes | Theme |
|---|---|---|
| **In-house rebuild** | `/`, `/how-it-works`, `/pricing`, `/roi` | mbgrowth colours + the Show's Archivo |
| **Mike's design** | `/mike`, `/mike/how-it-works`, `/mike/pricing`, `/mike/roi-calculator` | rebuilt from `market-better.lovable.app` — Poppins, purple/orange |

They share nothing but the Next.js app shell. See [design system](05-design-system.md)
for how the two token sets are kept apart.

Production build check: `npm run build`.

## node_modules lives outside the project folder

`web/node_modules` is a **symlink** to `~/.mb-node-modules/marketbetter-web`.

Reason: this project sits on the TOSHIBA EXT drive, which is NTFS mounted through a
third-party driver. Writing 300 small files there took **2.67s vs 0.035s** on the internal
disk — roughly 76x slower. A Next.js `node_modules` is ~30k files, so installs and dev-server
file watching on the external drive are painfully slow and the NTFS driver is also a known
source of spurious file-watching failures.

Source code stays on the external drive (where the project belongs); only dependencies live
locally. This is transparent to Next.js and npm.

**Consequence:** `node_modules` won't travel with the folder. On another machine, recreate it:

```bash
mkdir -p ~/.mb-node-modules/marketbetter-web
cd web && ln -sfn ~/.mb-node-modules/marketbetter-web node_modules && npm install
```

If you'd rather not deal with the symlink, move the whole project to the internal disk —
that's the cleaner long-term fix, especially once this becomes a git repo.

## Stack

- Next.js 16.4.2 (App Router), React 19, TypeScript
- Tailwind CSS 4 (CSS-first config in `app/globals.css`, no `tailwind.config.ts`)
- Archivo via `next/font/google`

**On versions:** the initial scaffold pinned Next 15.5.4 + Tailwind 3, which `npm audit`
flagged with a **critical RCE in the React flight protocol** plus a high-severity DoS in
Tailwind 3's `braces` dependency chain. Upgrading to Next 16.4.2 and Tailwind 4 clears both
— `npm audit` now reports **0 vulnerabilities**. Keep it that way; don't downgrade to Tailwind 3
for the sake of the old JS config format.

## Verified locally

- `npm run build` — compiles clean, all 8 routes prerendered static
- All routes return HTTP 200 on the dev server
- Archivo loaded and wired to `--font-archivo`
- Show button renders in header (`btn btn-primary`) and footer, pointing at the live Show
- ROI calculator math hand-checked against the rendered output at default assumptions:
  20 appts × 20% = 4 deals/mo → 48 deals year 1 → $1,200,000; renewals 33.6 → $840,000;
  investment $405,600; net $1,634,400; **5.0x** ✓
- Rendered at 1280×900 and 375×812 across all 4 routes; no console errors

Computed styles read back off the running page after the mbgrowth colour swap
(2026-10-16) — these are measured, not assumed:

| Checked | Expected | Measured |
|---|---|---|
| `.btn-primary` background | `#f54e29` | `rgb(245, 78, 41)` ✓ |
| `.btn-primary` text | white | `rgb(255, 255, 255)` ✓ |
| Eyebrow | `#432ead` | `rgb(67, 46, 173)` ✓ |
| Sand band | `#efeadc` | `rgb(239, 234, 220)` ✓ |
| Body text | `#14140f` | `rgb(20, 20, 15)` ✓ |
| h1 family / tracking | Archivo / `-0.1rem` | `Archivo` / `-1.6px` ✓ |

The last row is the one that matters for scope: the colour swap left typography untouched.

### Mike's version (`/mike`)

Measured on the running page at 1280px, after the rebuild (2026-10-16):

| Checked | Expected (Lovable) | Measured |
|---|---|---|
| Page background | `#efeadc` | `rgb(239, 234, 220)` ✓ |
| Accent | `#ff4124` | `rgb(255, 65, 36)` ✓ |
| h1 family / size / weight | Poppins / `text-9xl` / 600 | `Poppins` / `128px` / `600` ✓ |
| h1 tracking | none (Lovable resets it) | `normal` ✓ |
| Headers rendered | 1 | 1 ✓ (the in-house chrome does not leak in) |

ROI calculator cross-checked against Lovable's formula: ACV $50,000, 20 appointments,
25% close, $7,500 retainer, $600/appointment, 50% renewal → 5.0 deals/mo, $3,000,000
year 1, $1,500,000 year 2, $234,000 invested, **19.2x** ✓

Back on `/`, the in-house version still reads `Archivo` / `-1.6px` with one header and
one footer — moving it into a route group changed nothing visible.

## Contact forms

Both versions post to `/api/lead`, which forwards server-side to the LeadConnector
webhook. It runs on the server for two reasons: the webhook URL is an unauthenticated
capability and both repos are public, and a browser POST with a JSON content type
triggers a CORS preflight the webhook does not answer.

Set it up locally by copying `web/.env.example` to `web/.env.local` and filling in:

```
LEAD_WEBHOOK_URL=https://services.leadconnectorhq.com/hooks/…
```

`.env.local` is gitignored. Do **not** rename the variable to `NEXT_PUBLIC_*` — that
inlines it into the public client bundle.

Verified end-to-end against a local echo server rather than the real CRM, so no test
leads were written to Mike's pipeline:

| Case | Result |
|---|---|
| Submit on `/` | 200, payload `source: "in-house"` ✓ |
| Submit on `/mike` | 200, payload `source: "mike"` ✓ |
| Missing name / phone, blank-after-trim, bad email shape | 400 `invalid_fields` ✓ |
| Malformed JSON body | 400 `invalid_json` ✓ |
| 500-char field | truncated to 300 before forwarding ✓ |
| Webhook unreachable | 502, form shows an error and **keeps** what was typed ✓ |

Grepped both production builds: the URL appears in no build artifact, client or server —
it is read from the environment at runtime.

## Known gaps before this is shippable

1. **`LEAD_WEBHOOK_URL` must be set in Vercel** before Phase 3. If it is missing the route
   returns 500 and the form shows an error — chosen over failing silently, but it means a
   deploy without the variable collects nothing.
2. **No team page.** Deferred to v2 per Mike, pending content.
3. **Show link points at `marketbetter.xyz`** (the live Show). Centralized in `web/lib/site.ts`
   as `SHOW_URL` so the cutover is a one-line change.
4. **Testimonials have no photos/logos** — text only. The Lovable v1 had a logo wall
   ("TRUSTED BY LEADERS AT") that needs assets to reproduce.
