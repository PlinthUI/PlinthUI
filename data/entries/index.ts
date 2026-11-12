import { ComponentEntrySchema, type ComponentEntry } from "@/lib/schema"
import { PART_A } from "./part-a"
import { PART_B } from "./part-b"

/** Parsed once so a malformed mock entry fails the build instead of a page. */
export const ENTRIES: ComponentEntry[] = [...PART_A, ...PART_B].map((e) => ComponentEntrySchema.parse(e))
