# PlinthUI

One place to discover, preview, compare and save UI components from many libraries, with the original source and license shown on every entry.

The name comes from the base a sculpture stands on so it can be seen properly. Every component here is shown on a **plinth** (a lit preview stage) with a **plaque** underneath carrying its source, license and framework.

> **Demo data.** Phase 1 ships realistic mock entries. Every preview and every line of code was written for this project. Source names such as shadcn/ui or Tailwind Plus are labels in the dataset, not endorsements, and entries are illustrative. Verify licenses with each project before using anything.

## Phase roadmap

| Phase | Scope | Status |
|---|---|---|
| 1 | Complete frontend with mock data, no backend | This repository |
| 2 | Zod schemas in a database (Supabase), sandboxed iframe previews | Planned |
| 3 | Ingestion with Firecrawl and Claude | Planned |
| 4 | Playground and framework specific code | Planned |
| 5 | Accounts and a community registry | Planned |

## What is in Phase 1

- **Home**: hero with search and a live plinth, ranked rows, new and noteworthy rail, category index, compare teaser, open source versus premium policy.
- **Explore**: faceted filters (kind, category, source, license kind, framework, style), search, sort, density toggle, URL synced state, pagination.
- **Component detail**: preview with a 375 / 768 / full width switch, variants, Code, Install (CLI or manual, pnpm, npm, yarn, bun), Props, Source and License, related items, "Copy as agent prompt".
- **Compare**: up to three entries on separate plinths with one shared width switch and an attribute table. Shareable as `/compare?items=a,b,c`.
- **Collections**: named local collections, rename, delete with undo, JSON export and import. Stored in `localStorage` with every access wrapped in try/catch.
- **Sources**: directory with counts and the license policy.
- **Command palette** on `Ctrl+K` or `Cmd+K`.

## Run it

```bash
npm install
npm run dev        # http://localhost:3000
npm run typecheck  # tsc --noEmit
npm run lint
npm run test:search  # search acceptance test
npm run build && npm start
```

Requires Node 20 or newer. Next.js 15, Tailwind CSS v4, TypeScript strict.

## How the data layer works

```
data/entries/*.ts     compact entry definitions (mock)
data/sources.ts       source directory
lib/schema.ts         Zod schemas and types (ComponentEntry, Provenance)
lib/repository.ts     the only data interface: list, get, search, related, sources
lib/search.ts         client side scorer with light stemming and a synonym map
previews/*.tsx        one original, working preview per entry
previews/registry.tsx previewId to component map
components/plinth/    PlinthStage, Plaque, ItemCard, FilterRail, CommandPalette ...
design-system/MASTER.md  tokens, type, shape, motion, plinth anatomy
```

Pages never import mock data or previews directly. They call `repository` and render previews only through `<PlinthStage previewId>`. In Phase 2 the repository body moves to Supabase and the registry lookup in `PlinthStage` becomes a sandboxed iframe, with no page changes.

For redistributable entries the repository reads `previews/<id>.tsx` from disk and serves it as the entry's code, so the code you see is the code that runs. Entries with `redistributable: false` never receive code. The Code tab shows a locked state and links to the source.

## Licensing and attribution

PlinthUI is licensed under the terms in `LICENSE`. Component entries shown in the product carry their own license field. Premium entries are never redistributed.
