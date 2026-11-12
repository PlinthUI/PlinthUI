import Link from "next/link"
import { ArrowRight, Lock } from "lucide-react"
import { FlowBackground } from "@/components/plinth/flow-background"
import { HeroSearch } from "@/components/plinth/hero-search"
import { ItemCard } from "@/components/plinth/item-card"
import { PlinthStage } from "@/components/plinth/plinth-stage"
import { buttonVariants } from "@/components/ui/button"
import { CATEGORIES } from "@/lib/categories"
import { repository } from "@/lib/repository"
import { formatDate } from "@/lib/time"
import { cn } from "@/lib/utils"

const COMPARE_SET: string[] = []

export default async function Home() {
  const [all, sources] = await Promise.all([repository.list(), repository.sources()])
  const top = [...all].sort((a, b) => b.popularity - a.popularity).slice(0, 6)
  const fresh = all.filter((e) => e.isNew).sort((a, b) => b.updatedAt.localeCompare(a.updatedAt)).slice(0, 7)
  const hero = top[0]
  const compare = COMPARE_SET.map((s) => all.find((e) => e.slug === s)).filter((e): e is NonNullable<typeof e> => !!e)
  const count = (cat: string) => all.filter((e) => e.category === cat).length
  const sourceCount = (id: string) => all.filter((e) => e.sourceId === id).length
  const open = all.filter((e) => e.redistributable).length

  return (
    <>
      {/* 1. Hero: asymmetric split with a live plinth */}
      <div className="relative isolate overflow-hidden">
        <div aria-hidden className="absolute inset-0 -z-10 opacity-55 [mask-image:linear-gradient(to_bottom,black_55%,transparent_100%)]">
          <FlowBackground />
        </div>
        <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-r from-background via-background/60 to-transparent lg:via-background/40" />
      <section className="mx-auto grid min-h-[100dvh] max-w-[1400px] grid-cols-1 items-center gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[6fr_7fr] lg:py-16">
        <div className="grid justify-items-start gap-6">
          <h1 className="text-4xl font-semibold leading-[1.08] tracking-tight sm:text-5xl lg:text-[2.75rem] xl:text-5xl">Compare UI components before you commit</h1>
          <p className="max-w-md text-lg text-muted-foreground">Search many libraries, preview each on one stage, and read the source and license first.</p>
          <HeroSearch />
          <Link href="/explore" className={cn(buttonVariants({ size: "lg" }))}>
            Explore all {all.length} <ArrowRight aria-hidden />
          </Link>
        </div>
        <div className="min-w-0">
          {hero ? (
            <PlinthStage previewId={hero.previewId} />
          ) : (
            <div className="grid min-h-[22rem] place-items-center rounded-xl border border-dashed text-center">
              <p className="max-w-xs px-6 text-muted-foreground">The first components will stand here, live, on their plinth.</p>
            </div>
          )}
        </div>
      </section>
      </div>

      {/* 2. Ranked list */}
      {top.length > 0 && <section aria-labelledby="top-heading" className="mx-auto max-w-[1400px] px-4 py-16 sm:px-6">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <h2 id="top-heading" className="text-2xl font-semibold tracking-tight sm:text-3xl">Top this week</h2>
            <p className="mt-1 text-muted-foreground">Ranked by popularity score.</p>
          </div>
          <Link href="/explore?sort=popular" className="inline-flex min-h-11 items-center gap-1 text-sm font-medium text-primary hover:underline">
            See the full ranking <ArrowRight className="size-4" aria-hidden />
          </Link>
        </div>
        <ol className="mt-8 grid gap-x-10 gap-y-6 lg:grid-cols-2">
          {top.map((e, i) => (
            <li key={e.slug} className="rise relative grid grid-cols-[2rem_9.5rem_1fr] items-center gap-4 sm:grid-cols-[2.5rem_12rem_1fr]" style={{ "--i": i } as React.CSSProperties}>
              <span className="text-2xl font-semibold text-muted-foreground tnum">{i + 1}</span>
              <PlinthStage mode="card" previewId={e.previewId} kind={e.kind} />
              <div className="min-w-0">
                <h3 className="truncate font-semibold">
                  <Link href={`/c/${e.slug}`} className="after:absolute after:inset-0 hover:text-primary">
                    {e.title}
                  </Link>
                </h3>
                <p className="mt-0.5 truncate text-sm text-muted-foreground">
                  {e.category}
                </p>
                <p className="mt-1 text-xs text-muted-foreground tnum">Score {e.popularity}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>}

      {/* 3. Scroll-snap rail */}
      {fresh.length > 0 && <section aria-labelledby="new-heading" className="border-y bg-secondary/40 py-16">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6">
          <h2 id="new-heading" className="text-2xl font-semibold tracking-tight sm:text-3xl">New and noteworthy</h2>
          <p className="mt-1 text-muted-foreground">Updated in the last 45 days.</p>
        </div>
        <ul tabIndex={0} aria-label="New and noteworthy components, scroll sideways" className="mx-auto mt-8 flex max-w-[1400px] snap-x snap-mandatory gap-5 overflow-x-auto px-4 pb-4 sm:px-6 [scrollbar-width:thin]">
          {fresh.map((e, i) => (
            <li key={e.slug} className="w-[78%] shrink-0 snap-start sm:w-80">
              <ItemCard entry={e} index={i} />
            </li>
          ))}
        </ul>
      </section>}

      {/* 4. Category index */}
      <section aria-labelledby="cat-heading" className="mx-auto max-w-[1400px] px-4 py-16 sm:px-6">
        <h2 id="cat-heading" className="text-2xl font-semibold tracking-tight sm:text-3xl">Browse by category</h2>
        <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {CATEGORIES.map((c) => (
            <li key={c.id}>
              <Link href={`/explore?category=${encodeURIComponent(c.id)}`} className="press group flex h-full min-h-28 flex-col justify-between rounded-xl border bg-card p-4 transition-colors hover:border-primary/50 hover:bg-accent/40">
                <span className="flex items-start justify-between gap-3">
                  <span className="font-medium">{c.id}</span>
                  <span className="font-mono text-2xl leading-none text-muted-foreground tnum group-hover:text-primary">{count(c.id)}</span>
                </span>
                <span className="mt-4 text-sm text-muted-foreground">{c.blurb}</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/* 5. Compare teaser: table beside text */}
      {compare.length === 3 && <section aria-labelledby="cmp-heading" className="mx-auto grid max-w-[1400px] grid-cols-1 gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[2fr_3fr]">
        <div className="grid content-start gap-4">
          <h2 id="cmp-heading" className="text-2xl font-semibold tracking-tight sm:text-3xl">Three pricing tables, one width</h2>
          <p className="max-w-md text-muted-foreground">Put up to three implementations on their own plinths, switch every preview to phone width at once, and read the differences underneath.</p>
          <Link href={`/compare?items=${COMPARE_SET.join(",")}`} className={cn(buttonVariants({ variant: "outline" }), "justify-self-start")}>
            Open this comparison
          </Link>
        </div>
        <div className="overflow-x-auto rounded-xl border bg-card">
          <table className="w-full min-w-[32rem] text-left text-sm">
            <caption className="sr-only">Sample comparison of three pricing entries</caption>
            <thead className="bg-secondary/50">
              <tr>
                <td className="w-28 px-4 py-3" />
                {compare.map((e) => (
                  <th key={e.slug} scope="col" className="px-4 py-3 font-medium">
                    {e.title}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                ["Source", (e: (typeof compare)[number]) => sources.find((s) => s.id === e.sourceId)?.name],
                ["License", (e: (typeof compare)[number]) => (e.redistributable ? e.license : `${e.license}, premium`)],
                ["Kind", (e: (typeof compare)[number]) => (e.kind === "section" ? "Section" : "Component")],
                ["Updated", (e: (typeof compare)[number]) => formatDate(e.updatedAt)],
              ].map(([label, get]) => (
                <tr key={label as string} className="border-t">
                  <th scope="row" className="px-4 py-3 font-normal text-muted-foreground">{label as string}</th>
                  {compare.map((e) => (
                    <td key={e.slug} className="px-4 py-3 tnum">{(get as (e: (typeof compare)[number]) => string)(e)}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>}

      {/* 6. Open source versus premium, with sources */}
      <section aria-labelledby="policy-heading" className="mx-auto max-w-[1400px] px-4 pb-8 pt-4 sm:px-6">
        <h2 id="policy-heading" className="max-w-2xl text-2xl font-semibold tracking-tight sm:text-3xl">Open source shows code. Premium links out.</h2>
        <div className="mt-8 grid grid-cols-1 gap-4 lg:grid-cols-[3fr_2fr]">
          <div className="rounded-xl border bg-card p-6">
            <h3 className="text-lg font-semibold">Open source entries</h3>
            <p className="mt-1 text-sm text-muted-foreground tnum">{open} entries under MIT, Apache-2.0 or ISC</p>
            <ul className="mt-4 grid gap-2 text-sm">
              <li>Full code with the file path, ready to copy.</li>
              <li>Install commands for pnpm, npm, yarn and bun.</li>
              <li>Attribution and license kept next to the code.</li>
            </ul>
          </div>
          <div className="rounded-xl border border-dashed bg-card p-6">
            <h3 className="flex items-center gap-2 text-lg font-semibold">
              <Lock className="size-4" aria-hidden /> Premium entries
            </h3>
            <p className="mt-1 text-sm text-muted-foreground tnum">{all.length - open} entries with proprietary licenses</p>
            <ul className="mt-4 grid gap-2 text-sm">
              <li>Preview, metadata and license summary only.</li>
              <li>Code is never shown. Every action links to the source.</li>
            </ul>
          </div>
        </div>
        <ul className="mt-6 flex flex-wrap gap-2" aria-label="Sources">
          {sources.map((s) => (
            <li key={s.id}>
              <Link href={`/explore?source=${s.id}`} className="inline-flex h-11 items-center gap-2 rounded-lg border bg-card px-3 text-sm hover:bg-accent">
                {s.premium && <Lock className="size-3.5" aria-hidden />}
                {s.name}
                <span className="font-mono text-xs text-muted-foreground tnum">{sourceCount(s.id)}</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </>
  )
}
