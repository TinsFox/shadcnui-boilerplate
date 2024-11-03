import type { Meta, StoryObj } from "@storybook/react"
import { getCoreRowModel, useReactTable } from "@tanstack/react-table"

import { Button } from "@/ui/button"

import { ProTableToolbar } from "./toolbar"

// 创建一个包装组件来使用 Hook
function ToolbarWrapper(props: Omit<React.ComponentProps<typeof ProTableToolbar>, "table">) {
  const table = useReactTable({
    data: [],
    columns: [],
    getCoreRowModel: getCoreRowModel(),
  })

  return <ProTableToolbar table={table} {...props} />
}

const meta = {
  title: "Components/ProTable/Toolbar",
  component: ToolbarWrapper,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof ToolbarWrapper>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    onRefresh: () => {},
    isLoading: false,
  },
}

export const WithCustomToolbar: Story = {
  args: {
    onRefresh: () => {},
    isLoading: false,
    toolbar: (
      <>
        <Button variant="outline" size="sm">
          Custom Action
        </Button>
        <Button variant="outline" size="sm">
          Another Action
        </Button>
      </>
    ),
  },
}

export const Loading: Story = {
  args: {
    onRefresh: () => {},
    isLoading: true,
  },
}
