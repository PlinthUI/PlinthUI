"use client"

import { createLocalStore, useStore } from "./local-store"

export const PACKAGE_MANAGERS = ["pnpm", "npm", "yarn", "bun"] as const
export type PackageManager = (typeof PACKAGE_MANAGERS)[number]

const store = createLocalStore<PackageManager>("plinth.pm.v1", "pnpm", (raw) => (PACKAGE_MANAGERS.includes(raw as PackageManager) ? (raw as PackageManager) : "pnpm"))

export const setPackageManager = (pm: PackageManager) => store.set(pm)
export const usePackageManager = () => useStore(store)

const RUN: Record<PackageManager, string> = { pnpm: "pnpm dlx", npm: "npx", yarn: "yarn dlx", bun: "bunx --bun" }
const ADD: Record<PackageManager, string> = { pnpm: "pnpm add", npm: "npm install", yarn: "yarn add", bun: "bun add" }

export function toRunCommand(cli: string, pm: PackageManager) {
  return cli.replace(/^npx /, `${RUN[pm]} `)
}

export function toAddCommand(manual: string, pm: PackageManager) {
  return manual.replace(/^npm install /, `${ADD[pm]} `)
}
