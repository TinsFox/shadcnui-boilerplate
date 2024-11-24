import "@repo/ui/globals.css"

import type { Preview } from "@storybook/react"
import { themes } from "@storybook/theming"
import * as React from "react"

import { ThemeProvider } from "../src/components/theme/theme-provider"
import { ThemeSwitcher } from "../src/components/theme/theme-switcher"
import { RootProviders } from "../src/providers/root-providers"

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      disable: true,
      grid: {
        disable: true,
      },
    },
    layout: "padded",
    darkMode: {
      current: "light",
      dark: { ...themes.dark },
      light: { ...themes.light },
      darkClass: "dark",
      lightClass: "light",
      classTarget: "html",
      stylePreview: true,
    },
  },
  decorators: [
    (Story) => {
      return (
        <ThemeProvider defaultTheme="system">
          <div className="min-h-screen w-[1200px] max-w-full bg-background text-foreground">
            <RootProviders>
              <div className="fixed right-4 top-4 z-50">
                <ThemeSwitcher />
              </div>
              <div className="w-full p-4">
                <Story />
              </div>
            </RootProviders>
          </div>
        </ThemeProvider>
      )
    },
  ],
}

export default preview
