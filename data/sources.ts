import type { Source } from "@/lib/schema"

export const SOURCES: Source[] = [
  { id: "shadcn-ui", name: "shadcn/ui", url: "https://ui.shadcn.com", license: "MIT", premium: false, note: "Open source. Code is shown and can be copied." },
  { id: "magic-ui", name: "Magic UI", url: "https://magicui.design", license: "MIT", premium: false, note: "Open source. Code is shown and can be copied." },
  { id: "aceternity-ui", name: "Aceternity UI", url: "https://ui.aceternity.com", license: "MIT", premium: false, note: "Open source tier only. Verify each item's license at the source." },
  { id: "origin-ui", name: "Origin UI", url: "https://originui.com", license: "MIT", premium: false, note: "Open source. Code is shown and can be copied." },
  { id: "react-bits", name: "React Bits", url: "https://reactbits.dev", license: "MIT", premium: false, note: "Open source. Code is shown and can be copied." },
  { id: "cult-ui", name: "Cult UI", url: "https://www.cult-ui.com", license: "MIT", premium: false, note: "Open source tier only. Verify each item's license at the source." },
  { id: "relume", name: "Relume", url: "https://www.relume.io", license: "Proprietary", premium: true, note: "Premium. Preview and metadata only, code stays at the source." },
  { id: "tailwind-plus", name: "Tailwind Plus", url: "https://tailwindcss.com/plus", license: "Proprietary", premium: true, note: "Premium. Preview and metadata only, code stays at the source." },
]

export const SOURCE_BY_ID = Object.fromEntries(SOURCES.map((s) => [s.id, s]))
