import { SOURCE_BY_ID } from "@/data/sources"
import type { ComponentEntry, Framework, Style } from "@/lib/schema"

type Def = {
  slug: string
  title: string
  summary: string
  kind?: "component" | "section"
  category: string
  tags: string[]
  synonyms?: string[]
  source: string
  author: string
  frameworks?: Framework[]
  style?: Style
  deps?: string[]
  props?: ComponentEntry["props"]
  variants?: ComponentEntry["variants"]
  popularity: number
  created: string
  updated: string
}

const BASE_DEPS = ["react"]

/** Builds a full entry from a compact definition. Demo data only. */
export function entry(d: Def): ComponentEntry {
  const source = SOURCE_BY_ID[d.source]
  if (!source) throw new Error(`Unknown source ${d.source} for ${d.slug}`)
  const redistributable = !source.premium
  const deps = d.deps ?? []
  const allDeps = [...BASE_DEPS, ...deps]
  return {
    slug: d.slug,
    title: d.title,
    summary: d.summary,
    kind: d.kind ?? "component",
    category: d.category,
    tags: d.tags,
    synonyms: d.synonyms ?? [],
    frameworks: d.frameworks ?? ["react", "next"],
    styling: ["tailwind"],
    style: d.style ?? "minimal",
    dependencies: allDeps,
    install: redistributable
      ? {
          cli: `npx shadcn@latest add @${d.source}/${d.slug}`,
          manual: deps.length ? [`npm install ${deps.join(" ")}`] : [],
        }
      : {},
    files: [{ path: `components/${d.slug}.tsx`, language: "tsx" }],
    props: d.props,
    variants: d.variants,
    previewId: d.slug,
    popularity: d.popularity,
    createdAt: d.created,
    updatedAt: d.updated,
    provenance: {
      sourceId: d.source,
      sourceUrl: source.url,
      author: d.author,
      license: source.license,
      redistributable,
      attribution: redistributable
        ? "Illustrative entry written for this demo. Confirm the real license with the project before use."
        : "Premium source. Preview and metadata only. Code is available from the source under its own terms.",
    },
  }
}

export const variantProp = (opts: string[], desc = "Selects a visual variant.") => ({
  name: "variant",
  type: opts.map((o) => `"${o}"`).join(" | "),
  default: `"${opts[0]}"`,
  description: desc,
})
