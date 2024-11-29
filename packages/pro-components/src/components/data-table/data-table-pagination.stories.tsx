import type { Meta, StoryObj } from "@storybook/react"
import { getCoreRowModel, useReactTable } from "@tanstack/react-table"
import * as React from "react"

import { DataTablePagination } from "./data-table-pagination"

// 创建一个包装组件来使用 Hook
function PaginationWrapper(props: Omit<React.ComponentProps<typeof DataTablePagination>, "table">) {
  // 模拟数据和列
  const data = React.useMemo(() => Array.from({ length: 100 }).fill(0).map((_, index) => ({ id: index })), [])
  const columns = React.useMemo(() => [{ accessorKey: "id" }], [])

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    pageCount: Math.ceil(data.length / (props.pagination?.pageSize || 10)),
    state: {
      pagination: {
        pageIndex: props.pagination?.pageIndex || 0,
        pageSize: props.pagination?.pageSize || 10,
      },
    },
    manualPagination: true,
  })

  return <DataTablePagination table={table} {...props} />
}

const meta = {
  title: "Components/ProTable/Pagination",
  component: PaginationWrapper,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof PaginationWrapper>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    pagination: {
      pageIndex: 0,
      pageSize: 10,
      total: 100,
    },
  },
}

export const CustomPageSize: Story = {
  args: {
    pagination: {
      pageIndex: 0,
      pageSize: 20,
      total: 100,
    },
  },
}

export const MidPage: Story = {
  args: {
    pagination: {
      pageIndex: 5,
      pageSize: 10,
      total: 100,
    },
  },
}

export const LastPage: Story = {
  args: {
    pagination: {
      pageIndex: 9,
      pageSize: 10,

      total: 100,
    },
  },
}

export const SmallDataSet: Story = {
  args: {
    pagination: {
      pageIndex: 0,
      pageSize: 10,

      total: 30,
    },
  },
}
