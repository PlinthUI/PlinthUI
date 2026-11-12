import type { Metadata } from "next"
import { Suspense } from "react"
import { Explorer } from "@/components/plinth/explorer"
import { ExploreSkeleton } from "@/components/plinth/explore-skeleton"
import { repository } from "@/lib/repository"

export const metadata: Metadata = {
  title: "Explore components",
  description: "Filter UI components by category, source, license kind, framework and style.",
}

export default async function ExplorePage() {
  const entries = await repository.list()
  return (
    <>
      <div className="mx-auto max-w-[1400px] px-4 pt-10 sm:px-6">
        <h1 className="text-3xl font-semibold tracking-tight">Explore</h1>
        <p className="mt-1 max-w-prose text-muted-foreground">Filter by category, source, license kind, framework and style.</p>
      </div>
      <Suspense fallback={<ExploreSkeleton />}>
        <Explorer entries={entries} />
      </Suspense>
    </>
  )
}
