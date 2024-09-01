import { FetchError, ofetch } from "ofetch"

export const apiFetch = ofetch.create({
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
    // TODO: response interceptor
  },
  onResponseError(context) {
    if (context.response.status === 401) {
      redirectToSignin()
    }
    try {
      const json = JSON.parse(context.response._data)
      if (context.response.status === 400 && json.code === 1003) {
        redirectToSignin()
      }
    } catch {
      // ignore
    }
  },
})

function redirectToSignin() {
  const requestUrl = new URL(window.location.href)
  const redirectTo = requestUrl.pathname + requestUrl.search
  const loginParams = redirectTo ? new URLSearchParams({ redirectTo }) : null
  const loginRedirect = ["/login", loginParams?.toString()]
    .filter(Boolean)
    .join("?")
  window.location.href = loginRedirect
}

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
