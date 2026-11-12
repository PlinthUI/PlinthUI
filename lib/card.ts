import type { ComponentEntry, EntryCard } from "./schema"
import { isNewEntry } from "./time"

export function toCard(e: ComponentEntry): EntryCard {
  return {
    slug: e.slug,
    title: e.title,
    summary: e.summary,
    kind: e.kind,
    category: e.category,
    tags: e.tags,
    synonyms: e.synonyms,
    frameworks: e.frameworks,
    styling: e.styling,
    style: e.style,
    previewId: e.previewId,
    popularity: e.popularity,
    createdAt: e.createdAt,
    updatedAt: e.updatedAt,
    dependencies: e.dependencies,
    sourceId: e.provenance.sourceId,
    license: e.provenance.license,
    redistributable: e.provenance.redistributable,
    author: e.provenance.author,
    isNew: isNewEntry(e.updatedAt),
  }
}
