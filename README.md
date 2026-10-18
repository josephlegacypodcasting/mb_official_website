# Market Better — Website Migration (archived)

> **Active work moved on 2026-10-18.**
> Joseph approved **Mike's design**, which lives at the root of
> [`mb-website-2026`](https://github.com/josephlegacypodcasting/mb-website-2026).
> That repo now carries the site, the docs and the deployment.
>
> This repo is kept as the record of how the decision was reached: it holds both
> design directions side by side (`/` in-house, `/mike` Mike's) and the full
> comparison. **Nothing here is deployed, and its docs are frozen at the point of the
> move** — do not treat them as current.

Project scope: get the new Market Better corporate site live on the right domain,
relocate the Market Better Show, and consolidate everything onto `marketbetter.io`.

Requested by Mike McGrath (Slack, 2026-10-15). Website is the time-pressing half of
his two-part ask — the other half (LM → MB email/G-Suite migration) is tracked
separately but shares the domain decisions made here.

## Approach

**Local review first, then deploy, domains last.** The site is built and reviewed on
localhost. Once approved it gets deployed to Vercel; only after that do we touch DNS. This
keeps three separate risks from being debugged at once: "is the site right?", "does it
deploy?", and "is the cutover safe?"

## Status

| Phase | Goal | Target | State |
|---|---|---|---|
| 1 | Rebuild locally — two design directions to choose between | — | **Done — Mike's design chosen 2026-10-18** |
| 2 | v2 content (team page, design polish) | Alongside Phase 1 | Backlog |
| 3 | Deploy to Vercel | After local approval | Not started |
| 4 | Domain cutover: site → `marketbetter.xyz`, Show relocated | After deploy | Deferred, on hold |
| 5 | Consolidate onto `marketbetter.io` | After Phase 4 | Deferred |
| 6 | Email migration LM → MB on `.io` | 2026-10-31 | Separate project, depends on Phase 5 |

## Run it locally

For comparison only — the shipping site is in the other repo.

```bash
cd web && npm run dev -- -p 3100
```

- **<http://localhost:3100/>** — the in-house rebuild that was *not* chosen: mbgrowth
  colours, the Show's Archivo
- **<http://localhost:3100/mike>** — the approved design, now shipped from
  `mb-website-2026` at the root instead

See [local dev notes](docs/06-local-dev.md) — including why `node_modules` is symlinked
off this drive.

## Docs

- [Brief](docs/01-brief.md) — Mike's request verbatim + interpreted scope
- [Current state audit](docs/02-current-state.md) — DNS, hosting, what's actually live today
- [Execution plan](docs/03-plan.md) — phased steps, with the `/show` decision called out
- [Open questions](docs/04-open-questions.md) — what we need from Mike/Alej/Anna
- [Design system](docs/05-design-system.md) — the in-house tokens, plus Mike's as a separate set
- [Local dev](docs/06-local-dev.md) — how to run it, what's verified, what's still missing

## Known decision, parked until the cutover

Mike asked for the Show at `marketbetter.xyz/show`. That's a **path** on a domain whose
root will be served by a different platform, while the Show lives on Webflow. Two
platforms cannot both own the root of one domain. Not urgent while we're running locally,
but it needs an answer before cutover — and hosting on Vercel makes it cheaper than first
assessed. See [the plan](docs/03-plan.md#decision-the-show-url).
