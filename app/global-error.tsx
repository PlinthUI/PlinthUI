"use client"

export default function GlobalError({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <html lang="en">
      <body style={{ fontFamily: "system-ui, sans-serif", background: "#0e1014", color: "#e8eaee", display: "grid", minHeight: "100dvh", placeItems: "center", margin: 0 }}>
        <div role="alert" style={{ maxWidth: 420, padding: 24, textAlign: "center" }}>
          <h1 style={{ fontSize: 24, margin: 0 }}>PlinthUI could not start</h1>
          <p style={{ color: "#9099a8" }}>Reload to try again. Nothing stored in your browser was changed.</p>
          <button onClick={reset} style={{ height: 44, padding: "0 20px", borderRadius: 8, border: 0, background: "#8497ea", color: "#0e1014", fontSize: 16, cursor: "pointer" }}>
            Reload
          </button>
        </div>
      </body>
    </html>
  )
}
