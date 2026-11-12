import Link from "next/link"
import { Info } from "lucide-react"

/** Non-dismissible by design: every entry here is illustrative. */
export function DemoNotice() {
  return (
    <div role="note" className="border-b bg-secondary/70">
      <p className="mx-auto flex max-w-[1400px] items-start gap-2 px-4 py-2 text-[13px] leading-snug text-muted-foreground sm:px-6">
        <Info className="mt-0.5 size-4 shrink-0" aria-hidden />
        <span>
          <strong className="font-medium text-foreground">Demo data.</strong> Entries are illustrative and written for this project. Verify licenses with each project before use.{" "}
          <Link href="/sources#policy" className="text-primary underline underline-offset-2">
            How licenses are shown
          </Link>
        </span>
      </p>
    </div>
  )
}
