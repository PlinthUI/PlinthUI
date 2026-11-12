export const CATEGORIES = [
  { id: "Basic Components", blurb: "Buttons, avatars, controls" },
  { id: "Forms", blurb: "Inputs, pickers, validation" },
  { id: "Navigation", blurb: "Tabs, sidebars, breadcrumbs" },
  { id: "Data Display", blurb: "Tables, timelines, stats" },
  { id: "Feedback", blurb: "Toasts, progress, status" },
  { id: "Overlays", blurb: "Dialogs, drawers, menus" },
  { id: "Marketing UI", blurb: "Pricing, testimonials" },
  { id: "Landing Page Sections", blurb: "Heroes, FAQs, feature blocks" },
  { id: "Landing Pages", blurb: "Complete page templates" },
  { id: "Dashboard UI", blurb: "Boards and metrics" },
  { id: "Authentication", blurb: "Sign in, sign up, verification" },
  { id: "Effects and Animations", blurb: "Pointer, motion, reveal" },
  { id: "Full Sections", blurb: "Navbars and footers" },
  { id: "Audio and Media", blurb: "Voice, recorders, players" },
  { id: "Cards and Widgets", blurb: "Self-contained interactive cards" },
  { id: "Inputs and Controls", blurb: "Switches, dials, inputs" },
  { id: "Lists and Pickers", blurb: "Selection, chat, tabs" },
  { id: "UX Patterns", blurb: "Empty, loading, onboarding" },
  { id: "3D and Interactive", blurb: "Drag, depth, pointer play" },
] as const

export type CategoryId = (typeof CATEGORIES)[number]["id"]

export function categorySlug(id: string) {
  return id.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")
}
