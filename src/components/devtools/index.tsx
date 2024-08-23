import { env } from "@env"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"

import { queryClient } from "@/lib/query-client"

import { TailwindIndicator } from "./tailwind-indicator"

if (import.meta.env.DEV) {
  // eslint-disable-next-line no-console
  console.table(env)
}
export function Devtools() {
  if (!env.VITE_ENABLE_DEVTOOLS) {
    return null
  }
  return (
    <>
      <ReactQueryDevtools buttonPosition="bottom-left" client={queryClient} />
      <TailwindIndicator />
    </>
  )
}
