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

### What the ROI calculator contributes

If a prospect moves anything in the ROI calculator, what they modelled rides along with
whatever contact form they submit afterwards. The calculator and the form sit in
different parts of the tree — the footer on Mike's version, a CTA section on the
in-house one — so a `RoiProvider` in the root layout carries the snapshot between them
(`web/components/roi-context.tsx`). It survives client-side navigation through React
state and a full reload through `sessionStorage`, which is per-tab and never leaves the
browser except on an actual submission.

**Only a touched calculator is reported.** The in-house version starts at illustrative
defaults rather than zero, so without that guard every lead would arrive carrying
numbers the prospect never chose. A lead with `roi_used: false` means "did not engage
with it", not "modelled all zeroes".

Fields are flattened to prefixed top-level keys (`roi_acv`, `roi_multiple`,
`roi_summary`, …) because GoHighLevel maps inbound webhook fields one at a time and
nested paths are awkward to wire up there. `roi_summary` is a single human-readable line
so whoever picks the lead up sees the context without expanding fifteen custom fields.

`roi_cost_basis_months` travels with the numbers because **the two versions do not
compute the same multiple**: the in-house model divides 24 months of revenue by 24
months of cost, Mike's reproduces Lovable and divides by 12. Identical inputs therefore
produce roughly double the ROI on `/mike`. See the gap below.

### Verification

Run against a local echo server rather than the live CRM, so no test leads reached
Mike's pipeline:

| Case | Result |
|---|---|
| Submit on `/` | 200, payload `source: "in-house"` ✓ |
| Submit on `/mike` | 200, payload `source: "mike"` ✓ |
| Missing name / phone, blank-after-trim, bad email shape | 400 `invalid_fields` ✓ |
| Malformed JSON body | 400 `invalid_json` ✓ |
| 500-char field | truncated to 300 before forwarding ✓ |
| Webhook unreachable | 502, form shows an error and **keeps** what was typed ✓ |
| Submit with calculator untouched (both versions) | `roi_used: false`, zero `roi_*` fields ✓ |
| Submit after touching it, same page | full ROI block, matches the on-screen figures ✓ |
| Model on `/mike/roi-calculator`, submit on `/mike/pricing` | snapshot survives client nav ✓ |
| Same, after a full page load | snapshot survives via `sessionStorage` ✓ |
| ROI block partial, `NaN`, a string, or an array | dropped whole, `roi_used: false`; the lead still goes through ✓ |

Arithmetic was cross-checked independently rather than read off the screen. Mike's
version with ACV $325,000 / 15 appts / 40% close / $4,900 retainer… reproduces the
figures in the design exactly: 6.0 deals/mo, $23,400,000 year 1, $12,870,000 year 2,
$7,236 invested, 5012.4x. The in-house version at $60,000 / 20 / 30% / 70% renewal
gives 18.1x on $405,600 over 24 months.

Grepped both production builds: the URL appears in no build artifact, client or server —
it is read from the environment at runtime.

## Known gaps before this is shippable

1. **The two versions disagree on the ROI multiple.** Both headline it as "24-month
   projected ROI", but the in-house calculator divides 24 months of revenue by 24
   months of cost while Mike's divides by 12 — faithfully reproducing Lovable, which is
   where the inflated figure comes from. Identical inputs give roughly double the ROI on
   `/mike`. This is prospect-facing and now also flows into the CRM, so whichever
   version ships needs a deliberate answer: correct Mike's to 24 months, or relabel it.
   → **Joseph / Mike.**
2. **`LEAD_WEBHOOK_URL` must be set in Vercel** before Phase 3. If it is missing the route
   returns 500 and the form shows an error — chosen over failing silently, but it means a
   deploy without the variable collects nothing.
3. **No team page.** Deferred to v2 per Mike, pending content.
4. **Show link points at `marketbetter.xyz`** (the live Show). Centralized in `web/lib/site.ts`
   as `SHOW_URL` so the cutover is a one-line change.
5. **Testimonials have no photos/logos** — text only. The Lovable v1 had a logo wall
   ("TRUSTED BY LEADERS AT") that needs assets to reproduce.
