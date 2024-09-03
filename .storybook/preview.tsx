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
  },
  decorators: [
    (Story) => (
      <div style={{ margin: "0" }}>
        <RootProviders>
          <Story />
        </RootProviders>
      </div>
    ),
  ],
}

export default preview
