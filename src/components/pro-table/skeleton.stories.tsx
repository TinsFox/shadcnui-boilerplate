import type { Meta, StoryObj } from "@storybook/react"

import { ProTableSkeleton } from "./skeleton"

const meta = {
  title: "Components/ProTable/Loading",
  component: ProTableSkeleton,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof ProTableSkeleton>

export default meta
type Story = StoryObj<typeof ProTableSkeleton>

export const Default: Story = {
  args: {
    pagination: {
      pageSize: 5,
    },
  },
}

export const LongList: Story = {
  args: {
    pagination: {
      pageSize: 10,
    },
  },
}

export const ShortList: Story = {
  args: {
    pagination: {
      pageSize: 3,
    },
  },
}

export const WithoutPagination: Story = {
  args: {},
}
