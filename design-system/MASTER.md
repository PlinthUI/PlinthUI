# PlinthUI design system

One system, tokens first. Everything below is implemented in `app/globals.css`.

## Read and dials

Product app surface with a marketing home, for developers. Precise, calm, instrument-like.
`DESIGN_VARIANCE 5`, `MOTION_INTENSITY 4`, `VISUAL_DENSITY 6`.

## Color tokens

| Token | Light | Dark | Use |
|---|---|---|---|
| `--background` | `#F6F7F9` | `#0E1014` | page |
| `--card` / `--popover` | `#FBFBFC` | `#151921` | surfaces |
| `--foreground` | `#14171C` | `#E8EAEE` | text |
| `--muted-foreground` | `#586070` | `#9099A8` | secondary text (AA on background) |
| `--border` | `#DDE1E8` | `#262B35` | hairlines |
| `--primary` | `#3250C8` | `#8497EA` | the one accent (about 60% saturation) |
| `--stage` | `#EEF0F4` | `#12151B` | PlinthStage surface |
| `--base` | `#D3D8E1` | `#07080A` | plinth base slab |

Neutral lock: cool greys only. No pure black or white. Shadows are tinted (`--shadow`).
Accent lock: `--primary` is the only accent, used for primary actions, focus and active state.
Semantic: `--success`, `--warning`, `--destructive`, never used alone to convey meaning.

## Type

Geist (sans) and Geist Mono via the `geist` package, self hosted.
Scale (px): 12, 13, 14, 16, 20, 28, 44. Display weight 600, tracking -0.02em, `text-wrap: balance`.
Mono is for plaques, file paths, shortcuts and code. Numbers in data use `tabular-nums`.
No uppercase tracked labels anywhere (zero eyebrows).

## Shape lock

Controls 8px, cards and plinths 12px, chips 6px, avatars full. Icons: Lucide, one family, stroke 1.75.

## Spacing and layout

4px grid. Page max width 1400px, 16px gutter on mobile, 24px from `sm`. Nav is one line, 64px.
Dense surfaces (explorer, detail) use 12 to 16px gaps. Home sections use 64 to 96px rhythm.

## Plinth anatomy (the signature element)

`PlinthStage` is used identically on cards, the detail page and the compare view.

1. **Stage**: `.plinth-stage`, a softly lit surface (radial glow from the top, inset top highlight), 12px top radius.
2. **Base**: `.plinth-base`, an 8px slab inset 10px each side, darker, with a tinted lift shadow.
3. **Plaque**: `.plinth-plaque`, a mono strip inset under the base: source, license (lock icon when not redistributable), frameworks.

Cards render the preview scaled and non-interactive (`inert`), mounted lazily. Detail and compare mount live previews inside an `@container` so the width switch (375, 768, full) exercises real container queries.

## Motion

Transform and opacity only. Honors `prefers-reduced-motion` (global reduce block).
Durations: 120ms press, 150 to 250ms state, 420ms load-in. Ease-out for entering.

- `rise`: grid cards cascade in, 35ms stagger. Shows hierarchy on load.
- `press`: scale 0.98 on active. Feedback.
- Sliding indicators (tabs, segmented): translate only. State transition.
- Width switch: 200ms fade on the stage. State transition.

No marquee, no scroll listeners, no custom cursors, no parallax.

## States

Every list has a skeleton shaped like its final layout, a composed empty state and an error boundary with a recovery path. Destructive actions are confirmed or undoable.

## Banned in this project

Em dashes and en dash separators, eyebrow labels, three equal feature cards, div-built fake product UI, decorative status dots, version strings in the footer, purple gradients.

## Dark theme override

Dark mode is pure black (`#000000`) with neutral greys and no accent: `--primary` is near-white `#EDEDED` with black text. Light mode keeps the cobalt accent. Set by the owner after Phase 1.
