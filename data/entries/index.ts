import { ComponentEntrySchema, type ComponentEntry } from "@/lib/schema"
import { entry } from "./define"

/**
 * Add entries here, built with entry() from ./define. Parsed once so a
 * malformed entry fails the build instead of a page.
 */
const DRAFTS: unknown[] = [
  entry({
    slug: "portfolio-hero", title: "Portfolio hero", kind: "section", category: "Landing Page Sections",
    summary: "Name, role chips and two actions beside a collapsible Now building card. Rebuilt from shreekumarb.vercel.app.",
    tags: ["hero", "portfolio", "landing", "personal site"], synonyms: ["banner", "intro", "above the fold"],
    source: "shreekumar-b", author: "shreekumar", style: "bold", deps: ["lucide-react"],
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
