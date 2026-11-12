import type { Metadata } from "next"
import { CompareView, type CompareItem } from "@/components/plinth/compare-view"
import { toCard } from "@/lib/card"
import { repository } from "@/lib/repository"

export const metadata: Metadata = {
  title: "Compare components",
  description: "Put up to three implementations on separate plinths with one shared width switch.",
}

function sizeClass(lines: number | null) {
  if (lines === null) return "Hidden (premium)"
  if (lines < 60) return "XS, under 60 lines"
  if (lines < 120) return "S, 60 to 119 lines"
  if (lines < 200) return "M, 120 to 199 lines"
  return "L, 200 lines or more"
}

export default async function ComparePage({ searchParams }: { searchParams: Promise<{ items?: string }> }) {
  const { items } = await searchParams
  const slugs = Array.from(new Set((items ?? "").split(",").filter(Boolean))).slice(0, 3)
  const entries = (await Promise.all(slugs.map((s) => repository.get(s)))).filter((e): e is NonNullable<typeof e> => e !== null)
  const list: CompareItem[] = entries.map((e) => ({
    entry: toCard(e),
    sizeClass: sizeClass(e.provenance.redistributable ? (e.files[0]?.code?.split("\n").length ?? 0) : null),
  }))

  return (
    <>
      <div className="mx-auto max-w-[1400px] px-4 pt-10 sm:px-6">
        <h1 className="text-3xl font-semibold tracking-tight">Compare</h1>
        <p className="mt-1 max-w-prose text-muted-foreground">Up to three implementations, one width. The link is shareable.</p>
      </div>
      <CompareView items={list} />
    </>
  )
}
