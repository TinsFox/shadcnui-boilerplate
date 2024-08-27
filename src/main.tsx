import "./styles/index.css"

// @ts-expect-error
import { ClickToComponent } from "click-to-react-component"
import * as React from "react"
import ReactDOM from "react-dom/client"
import { RouterProvider } from "react-router-dom"

import { RootProviders } from "@/providers/root-providers"

import { router } from "./router"

async function deferRender() {
  if (process.env.NODE_ENV !== "development") {
    return
  }

  const { worker } = await import("./mocks/browser")

  // `worker.start()` returns a Promise that resolves
  // once the Service Worker is up and ready to intercept requests.
  return worker.start({
    onUnhandledRequest(req, print) {
      if (req.url.includes("/assets/")) {
        return
      }
      if (!req.url.includes("/api/")) {
        return
      }
      print.warning()
    },
  })
}

deferRender().then(() => {
  ReactDOM.createRoot(document.querySelector("#root")!).render(
    <React.StrictMode>
      <RootProviders>
        <RouterProvider
          router={router}
          fallbackElement={<div>Loading...</div>}
        />
      </RootProviders>
      <ClickToComponent editor="cursor" />
    </React.StrictMode>,
  )
})
