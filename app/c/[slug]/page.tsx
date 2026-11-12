import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { codeToHtml } from "shiki"
import { ChevronRight } from "lucide-react"
import { DetailActions } from "@/components/plinth/detail-actions"
import { ItemCard } from "@/components/plinth/item-card"
import { Outline } from "@/components/plinth/outline"
import { Workbench } from "@/components/plinth/workbench"
import { buildAgentPrompt } from "@/lib/agent-prompt"
import { categorySlug } from "@/lib/categories"
import { repository } from "@/lib/repository"
import { cn } from "@/lib/utils"

type Params = { slug: string }

export async function generateStaticParams() {
  const all = await repository.list()
  return all.map((e) => ({ slug: e.slug }))
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params
  const e = await repository.get(slug)
  if (!e) return { title: "Not found" }
  return { title: e.title, description: e.summary, openGraph: { title: `${e.title} | PlinthUI`, description: e.summary } }
}

export default async function ComponentPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params
  const entry = await repository.get(slug)
  if (!entry) notFound()

  const [related, all] = await Promise.all([repository.related(slug, 4), repository.list()])
  const siblings = all.filter((e) => e.category === entry.category)
  const codeFiles = await Promise.all(
    entry.files
      .filter((f) => f.code)
      .map(async (f) => ({
        path: f.path,
        code: f.code as string,
        html: await codeToHtml(f.code as string, { lang: f.language, themes: { light: "github-light", dark: "github-dark" }, defaultColor: false }),
      }))
  )

  return (
    <div className="mx-auto grid max-w-[1400px] grid-cols-1 gap-10 px-4 py-8 sm:px-6 xl:grid-cols-[14rem_minmax(0,1fr)_12rem]">
      <aside aria-label="In this category" className="hidden xl:block">
        <nav className="sticky top-24 text-sm">
          <Link href={`/explore?category=${encodeURIComponent(entry.category)}`} className="mb-2 inline-flex min-h-9 items-center font-medium hover:text-primary">
            {entry.category}
          </Link>
          <ul className="grid">
            {siblings.map((s) => (
              <li key={s.slug}>
                <Link href={`/c/${s.slug}`} aria-current={s.slug === slug ? "page" : undefined} className={cn("flex min-h-10 items-center rounded-md px-2.5", s.slug === slug ? "bg-secondary font-medium" : "text-muted-foreground hover:bg-accent hover:text-foreground")}>
                  {s.title}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      <article className="min-w-0">
        <nav aria-label="Breadcrumb" className="mb-4 flex items-center gap-1 text-sm text-muted-foreground">
          <Link href="/explore" className="inline-flex min-h-9 items-center hover:text-foreground">
            Explore
          </Link>
          <ChevronRight className="size-4" aria-hidden />
          <Link href={`/explore?category=${encodeURIComponent(entry.category)}`} className="inline-flex min-h-9 items-center hover:text-foreground">
            {entry.category}
          </Link>
          <span className="sr-only">{categorySlug(entry.category)}</span>
        </nav>

        <header className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">{entry.title}</h1>
          <p className="mt-2 max-w-prose text-lg text-muted-foreground">{entry.summary}</p>
          <div className="mt-5">
            <DetailActions slug={entry.slug} title={entry.title} prompt={buildAgentPrompt(entry)} />
          </div>
        </header>

        <Workbench entry={entry} codeFiles={codeFiles} />

        {related.length > 0 && (
          <section id="related" className="mt-16 scroll-mt-24">
            <h2 className="text-xl font-semibold">Related components</h2>
            <ul className="mt-5 grid gap-x-5 gap-y-9 sm:grid-cols-2">
              {related.map((r, i) => (
                <li key={r.slug}>
                  <ItemCard entry={r} index={i} />
                </li>
              ))}
            </ul>
          </section>
        )}
      </article>

      <aside className="hidden xl:block">
        <Outline hasRelated={related.length > 0} />
      </aside>
    </div>
  )
}
