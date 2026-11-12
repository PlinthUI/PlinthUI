import type { Metadata, Viewport } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { ThemeProvider } from "next-themes"
import { Toaster } from "@/components/ui/sonner"
import { TooltipProvider } from "@/components/ui/tooltip"
import { CommandPalette } from "@/components/plinth/command-palette"
import { CompareTray } from "@/components/plinth/compare-tray"
import { EntriesProvider } from "@/components/plinth/entries-provider"
import { SiteFooter } from "@/components/plinth/site-footer"
import { SiteHeader } from "@/components/plinth/site-header"
import { repository } from "@/lib/repository"
import "./globals.css"

export const metadata: Metadata = {
  metadataBase: new URL("https://plinthui.example"),
  title: { default: "PlinthUI: find, preview and compare UI components", template: "%s | PlinthUI" },
  description: "Discover, preview, compare and save UI components from many libraries, with source and license shown on every entry.",
  openGraph: {
    title: "PlinthUI",
    description: "Discover, preview, compare and save UI components, with source and license on every entry.",
    type: "website",
  },
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f6f7f9" },
    { media: "(prefers-color-scheme: dark)", color: "#0e1014" },
  ],
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const entries = await repository.list()
  return (
    <html lang="en" suppressHydrationWarning className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body className="min-h-dvh">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <TooltipProvider>
            <EntriesProvider entries={entries}>
              <a href="#main" className="sr-only z-50 rounded-lg bg-primary px-4 py-2 text-primary-foreground focus:not-sr-only focus:fixed focus:left-3 focus:top-3">
                Skip to content
              </a>
              <SiteHeader />
              <main id="main">{children}</main>
              <SiteFooter />
              <CommandPalette />
              <CompareTray />
              <Toaster position="bottom-right" />
            </EntriesProvider>
          </TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
