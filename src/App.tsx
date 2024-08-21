import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import type { PropsWithChildren, ReactElement } from "react"
import { lazy, Suspense } from "react"
import { RouterProvider } from "react-router-dom"

import { router } from "./router"

const queryClient = new QueryClient()

if (import.meta.hot) {
  import.meta.hot.dispose(() => router.dispose())
}

const DevTools = lazy(() =>
  import("@tanstack/react-query-devtools").then((m) => ({
    default: m.ReactQueryDevtools,
  })),
)

const DebugProvider = ({ children }: PropsWithChildren): ReactElement => (
  <>
    <Suspense>{import.meta.env.DEV && <DevTools />}</Suspense>
    {children}
  </>
)

const future = {
  v7_startTransition: true,
} as const

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <DebugProvider>
          <RouterProvider
            fallbackElement={<div>RouterFallback</div>}
            router={router}
            future={future}
          />
        </DebugProvider>
      </QueryClientProvider>
    </>
  )
}

export default App
