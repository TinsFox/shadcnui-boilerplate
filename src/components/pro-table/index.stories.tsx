/* eslint-disable no-console */
import type { Meta, StoryObj } from "@storybook/react"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

import { ProTable } from "./index"
import type { ColumnDef, ProTableProps } from "./types"

// 基础数据接口
interface Person {
  id: number
  firstName: string
  lastName: string
  age: number
  email: string
  status: "active" | "inactive"
}

// 基础数据
const basicData: Person[] = Array.from({ length: 10 }).map((_, index) => ({
  id: index + 1,
  firstName: `First${index + 1}`,
  lastName: `Last${index + 1}`,
  age: 20 + (index % 30),
  email: `person${index + 1}@example.com`,
  status: index % 2 === 0 ? "active" : "inactive",
}))

// 基础列配置
const basicColumns: ColumnDef<Person>[] = [
  {
    id: "id",
    accessorKey: "id",
    header: "ID",
    size: 80,
  },
  {
    accessorKey: "firstName",
    header: "First Name",
    size: 150,
  },
  {
    accessorKey: "lastName",
    header: "Last Name",
    size: 150,
  },
  {
    accessorKey: "age",
    header: "Age",
    size: 100,
  },
  {
    accessorKey: "email",
    header: "Email",
    size: 200,
  },
  {
    accessorKey: "status",
    header: "Status",
    size: 120,
    cell: ({ row }) => (
      <span
        className={cn(
          "inline-flex rounded-full px-2 text-xs font-semibold leading-5",
          row.original.status === "active" ?
            "bg-green-100 text-green-800" :
            "bg-red-100 text-red-800",
        )}
      >
        {row.original.status}
      </span>
    ),
  },
]

const meta = {
  title: "Components/ProTable",
  component: ProTable,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<ProTableProps<Person, unknown>>

export default meta
type Story = StoryObj<ProTableProps<Person, unknown>>

// 基础表格示例
export const Basic: Story = {
  args: {
    columns: basicColumns,
    data: basicData,
    isLoading: false,
  },
}

// 带分页的表格示例
export const WithPagination: Story = {
  args: {
    columns: basicColumns,
    data: basicData,
    isLoading: false,
    pagination: {
      pageIndex: 0,
      pageSize: 5,
      total: basicData.length,
      onPaginationChange: () => {},
    },
  },
}

// 加载状态示例
export const Loading: Story = {
  args: {
    columns: basicColumns,
    data: [],
    isLoading: true,
  },
}

// 空数据状态示例
export const Empty: Story = {
  args: {
    columns: basicColumns,
    data: [],
    isLoading: false,
  },
}

// 带搜索功能的表格示例
export const WithSearch: Story = {
  args: {
    columns: basicColumns.map((column) => ({
      ...column,
      search: true,
    })),
    data: basicData,
    isLoading: false,
    onSearch: (params) => {
      console.log("Search params:", params)
    },
  },
}

// 带自定义工具栏的表格示例
export const WithCustomToolbar: Story = {
  args: {
    columns: basicColumns,
    data: basicData,
    isLoading: false,
    toolbar: (
      <>
        <Button variant="outline" size="sm">
          Add New
        </Button>
        <Button variant="outline" size="sm">
          Export
        </Button>
      </>
    ),
  },
}

// 固定列示例
export const WithPinnedColumns: Story = {
  args: {
    columns: [
      {
        id: "id",
        accessorKey: "id",
        header: "ID",
        size: 80,
        enablePinning: true,
        pinned: "left",
      },
      ...basicColumns.slice(1, -1),
      {
        ...basicColumns.at(-1),
        enablePinning: true,
        pinned: "right",
        id: "status",
      },
    ],
    data: basicData,
    isLoading: false,
  },
}

// 自定义列宽示例
export const WithCustomColumnSizes: Story = {
  args: {
    columns: basicColumns.map((column) => ({
      ...column,
      size: column.accessorKey === "email" ? 300 : 150,
    })),
    data: basicData,
    isLoading: false,
  },
}

// 带刷新功能的表格示例
export const WithRefresh: Story = {
  args: {
    columns: basicColumns,
    data: basicData,
    isLoading: false,
    onRefresh: () => {
      console.log("Refreshing data...")
    },
  },
}

// 带列显示控制的表格示例
export const WithColumnVisibility: Story = {
  args: {
    columns: basicColumns,
    data: basicData,
    isLoading: false,
    initialState: {
      columnVisibility: {
        age: false,
        email: false,
      },
    },
  },
}

// 带自定义单元格渲染的表格示例
export const WithCustomCells: Story = {
  args: {
    columns: [
      ...basicColumns.slice(0, -1),
      {
        accessorKey: "status",
        header: "Status",
        size: 120,
        cell: ({ row }) => (
          <div className="flex items-center gap-2">
            <span
              className={cn(
                "size-2 rounded-full",
                row.original.status === "active" ? "bg-green-500" : "bg-red-500",
              )}
            />
            <span className="capitalize">{row.original.status}</span>
          </div>
        ),
      },
      {
        id: "actions",
        header: "Actions",
        size: 100,
        cell: () => (
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              Edit
            </Button>
          </div>
        ),
      },
    ],
    data: basicData,
    isLoading: false,
  },
}
