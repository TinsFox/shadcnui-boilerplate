import { QueryClient } from "@tanstack/react-query"
import { FetchError } from "ofetch"

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retryDelay: 1000,
      retry(failureCount, error) {
        console.error(error)
        if (error instanceof FetchError && error.statusCode === undefined) {
          return false
        }

        return !!(3 - failureCount)
      },
    },
  },
})

export { queryClient }
