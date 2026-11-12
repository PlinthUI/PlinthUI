import { ComponentEntrySchema, type ComponentEntry } from "@/lib/schema"

/**
 * Add entries here, built with entry() from ./define. Parsed once so a
 * malformed entry fails the build instead of a page.
 */
const DRAFTS: unknown[] = []

export const ENTRIES: ComponentEntry[] = DRAFTS.map((e) => ComponentEntrySchema.parse(e))
