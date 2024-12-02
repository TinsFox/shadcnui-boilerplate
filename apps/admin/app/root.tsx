import "@/styles/index.css"
import "./i18n"

import { env } from "@env"
// @ts-ignore
import { ClickToComponent } from "click-to-react-component"
import * as React from "react"
import { Links, Meta, Outlet, Scripts, ScrollRestoration } from "react-router"

import { RootProviders } from "./providers/root-providers"

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" type="image/svg+xml" href="/vite-boilerplate.svg" />
        <Meta />
        <Links />
      </head>
      <body className="font-sans antialiased bg-background">
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
