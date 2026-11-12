"use client"

import { Component, type ReactNode } from "react"
import { RotateCw } from "lucide-react"

type State = { failed: boolean }

/** Keeps one broken preview from blanking its card, and offers a retry. */
export class PreviewBoundary extends Component<{ id: string; children: ReactNode }, State> {
  state: State = { failed: false }

  static getDerivedStateFromError(): State {
    return { failed: true }
  }

  render() {
    if (!this.state.failed) return this.props.children
    return (
      <div role="alert" className="grid justify-items-center gap-2 p-6 text-center text-sm text-muted-foreground">
        <p>This preview failed to load.</p>
        <button type="button" onClick={() => this.setState({ failed: false })} className="inline-flex h-10 items-center gap-2 rounded-lg border px-3 text-foreground hover:bg-accent">
          <RotateCw className="size-4" aria-hidden /> Try again
        </button>
      </div>
    )
  }
}
