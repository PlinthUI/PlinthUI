import { ImageResponse } from "next/og"

export const alt = "PlinthUI: find, preview and compare UI components"
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

export default function OgImage() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", background: "#000000", color: "#e8eaee", padding: 72 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <div style={{ width: 44, height: 34, background: "#ededed", borderRadius: "6px 6px 0 0" }} />
            <div style={{ width: 64, height: 14, background: "#e8eaee", borderRadius: "0 0 5px 5px" }} />
          </div>
          <div style={{ fontSize: 40, fontWeight: 600 }}>PlinthUI</div>
        </div>
        <div style={{ fontSize: 76, fontWeight: 600, lineHeight: 1.08, maxWidth: 940 }}>Compare UI components before you commit</div>
        <div style={{ fontSize: 30, color: "#9099a8" }}>Source and license on every entry. Demo data.</div>
      </div>
    ),
    size
  )
}
