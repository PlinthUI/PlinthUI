"use client"

import { Check, Minus } from "lucide-react"

const PLANS = ["Starter", "Growth", "Scale"]
const GROUPS = [
  {
    title: "Collaboration",
    rows: [
      { f: "Members", v: ["3", "15", "Unlimited"] },
      { f: "Shared libraries", v: [false, true, true] },
      { f: "Comment threads", v: [true, true, true] },
    ],
  },
  {
    title: "Security",
    rows: [
      { f: "Single sign on", v: [false, false, true] },
      { f: "Audit log", v: [false, true, true] },
      { f: "Data retention", v: ["30 days", "1 year", "Custom"] },
    ],
  },
]

export default function PricingComparisonTable() {
  return (
    <div className="mx-auto w-full max-w-3xl overflow-x-auto rounded-xl border bg-card">
      <table className="w-full min-w-[30rem] text-sm">
        <caption className="sr-only">Plan comparison</caption>
        <thead>
          <tr className="border-b">
            <td className="p-4" />
            {PLANS.map((p, i) => (
              <th key={p} scope="col" className="p-4 text-left align-bottom">
                <span className="block font-semibold">{p}</span>
                <span className="mt-0.5 block text-xs font-normal text-muted-foreground tnum">${[19, 49, 129][i]} / month, mock</span>
              </th>
            ))}
          </tr>
        </thead>
        {GROUPS.map((g) => (
          <tbody key={g.title}>
            <tr>
              <th colSpan={4} scope="colgroup" className="bg-secondary/60 px-4 py-2 text-left text-xs font-medium text-muted-foreground">
                {g.title}
              </th>
            </tr>
            {g.rows.map((r) => (
              <tr key={r.f} className="border-t">
                <th scope="row" className="px-4 py-3 text-left font-normal">
                  {r.f}
                </th>
                {r.v.map((v, i) => (
                  <td key={i} className="px-4 py-3 tnum">
                    {typeof v === "boolean" ? (
                      v ? (
                        <>
                          <Check className="size-4 text-primary" aria-hidden />
                          <span className="sr-only">Included</span>
                        </>
                      ) : (
                        <>
                          <Minus className="size-4 text-muted-foreground" aria-hidden />
                          <span className="sr-only">Not included</span>
                        </>
                      )
                    ) : (
                      v
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        ))}
      </table>
    </div>
  )
}
