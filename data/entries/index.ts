import { ComponentEntrySchema, type ComponentEntry } from "@/lib/schema"
import { entry } from "./define"

/**
 * Add entries here, built with entry() from ./define. Parsed once so a
 * malformed entry fails the build instead of a page.
 */
const DRAFTS: unknown[] = [
  entry({
    slug: "animated-tabs", title: "Animated tabs", category: "Navigation",
    summary: "Tabs with a sliding thumb that moves by transform, full arrow, Home and End key support.",
    tags: ["tabs","navigation","indicator","panel"], synonyms: ["tab bar","segmented tabs"],
    source: "shreekumar-b", author: "shreekumar", style: "animated",
    popularity: 380, created: "2026-11-12", updated: "2026-11-12",
  }),
  entry({
    slug: "accordion-group", title: "Accordion group", category: "Data Display",
    summary: "Disclosure list with a single or multiple open mode and real buttons for headers.",
    tags: ["accordion","faq","disclosure","collapse"], synonyms: ["expandable list","collapsible"],
    source: "shreekumar-b", author: "shreekumar", style: "minimal", deps: ["lucide-react"],
    popularity: 380, created: "2026-11-12", updated: "2026-11-12",
  }),
  entry({
    slug: "file-dropzone", title: "File dropzone", category: "Forms",
    summary: "Drag files in or choose them, see name and size, remove any. Nothing is uploaded.",
    tags: ["upload","dropzone","file","drag and drop"], synonyms: ["file picker","attachment","uploader"],
    source: "shreekumar-b", author: "shreekumar", style: "minimal", deps: ["lucide-react"],
    popularity: 380, created: "2026-11-12", updated: "2026-11-12",
  }),
  entry({
    slug: "pricing-switch", title: "Pricing cards with period switch", category: "Marketing UI",
    summary: "Three plan cards and a monthly or yearly switch that recomputes the price. Prices are sample values.",
    tags: ["pricing","plans","saas","cards","billing"], synonyms: ["subscription tiers","price table"],
    source: "shreekumar-b", author: "shreekumar", style: "bold", deps: ["lucide-react"],
    popularity: 380, created: "2026-11-12", updated: "2026-11-12",
  }),
  entry({
    slug: "theme-switch", title: "Theme switch", category: "Basic Components",
    summary: "Pill switch with a sliding knob and sun or moon icon, exposed as a switch role.",
    tags: ["switch","toggle","theme","dark mode"], synonyms: ["light dark toggle","mode switch"],
    source: "shreekumar-b", author: "shreekumar", style: "playful", deps: ["lucide-react"],
    popularity: 380, created: "2026-11-12", updated: "2026-11-12",
  }),
  entry({
    slug: "notification-bell", title: "Notification bell", category: "Overlays",
    summary: "Bell with an unread count that opens a panel, closes on Escape or outside click, and marks all read.",
    tags: ["notifications","bell","popover","inbox"], synonyms: ["alerts","inbox menu"],
    source: "shreekumar-b", author: "shreekumar", style: "minimal", deps: ["lucide-react"],
    popularity: 380, created: "2026-11-12", updated: "2026-11-12",
  }),
  entry({
    slug: "step-progress", title: "Step progress", category: "Feedback",
    summary: "Stepper with done, current and upcoming states and back and continue controls.",
    tags: ["stepper","wizard","progress","onboarding"], synonyms: ["steps","checkout steps"],
    source: "shreekumar-b", author: "shreekumar", style: "minimal", deps: ["lucide-react"],
    popularity: 380, created: "2026-11-12", updated: "2026-11-12",
  }),
  entry({
    slug: "code-input", title: "Code input", category: "Authentication",
    summary: "Six digit code boxes with paste support and backspace navigation.",
    tags: ["otp","verification","code","2fa","auth"], synonyms: ["pin input","passcode","sms code"],
    source: "shreekumar-b", author: "shreekumar", style: "minimal",
    popularity: 380, created: "2026-11-12", updated: "2026-11-12",
  }),
  entry({
    slug: "typewriter-text", title: "Typewriter text", category: "Effects and Animations",
    summary: "Types and erases a list of phrases. Screen readers get every phrase, and reduced motion shows the first one still.",
    tags: ["text","typing","headline","effect"], synonyms: ["typing animation","text animation"],
    source: "shreekumar-b", author: "shreekumar", style: "animated",
    popularity: 400, created: "2026-11-12", updated: "2026-11-12",
  }),
  entry({
    slug: "spotlight-card", title: "Pointer spotlight card", category: "Effects and Animations",
    summary: "A soft light follows the pointer across the card. Position goes through CSS variables, not React state.",
    tags: ["spotlight","hover","card","effect"], synonyms: ["glow card","cursor light"],
    source: "shreekumar-b", author: "shreekumar", style: "animated",
    popularity: 400, created: "2026-11-12", updated: "2026-11-12",
  }),
  entry({
    slug: "tilt-card", title: "Tilt card", category: "Effects and Animations",
    summary: "The card leans toward the pointer on a spring and settles flat on leave. Disabled for reduced motion.",
    tags: ["tilt","3d","card","hover","effect"], synonyms: ["perspective card","parallax card"],
    source: "shreekumar-b", author: "shreekumar", style: "playful", deps: ["motion"],
    popularity: 400, created: "2026-11-12", updated: "2026-11-12",
  }),
  entry({
    slug: "magnetic-button", title: "Magnetic button", category: "Effects and Animations",
    summary: "The button drifts toward the pointer inside its zone and springs back on leave.",
    tags: ["button","magnetic","hover","cta","effect"], synonyms: ["pull button","attract"],
    source: "shreekumar-b", author: "shreekumar", style: "playful", deps: ["motion"],
    popularity: 400, created: "2026-11-12", updated: "2026-11-12",
  }),
  entry({
    slug: "ripple-button", title: "Press ripple button", category: "Effects and Animations",
    summary: "A ring expands from the exact press point. Pure CSS animation, removed after it ends.",
    tags: ["button","ripple","click","feedback"], synonyms: ["touch feedback","material ripple"],
    source: "shreekumar-b", author: "shreekumar", style: "minimal",
    popularity: 400, created: "2026-11-12", updated: "2026-11-12",
  }),
  entry({
    slug: "flip-card", title: "Flip card", category: "Effects and Animations",
    summary: "Two faces on one button that turns in 3D on click, with pressed state announced to assistive tech.",
    tags: ["card","flip","3d","toggle"], synonyms: ["reveal card","two sided card"],
    source: "shreekumar-b", author: "shreekumar", style: "playful", deps: ["lucide-react"],
    popularity: 400, created: "2026-11-12", updated: "2026-11-12",
  }),
  entry({
    slug: "orbit-edge-card", title: "Orbiting edge light card", category: "Effects and Animations",
    summary: "A conic light travels around the card edge from a rotating masked layer.",
    tags: ["border","glow","card","effect"], synonyms: ["animated border","light trace"],
    source: "shreekumar-b", author: "shreekumar", style: "animated",
    popularity: 400, created: "2026-11-12", updated: "2026-11-12",
  }),
  entry({
    slug: "word-reveal", title: "Word reveal", category: "Effects and Animations",
    summary: "Words rise and fade in one after another when the paragraph scrolls into view, and replay on re-entry.",
    tags: ["text","reveal","scroll","headline"], synonyms: ["staggered text","text animation"],
    source: "shreekumar-b", author: "shreekumar", style: "animated",
    popularity: 400, created: "2026-11-12", updated: "2026-11-12",
  }),
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
