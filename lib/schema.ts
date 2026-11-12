import { z } from "zod"

export const LICENSES = ["MIT", "Apache-2.0", "ISC", "Proprietary"] as const
export const FRAMEWORKS = ["react", "next", "vue", "svelte", "html"] as const
export const STYLINGS = ["tailwind", "css", "css-modules"] as const
export const STYLES = ["minimal", "glass", "animated", "bold", "brutalist", "playful"] as const
export const KINDS = ["component", "section"] as const

export const ProvenanceSchema = z.object({
  sourceId: z.string(),
  sourceUrl: z.string().url(),
  author: z.string().optional(),
  license: z.enum(LICENSES),
  /** false means code is never shown and the UI links out instead */
  redistributable: z.boolean(),
  attribution: z.string().optional(),
})

export const ComponentEntrySchema = z.object({
  slug: z.string(),
  title: z.string(),
  summary: z.string(),
  kind: z.enum(KINDS),
  category: z.string(),
  tags: z.array(z.string()),
  synonyms: z.array(z.string()),
  frameworks: z.array(z.enum(FRAMEWORKS)),
  styling: z.array(z.enum(STYLINGS)),
  style: z.enum(STYLES),
  dependencies: z.array(z.string()),
  install: z.object({
    cli: z.string().optional(),
    manual: z.array(z.string()).optional(),
  }),
  /** code is absent when the entry is locked (non redistributable) */
  files: z.array(
    z.object({ path: z.string(), language: z.string(), code: z.string().optional() })
  ),
  props: z
    .array(
      z.object({
        name: z.string(),
        type: z.string(),
        default: z.string().optional(),
        description: z.string(),
      })
    )
    .optional(),
  variants: z.array(z.object({ id: z.string(), title: z.string() })).optional(),
  previewId: z.string(),
  popularity: z.number(),
  createdAt: z.string(),
  updatedAt: z.string(),
  provenance: ProvenanceSchema,
})

export type Provenance = z.infer<typeof ProvenanceSchema>
export type ComponentEntry = z.infer<typeof ComponentEntrySchema>
export type Framework = (typeof FRAMEWORKS)[number]
export type Style = (typeof STYLES)[number]
export type Kind = (typeof KINDS)[number]

export const SourceSchema = z.object({
  id: z.string(),
  name: z.string(),
  url: z.string().url(),
  license: z.enum(LICENSES),
  premium: z.boolean(),
  note: z.string(),
})
export type Source = z.infer<typeof SourceSchema>

/** Slim shape sent to client components. No code, no long props. */
export type EntryCard = Pick<
  ComponentEntry,
  | "slug"
  | "title"
  | "summary"
  | "kind"
  | "category"
  | "tags"
  | "synonyms"
  | "frameworks"
  | "styling"
  | "style"
  | "previewId"
  | "popularity"
  | "createdAt"
  | "updatedAt"
  | "dependencies"
> & {
  sourceId: string
  license: Provenance["license"]
  redistributable: boolean
  author?: string
  isNew: boolean
}
