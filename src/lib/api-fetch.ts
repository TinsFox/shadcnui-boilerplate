import { FetchError, ofetch } from "ofetch"

export const apiFetch = ofetch.create({
  credentials: "include",
  retry: false,
  onResponseError(context) {
    if (context.response.status === 401) {
      return redirectToLogin()
    }
  },
})

function redirectToLogin() {
  if (window.location.pathname === "/login") {
    return
  }
  const requestUrl = new URL(window.location.href)
  const redirectTo = requestUrl.pathname + requestUrl.search
  const loginParams = new URLSearchParams(requestUrl.search)
  if (!loginParams.has("redirectTo")) {
    loginParams.append("redirectTo", redirectTo)
  }
  const loginRedirect = `/login?${loginParams.toString()}`
  window.location.href = loginRedirect
}

export const getFetchErrorMessage = (error: Error) => {
  if (error instanceof FetchError) {
    try {
      const json = error.response?._data
      const { message } = json
      return `${message || error.message}`
    } catch {
      return error.message
    }
  }

  return error.message
}
