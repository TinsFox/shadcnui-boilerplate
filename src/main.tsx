import "./styles/index.css"

import * as React from "react"
import ReactDOM from "react-dom/client"

import App from "./App"
import { Fallback } from "./components/fallback"

async function deferRender() {
  if (process.env.NODE_ENV !== "development") {
    return
  }

  const { worker } = await import("./mocks/browser")

  // `worker.start()` returns a Promise that resolves
  // once the Service Worker is up and ready to intercept requests.
  worker.start({
    onUnhandledRequest(req, print) {
      if (req.url.startsWith("/assets/")) {
        return
      }
      if (!req.url.startsWith("/api/")) {
        return
      }
      print.warning()
    },
  })
}

deferRender().then(() => {
  ReactDOM.createRoot(document.querySelector("#root")!).render(
    <React.StrictMode>
      <React.Suspense fallback={<Fallback />}>
        <App />
      </React.Suspense>
    </React.StrictMode>,
  )
})
