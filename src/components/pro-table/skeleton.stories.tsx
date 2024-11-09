import type { Meta, StoryObj } from "@storybook/react"

import { ProTableSkeleton } from "./skeleton"

const meta = {
  title: "Components/ProTable/Loading",
  component: ProTableSkeleton,
  parameters: {
    layout: "padded",
    viewport: {
      defaultViewport: "desktop",
    },
  },
  decorators: [
    (Story) => (
      <div className="min-h-screen w-full p-4">
        <Story />
      </div>
    ),
  ],
  tags: ["autodocs"],
} satisfies Meta<typeof ProTableSkeleton>

export default meta
type Story = StoryObj<typeof ProTableSkeleton>

export const Default: Story = {
  args: {
    pagination: {
      pageSize: 10,

    },
  },
}

export const LongList: Story = {
  args: {
    pagination: {
      pageSize: 20,

    },
  },
}

export const ShortList: Story = {
  args: {
    pagination: {
      pageSize: 5,
    },
  },
}
