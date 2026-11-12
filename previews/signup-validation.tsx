"use client"

import { useId, useRef, useState } from "react"
import { Check } from "lucide-react"

type Values = { name: string; email: string; password: string }
const FIELDS: { key: keyof Values; label: string; type: string; auto: string }[] = [
  { key: "name", label: "Full name", type: "text", auto: "name" },
  { key: "email", label: "Email", type: "email", auto: "email" },
  { key: "password", label: "Password", type: "password", auto: "new-password" },
]

function validate(v: Values): Partial<Values> {
  const e: Partial<Values> = {}
  if (v.name.trim().length < 2) e.name = "Enter your name."
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.email)) e.email = "Enter a valid email address."
  if (v.password.length < 10) e.password = "Use at least 10 characters."
  return e
}

export default function SignupValidation() {
  const uid = useId()
  const [values, setValues] = useState<Values>({ name: "", email: "", password: "" })
  const [touched, setTouched] = useState<Partial<Record<keyof Values, boolean>>>({})
  const [submitted, setSubmitted] = useState(false)
  const [done, setDone] = useState(false)
  const refs = useRef<Partial<Record<keyof Values, HTMLInputElement | null>>>({})
  const errors = validate(values)
  const failing = FIELDS.filter((f) => errors[f.key])

  function submit(e: React.FormEvent) {
    e.preventDefault()
    setSubmitted(true)
    if (failing.length) {
      refs.current[failing[0].key]?.focus()
      return
    }
    setDone(true)
  }

  if (done)
    return (
      <div role="status" className="mx-auto flex w-full max-w-sm flex-col items-center gap-2 rounded-xl border bg-card p-8 text-center">
        <Check className="size-8 text-success" aria-hidden />
        <p className="font-medium">Welcome, {values.name.split(" ")[0]}</p>
        <p className="text-sm text-muted-foreground">Account created in this demo only.</p>
      </div>
    )

  return (
    <form onSubmit={submit} noValidate className="mx-auto w-full max-w-sm rounded-xl border bg-card p-6">
      <h3 className="text-lg font-semibold">Create your account</h3>
      {submitted && failing.length > 0 && (
        <div role="alert" className="mt-3 rounded-lg border border-destructive/40 bg-destructive/5 p-3 text-sm">
          <p className="font-medium">Fix {failing.length} {failing.length === 1 ? "field" : "fields"} to continue</p>
          <ul className="mt-1 list-inside list-disc">
            {failing.map((f) => (
              <li key={f.key}>
                <a href={`#${uid}-${f.key}`} onClick={(e) => { e.preventDefault(); refs.current[f.key]?.focus() }} className="underline underline-offset-2">
                  {f.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
      <div className="mt-4 grid gap-3">
        {FIELDS.map((f) => {
          const show = (touched[f.key] || submitted) && errors[f.key]
          return (
            <div key={f.key}>
              <label htmlFor={`${uid}-${f.key}`} className="mb-1.5 block text-sm font-medium">
                {f.label}
              </label>
              <input
                id={`${uid}-${f.key}`}
                ref={(el) => {
                  refs.current[f.key] = el
                }}
                type={f.type}
                autoComplete={f.auto}
                value={values[f.key]}
                onChange={(e) => setValues({ ...values, [f.key]: e.target.value })}
                onBlur={() => setTouched({ ...touched, [f.key]: true })}
                aria-invalid={!!show}
                aria-describedby={`${uid}-${f.key}-err`}
                className="h-11 w-full rounded-lg border border-input bg-background px-3 text-sm aria-[invalid=true]:border-destructive"
              />
              <p id={`${uid}-${f.key}-err`} className="mt-1 min-h-5 text-sm text-destructive">
                {show ? errors[f.key] : ""}
              </p>
            </div>
          )
        })}
      </div>
      <button type="submit" className="mt-2 h-11 w-full rounded-lg bg-primary text-sm font-medium text-primary-foreground hover:bg-primary/90">
        Create account
      </button>
    </form>
  )
}
