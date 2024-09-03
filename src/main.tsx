import "./styles/index.css"
import "./i18n"

import { env } from "@env"
// @ts-expect-error
import { ClickToComponent } from "click-to-react-component"
import * as React from "react"
import ReactDOM from "react-dom/client"
import { RouterProvider } from "react-router-dom"

import { DevMonitorPanel } from "@/components/devtools/dev-monitor-panel"
import { Fallback } from "@/components/fallback"
import { ThemeCustomizer } from "@/components/theme/theme-customizer"
import { RootProviders } from "@/providers/root-providers"

import { router } from "./router"

async function deferRender() {
  if (!env.VITE_ENABLE_MOCK) {
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
          fallbackElement={<Fallback />}
        />
        <DevMonitorPanel />
        <ThemeCustomizer className="fixed bottom-4 right-4 z-[9999]" />
      </RootProviders>
      <ClickToComponent editor={env.VITE_EDITOR} />
    </React.StrictMode>,
  )
})
