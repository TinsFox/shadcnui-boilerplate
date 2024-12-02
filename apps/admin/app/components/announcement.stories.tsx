import type { Meta, StoryObj } from "@storybook/react"
import { BrowserRouter } from "react-router"

import { Announcement } from "./announcement"

const meta = {
  title: "Components/Announcement",
  component: Announcement,
  decorators: [
    (Story) => (
      <BrowserRouter>
        <Story />
      </BrowserRouter>
    ),
  ],
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof Announcement>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
