import { FetchError, ofetch } from "ofetch"

import { NetworkStatus, setApiStatus } from "@/atoms/network"

export const apiFetch = ofetch.create({
  // baseURL: import.meta.env.VITE_API_URL,
  credentials: "include",
  retry: false,
  onRequest: async ({ options }) => {
    const header = new Headers(options.headers)

    options.headers = {
      ...header,
    }

    if (options.method && options.method.toLowerCase() !== "get") {
      if (typeof options.body === "string") {
        options.body = JSON.parse(options.body)
      }
      if (!options.body) {
        options.body = {}
      }
    }
  },
  onResponse() {
    setApiStatus(NetworkStatus.ONLINE)
  },
  onResponseError(context) {
    // If api is down
    if (
      (!context.response || context.response.status === 0) &&
      navigator.onLine
    ) {
      setApiStatus(NetworkStatus.OFFLINE)
    } else {
      setApiStatus(NetworkStatus.ONLINE)
    }

    if (context.response.status === 401) {
      // Or we can present LoginModal here.
      // window.location.href = "/signin"
      // If any response status is 401, we can set auth fail. Maybe some bug, but if navigate to login page, had same issues
    }
    try {
      const json = JSON.parse(context.response._data)
      if (context.response.status === 400 && json.code === 1003) {
        // window.location.href = "/signin"
      }
    } catch {
      // ignore
    }
  },
})

export const getFetchErrorMessage = (error: Error) => {
  if (error instanceof FetchError) {
    try {
      const json = JSON.parse(error.response?._data)
      const { reason } = json
      return `${json.message || error.message}${reason ? `: ${reason}` : ""}`
    } catch {
      return error.message
    }
  }

  return error.message
}
