import type { Meta, StoryObj } from "@storybook/react"
import * as React from "react"

import { Button } from "@/components/ui/button"

import { ProTable } from "./index"

// Define mock data interface
interface Person {
  id: number
  firstName: string
  lastName: string
  age: number
  email: string
  status: "active" | "inactive"
}

// Create mock data
const mockData: Person[] = Array.from({ length: 50 }).map((_, index) => ({
  id: index + 1,
  firstName: `First${index + 1}`,
  lastName: `Last${index + 1}`,
  age: 20 + (index % 30),
  email: `person${index + 1}@example.com`,
  status: index % 2 === 0 ? "active" : "inactive",
}))

// Create columns configuration
const columns = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "firstName",
    header: "First Name",
  },
  {
    accessorKey: "lastName",
    header: "Last Name",
  },
  {
    accessorKey: "age",
    header: "Age",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <span
        className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${row.original.status === "active" ?
          "bg-green-100 text-green-800" :
          "bg-red-100 text-red-800"
          }`}
      >
        {row.original.status}
      </span>
    ),
  },
]

const meta = {
  title: "Components/ProTable",
  component: ProTable,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof ProTable>

export default meta
type Story = StoryObj<typeof meta>

// Default story
export const Default: Story = {
  args: {
    columns,
    data: mockData.slice(0, 10),
    isLoading: false,
    pagination: {
      pageIndex: 0,
      pageSize: 10,
      total: mockData.length,
      onPaginationChange: () => {},
    },
  },
}

// Loading state story
export const Loading: Story = {
  args: {
    ...Default.args,
    isLoading: true,
  },
}

// Empty state story
export const Empty: Story = {
  args: {
    ...Default.args,
    data: [],
  },
}

// With custom toolbar story
export const WithCustomToolbar: Story = {
  args: {
    ...Default.args,
    toolbar: (
      <div className="flex gap-2">
        <Button>
          Add New
        </Button>
        <Button>
          Export
        </Button>
      </div>
    ),
  },
}

// Large dataset story
export const LargeDataset: Story = {
  args: {
    ...Default.args,
    data: mockData,
    pagination: {
      pageIndex: 0,
      pageSize: 20,
      total: mockData.length,
      onPaginationChange: () => {},
    },
  },
}

// Interactive example with state management
export const Interactive: Story = {
  render: function Render() {
    const [pageIndex, setPageIndex] = React.useState(0)
    const [pageSize, setPageSize] = React.useState(10)

    const paginatedData = React.useMemo(() => {
      const start = pageIndex * pageSize
      return mockData.slice(start, start + pageSize)
    }, [pageIndex, pageSize])

    return (
      <ProTable
        columns={columns}
        data={paginatedData}
        isLoading={false}
        pagination={{
          pageIndex,
          pageSize,
          total: mockData.length,
          onPaginationChange: ({ pageIndex: newPageIndex, pageSize: newPageSize }) => {
            setPageIndex(newPageIndex)
            setPageSize(newPageSize)
          },
        }}
      />
    )
  },
}
