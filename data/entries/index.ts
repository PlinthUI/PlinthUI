import { ComponentEntrySchema, type ComponentEntry } from "@/lib/schema"
import { entry } from "./define"

/**
 * Add entries here, built with entry() from ./define. Parsed once so a
 * malformed entry fails the build instead of a page.
 */
const DRAFTS: unknown[] = [
  entry({
    slug: "portfolio-hero", title: "Parallax photo hero", kind: "section", category: "Landing Page Sections",
    summary: "Full-bleed photo hero with layered scroll parallax: background, floating portraits and text each move at their own speed. Static for reduced motion.",
    tags: ["hero", "portfolio", "landing", "parallax", "scroll"], synonyms: ["banner", "intro", "above the fold", "parallax hero", "animated"],
    source: "shreekumar-b", author: "shreekumar", style: "animated", deps: ["lucide-react", "motion"],
    popularity: 500, created: "2026-11-12", updated: "2026-11-12",
  }),
  entry({
    slug: "proof-stats", title: "Proof stats", category: "Data Display",
    summary: "Four achievement stats that count up once when scrolled into view, and stay static for reduced motion.",
    tags: ["stats", "numbers", "achievements", "counter"], synonyms: ["metrics", "kpi", "social proof", "animated counter"],
    source: "shreekumar-b", author: "shreekumar", style: "animated",
    popularity: 480, created: "2026-11-12", updated: "2026-11-12",
  }),
  entry({
    slug: "project-grid", title: "Filterable project grid", kind: "section", category: "Landing Page Sections",
    summary: "Sixteen project tiles with category filters and an image reveal on hover and keyboard focus.",
    tags: ["projects", "portfolio", "grid", "filter", "gallery"], synonyms: ["work", "case studies", "showcase"],
    source: "shreekumar-b", author: "shreekumar", style: "minimal",
    popularity: 470, created: "2026-11-12", updated: "2026-11-12",
  }),
  entry({
    slug: "marquee-footer", title: "Marquee footer", kind: "section", category: "Full Sections",
    summary: "Footer with page and social links over a large scrolling word band that can be paused.",
    tags: ["footer", "marquee", "links", "ticker"], synonyms: ["site footer", "scrolling text", "animated footer"],
    source: "shreekumar-b", author: "shreekumar", style: "animated", deps: ["lucide-react"],
    popularity: 460, created: "2026-11-12", updated: "2026-11-12",
  }),
]

export const ENTRIES: ComponentEntry[] = DRAFTS.map((e) => ComponentEntrySchema.parse(e))
