import { Table, TableBody } from "@repo/ui/table"
import type { Meta, StoryObj } from "@storybook/react"

import { DataTableSkeleton } from "./data-table-skeleton"

const meta = {
  title: "Components/ProTable/Loading",
  component: DataTableSkeleton,
  parameters: {
    layout: "padded",
    viewport: {
      defaultViewport: "desktop",
    },
  },
  decorators: [
    (Story) => (
      <div className="rounded-md border">
        <Table>
          <TableBody>
            <Story />
          </TableBody>
        </Table>
      </div>
    ),
  ],
  tags: ["autodocs"],
} satisfies Meta<typeof DataTableSkeleton>

export default meta
type Story = StoryObj<typeof DataTableSkeleton>

export const Default: Story = {
  args: {
    pagination: {
      pageSize: 10,
    },
    columns: 6,
  },
}

export const LongList: Story = {
  args: {
    pagination: {
      pageSize: 20,
    },
    columns: 6,
  },
}

export const ShortList: Story = {
  args: {
    pagination: {
      pageSize: 5,
    },
    columns: 4,
  },
}

export const ManyColumns: Story = {
  args: {
    pagination: {
      pageSize: 10,
    },
    columns: 10,
  },
}
