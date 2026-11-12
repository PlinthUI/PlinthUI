import { CopyButton } from "./copy-button"

/** Pre-highlighted code (Shiki, dual theme) with a file path label and copy button. */
export function CodeBlock({ path, html, code }: { path: string; html: string; code: string }) {
  return (
    <div className="overflow-hidden rounded-xl border bg-card">
      <div className="flex items-center justify-between border-b bg-secondary/50 pl-4 pr-1.5">
        <span className="font-mono text-[13px] text-muted-foreground">{path}</span>
        <CopyButton text={code} label="Copy code" />
      </div>
      <div className="max-h-[32rem] overflow-auto" tabIndex={0} role="region" aria-label={`Source of ${path}`} dangerouslySetInnerHTML={{ __html: html }} />
    </div>
  )
}
