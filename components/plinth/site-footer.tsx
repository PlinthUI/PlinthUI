import Link from "next/link"
import { Logo } from "./site-header"

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t">
      <div className="mx-auto grid max-w-[1400px] gap-8 px-4 py-10 sm:px-6 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <Logo />
          <p className="mt-2 max-w-sm text-sm text-muted-foreground">One place to find, preview, compare and save UI components, with source and license on every entry.</p>
        </div>
        <nav aria-label="Product" className="grid content-start gap-1 text-sm">
          <Link href="/explore" className="inline-flex min-h-9 items-center text-muted-foreground hover:text-foreground">Explore</Link>
          <Link href="/compare" className="inline-flex min-h-9 items-center text-muted-foreground hover:text-foreground">Compare</Link>
          <Link href="/collections" className="inline-flex min-h-9 items-center text-muted-foreground hover:text-foreground">Collections</Link>
        </nav>
        <nav aria-label="Project" className="grid content-start gap-1 text-sm">
          <Link href="/sources" className="inline-flex min-h-9 items-center text-muted-foreground hover:text-foreground">Sources</Link>
          <Link href="/sources#policy" className="inline-flex min-h-9 items-center text-muted-foreground hover:text-foreground">License policy</Link>
          <a href="https://github.com/PlinthUI/PlinthUI" className="inline-flex min-h-9 items-center text-muted-foreground hover:text-foreground">Repository</a>
        </nav>
      </div>
    </footer>
  )
}
