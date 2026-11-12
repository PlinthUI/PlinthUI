import type { Metadata } from "next"
import Link from "next/link"
import { ExternalLink, Lock } from "lucide-react"
import { repository } from "@/lib/repository"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export const metadata: Metadata = {
  title: "Sources",
  description: "Where entries come from, their license type and how open source and premium entries are handled.",
}

export default async function SourcesPage() {
  const [sources, entries] = await Promise.all([repository.sources(), repository.list()])
  const count = (id: string) => entries.filter((e) => e.sourceId === id).length

  return (
    <div className="mx-auto max-w-[1400px] px-4 py-10 sm:px-6">
      <h1 className="text-3xl font-semibold tracking-tight">Sources</h1>
      <p className="mt-1 max-w-prose text-muted-foreground">Every entry credits where it came from. Source names here are labels in demo data, not endorsements.</p>

      <div className="mt-8 grid grid-cols-1 gap-10 lg:grid-cols-[1fr_22rem]">
        <div className="overflow-x-auto rounded-xl border bg-card">
          <table className="w-full min-w-[34rem] text-left text-sm">
            <caption className="sr-only">Sources and their entry counts</caption>
            <thead className="bg-secondary/50">
              <tr>
                {["Source", "Entries", "License", "Handling"].map((h) => (
                  <th key={h} scope="col" className="px-4 py-3 font-medium">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {sources.map((s) => (
                <tr key={s.id} className="border-t align-top">
                  <th scope="row" className="px-4 py-3 text-left font-medium">
                    <Link href={`/explore?source=${s.id}`} className="hover:text-primary">
                      {s.name}
                    </Link>
                    <a href={s.url} target="_blank" rel="noreferrer" className="mt-0.5 flex min-h-8 items-center gap-1 text-[13px] font-normal text-muted-foreground hover:text-foreground">
                      Visit site <ExternalLink className="size-3" aria-hidden />
                    </a>
                  </th>
                  <td className="px-4 py-3 tnum">{count(s.id)}</td>
                  <td className="px-4 py-3">
                    <span className="inline-flex items-center gap-1">
                      {s.premium && <Lock className="size-3.5" aria-hidden />}
                      {s.license}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">{s.note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <aside id="policy" className="scroll-mt-24 self-start rounded-xl border bg-card p-5 text-sm">
          <h2 className="text-lg font-semibold">License policy</h2>
          <dl className="mt-3 grid gap-4">
            <div>
              <dt className="font-medium">Open source (MIT, Apache-2.0, ISC)</dt>
              <dd className="mt-1 text-muted-foreground">Code, install commands and dependency lists are shown. Attribution is kept with the entry.</dd>
            </div>
            <div>
              <dt className="font-medium">Premium (proprietary)</dt>
              <dd className="mt-1 text-muted-foreground">You see the preview, metadata and license summary. Code is never shown and every action links to the original.</dd>
            </div>
            <div>
              <dt className="font-medium">Demo data</dt>
              <dd className="mt-1 text-muted-foreground">All previews and code here were written for this project. Verify real licenses with each project before using anything.</dd>
            </div>
          </dl>
          <Link href="/explore?license=premium" className={cn(buttonVariants({ variant: "outline" }), "mt-5")}>
            See premium entries
          </Link>
        </aside>
      </div>
    </div>
  )
}
