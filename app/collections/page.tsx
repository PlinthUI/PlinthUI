import type { Metadata } from "next"
import { CollectionsManager } from "@/components/plinth/collections-manager"

export const metadata: Metadata = {
  title: "Collections",
  description: "Named collections of components, stored in your browser. Export and import as JSON.",
}

export default function CollectionsPage() {
  return (
    <>
      <div className="mx-auto max-w-[1400px] px-4 pt-10 sm:px-6">
        <h1 className="text-3xl font-semibold tracking-tight">Collections</h1>
        <p className="mt-1 max-w-prose text-muted-foreground">Kept in this browser only. There are no accounts in this phase, so export a backup if they matter.</p>
      </div>
      <CollectionsManager />
    </>
  )
}
