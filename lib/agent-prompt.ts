import type { ComponentEntry } from "./schema"

/** Builds the text behind "Copy as agent prompt". Never includes locked code. */
export function buildAgentPrompt(e: ComponentEntry): string {
  const lines = [
    `Add the "${e.title}" ${e.kind} to this project.`,
    ``,
    `Summary: ${e.summary}`,
    `Source: ${e.provenance.sourceId} (${e.provenance.sourceUrl})`,
    `License: ${e.provenance.license}`,
    `Frameworks: ${e.frameworks.join(", ")}. Styling: ${e.styling.join(", ")}.`,
    `Dependencies: ${e.dependencies.join(", ")}.`,
  ]
  if (e.provenance.redistributable && e.install.cli) {
    lines.push(``, `Install: ${e.install.cli}`)
    lines.push(`File to create: ${e.files[0]?.path}`)
    lines.push(`Review the code before installing it and keep the license notice.`)
  } else {
    lines.push(``, `This is a premium entry. Do not reproduce its code. Open ${e.provenance.sourceUrl}, follow the source's own terms, then wire it into the project.`)
  }
  lines.push(``, `Match the existing design tokens, keep it keyboard accessible, and add focus-visible styles.`)
  return lines.join("\n")
}
