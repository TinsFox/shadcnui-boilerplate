import { Outlet } from "react-router-dom"

import { Toaster as DefaultToaster } from "@/components/ui/toaster"

import { ThemeProvider } from "./providers"
import { TailwindIndicator } from "./tailwind-indicator"
import { ThemeSwitcher } from "./theme-switcher"

export function BaseLayout() {
  return (
    <>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <div className="relative flex min-h-screen flex-col">
          <div className="flex-1">
            <Outlet />
          </div>
        </div>
        <TailwindIndicator />
      </ThemeProvider>
      <ThemeSwitcher />
      <DefaultToaster />
    </>
  )
}
