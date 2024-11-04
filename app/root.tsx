import "@/styles/index.css"
import "./i18n"

import { env } from "@env"
import { ClickToComponent } from "click-to-react-component"
import * as React from "react"
import type { LinksFunction } from "react-router"
import { Links, Meta, Outlet, Scripts, ScrollRestoration } from "react-router"

import { RootProviders } from "./providers/root-providers"

export const links: LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  },
]

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <RootProviders>
          {children}
        </RootProviders>
        <ScrollRestoration />
        <Scripts />
        <ClickToComponent editor={env.VITE_EDITOR} />
      </body>
    </html>
  )
}

export default function App() {
  return <Outlet />
}
