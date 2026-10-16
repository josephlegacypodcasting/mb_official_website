# Open questions

Mike asked "What do you need from me\us?" — this is the answer. Reprioritized 2026-10-16
after the decision to prototype on Vercel first and defer all domain work.

## Blocking the Vercel prototype (Phase 1)

**Starting point — RESOLVED (Joseph, 2026-10-16):** rebuild from scratch, no Lovable
export. Typography and geometry match `marketbetter.xyz`; **colours match
`mbgrowth.marketbetter.xyz`** (Joseph, 2026-10-16 — colours only, nothing else).
See [design system](05-design-system.md).

**Logo — RESOLVED (Joseph, 2026-10-16):** wordmark supplied, now at
`web/public/mb-logo.png`, with the cream-on-dark variant for the footer. Still outstanding
is whether a vector original exists — a PNG is fine at the sizes we use, but an SVG would
be better if someone has it.

**Access needed now:**
- [ ] Vercel account (or create one for Market Better)
- [ ] Git host — GitHub org for Market Better, or a personal repo for now?
- [ ] Lovable project access — for content/copy reference and any custom imagery
- [ ] Team photos, if the team page is in scope for v1

**Dark sections?** The Show uses dark backgrounds in places, and so do we (the ROI panel,
the featured pricing card, the footer). Should the corporate site keep them?
→ **Mike.**

**Contact form destination.** Where does the current Lovable "Let's Talk" form send
submissions? If we rebuild without wiring the same destination, inbound leads vanish
silently — and Mike's whole concern is prospects.
→ **Joseph / whoever set up Lovable.**

## Worth raising with Mike now

**The 48h expectation.** Mike asked for the site live within 48h because prospects are
confused *today*. Prototyping on Vercel first is the sounder path, but it means
`marketbetter.xyz` keeps showing the Show for longer. He should know and agree — if the
confusion is actively costing deals, we can ship a holding version to the domain early.
→ **Mike.**

**Contrast / dangling subdomain.** `show.marketbetter.xyz` points at
`customers.getcontrast.io` and is misconfigured. This is a subdomain-takeover-shaped risk
that exists regardless of this project, so it's worth cleaning up even while domains are
parked. Is Contrast still in use for the Show?
→ **Alej / Anna.**

## Parked until domain cutover (Phase 4+)

- [ ] GoDaddy registrar/DNS access for `marketbetter.xyz` and `marketbetter.io`
- [ ] Webflow account access (the Show)
- [ ] Google Workspace super-admin for the `.xyz` domain
- [ ] Google Analytics / GTM access, to baseline Show traffic and build the redirect map
- **Decision — Show URL.** Now cheaper than originally assessed: hosting on Vercel means
  `/show` can be a `vercel.json` rewrite rather than a Cloudflare Worker. We can test it on
  locally and give Mike a real answer instead of a trade-off.
  See [the plan](03-plan.md#decision-the-show-url).
- **Change window** for the DNS flip, with someone available to verify.

## Needed before cutover

- **Is the Show's email capture ("10k+ Marketing Nerds") wired to a list tool?** Moving
  domains can break form endpoints. Which platform?
- **Sponsor commitments.** Does any sponsor agreement reference `marketbetter.xyz` URLs
  specifically? Changing them may need a heads-up.
- **Backlinks / collateral.** Where is `marketbetter.xyz` published — sales decks, email
  signatures, podcast directories, YouTube descriptions, social bios? Each needs updating
  at cutover.
- **Podcast/episode distribution.** If episodes syndicate via RSS pointing at `.xyz`, the
  feed URL change needs care — directories can drop a show on a bad redirect.

## Scope confirmations

- **v2 content.** Mike mentioned a team page "and a few other things." What's the full
  list? The Webflow Show site already has a "The Team" page — can we reuse that content?
- **`.xyz` after the `.io` move.** Confirm we keep it registered and redirecting
  permanently rather than letting it expire.
- **Email domain.** Confirm the target is `@marketbetter.io` for everyone, so the LM
  migration project creates mailboxes there once instead of migrating twice.

## Assumptions we're making unless corrected

1. The prototype is built on Vercel; Lovable becomes a content/design reference rather than
   the production host.
2. The Lovable site's content is close enough to final to prototype against — v2 polish
   comes later.
3. The Show stays on Webflow; rebuilding it is out of scope.
4. No client-facing asset is served from `marketbetter.xyz` today (per the audit, it's the
   Show only) — so the cutover carries no client risk.
5. `marketbetter.io` is fully controlled by Market Better and nothing currently depends on
   it (it's parked, no mail).
