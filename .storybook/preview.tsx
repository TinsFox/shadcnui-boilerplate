import "../src/styles/index.css"

import type { Preview } from "@storybook/react"
import * as React from "react"

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
      default: "light",
      values: [
        {
          name: "light",
          value: "#ffffff",
        },
        {
          name: "dark",
          value: "#1a1a1a",
        },
      ],
    },
    layout: "padded",
  },
  decorators: [
    (Story) => (
      <div className="min-h-screen w-[1200px] max-w-full bg-background text-foreground">
        <RootProviders>
          <div className="w-full p-4">
            <Story />
          </div>
        </RootProviders>
      </div>
    ),
  ],
}

export default preview
