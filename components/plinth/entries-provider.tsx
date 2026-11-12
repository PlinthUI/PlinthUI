"use client"

import { createContext, useContext } from "react"
import type { EntryCard } from "@/lib/schema"

const Ctx = createContext<EntryCard[]>([])

/** Slim entry index shared with client leaves (palette, compare tray, collections). */
export function EntriesProvider({ entries, children }: { entries: EntryCard[]; children: React.ReactNode }) {
  return <Ctx.Provider value={entries}>{children}</Ctx.Provider>
}

export const useEntries = () => useContext(Ctx)
