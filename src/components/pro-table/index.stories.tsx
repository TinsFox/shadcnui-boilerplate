import type { Meta, StoryObj } from "@storybook/react"
import * as React from "react"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

import { ProTable } from "./index"
import type { ColumnDef, ProTableProps } from "./types"

// Define mock data interface
interface Person {
  id: number
  firstName: string
  lastName: string
  age: number
  email: string
  status: "active" | "inactive"
  address: string
  phone: string
  company: string
  department: string
  title: string
  salary: number
  startDate: string
  manager: string
  location: string
  skills: string[]
  projects: string[]
  performance: "excellent" | "good" | "average" | "poor"
  lastReview: string
  nextReview: string
}

// Create mock data
const mockData: Person[] = Array.from({ length: 50 }).map((_, index) => ({
  id: index + 1,
  firstName: `First${index + 1}`,
  lastName: `Last${index + 1}`,
  age: 20 + (index % 30),
  email: `person${index + 1}@example.com`,
  status: index % 2 === 0 ? "active" : "inactive",
  address: `Street ${index + 1}, City ${index % 10}`,
  phone: `+1 ${Math.floor(Math.random() * 1000000000)}`,
  company: `Company ${index % 5}`,
  department: `Department ${index % 3}`,
  title: `${index % 2 === 0 ? "Senior" : "Junior"} ${index % 3 === 0 ? "Developer" : "Designer"}`,
  salary: 50000 + (index * 1000),
  startDate: new Date(2020, index % 12, 1).toISOString().slice(0, 10),
  manager: `Manager ${index % 5}`,
  location: `${["New York", "London", "Tokyo", "Paris", "Berlin"][index % 5]}`,
  skills: Array.from({ length: 3 }, (_, i) => `Skill ${(index + i) % 10}`),
  projects: Array.from({ length: 2 }, (_, i) => `Project ${(index + i) % 8}`),
  performance: ["excellent", "good", "average", "poor"][index % 4] as Person["performance"],
  lastReview: new Date(2023, index % 12, 1).toISOString().slice(0, 10),
  nextReview: new Date(2024, index % 12, 1).toISOString().slice(0, 10),
}))

// Create columns configuration with fixed columns
const columns: ColumnDef<Person>[] = [
  {
    id: "id",
    accessorKey: "id",
    header: "ID",
    enablePinning: true,
    pinned: "left",
    size: 80,
  },
  {
    id: "firstName",
    accessorKey: "firstName",
    header: "First Name",
    enablePinning: true,
    pinned: "left",
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
    accessorKey: "title",
    header: "Title",
    size: 200,
  },
  {
    accessorKey: "department",
    header: "Department",
    size: 180,
  },
  {
    accessorKey: "salary",
    header: "Salary",
    size: 150,
    cell: ({ row }) => `$${row.original.salary.toLocaleString()}`,
  },
  {
    accessorKey: "email",
    header: "Email",
    size: 250,
  },
  {
    accessorKey: "phone",
    header: "Phone",
    size: 180,
  },
  {
    accessorKey: "location",
    header: "Location",
    size: 150,
  },
  {
    accessorKey: "manager",
    header: "Manager",
    size: 180,
  },
  {
    accessorKey: "startDate",
    header: "Start Date",
    size: 150,
  },
  {
    accessorKey: "skills",
    header: "Skills",
    size: 250,
    cell: ({ row }) => row.original.skills.join(", "),
  },
  {
    accessorKey: "projects",
    header: "Projects",
    size: 200,
    cell: ({ row }) => row.original.projects.join(", "),
  },
  {
    accessorKey: "performance",
    header: "Performance",
    size: 150,
    cell: ({ row }) => (
      <span
        className={cn(
          "inline-flex rounded-full px-2 text-xs font-semibold leading-5",
          {
            "bg-green-100 text-green-800": row.original.performance === "excellent",
            "bg-blue-100 text-blue-800": row.original.performance === "good",
            "bg-yellow-100 text-yellow-800": row.original.performance === "average",
            "bg-red-100 text-red-800": row.original.performance === "poor",
          },
        )}
      >
        {row.original.performance}
      </span>
    ),
  },
  {
    accessorKey: "lastReview",
    header: "Last Review",
    size: 150,
  },
  {
    accessorKey: "nextReview",
    header: "Next Review",
    size: 150,
  },
  {
    accessorKey: "company",
    header: "Company",
    size: 200,
  },
  {
    accessorKey: "address",
    header: "Address",
    size: 300,
  },
  {
    accessorKey: "status",
    header: "Status",
    enablePinning: true,
    size: 120,
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
  {
    id: "actions",
    header: "Actions",
    enablePinning: true,
    size: 100,
    cell: () => (
      <div className="flex gap-2">
        <Button variant="outline" size="sm">
          Edit
        </Button>
      </div>
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

// Default story with pinned columns
export const WithPinnedColumns: Story = {
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
  render: function Render(args) {
    return (
      <div className="mx-auto max-w-[800px] p-4">
        <div className="mb-4 space-y-2">
          <h3 className="text-lg font-medium">Fixed Columns Demo</h3>
          <p className="text-sm text-muted-foreground">
            This example demonstrates fixed columns functionality:
          </p>
          <ul className="list-inside list-disc text-sm text-muted-foreground">
            <li>ID and First Name are fixed to the left</li>
            <li>Status and Actions are fixed to the right</li>
            <li>Middle columns are scrollable</li>
          </ul>
        </div>
        <ProTable
          {...args}

        />
      </div>
    )
  },
}

// Interactive story with dynamic column pinning
export const InteractivePinning: Story = {
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
  render: function Render(args) {
    const [columnPinning, setColumnPinning] = React.useState({
      left: ["id"],
      right: ["actions"],
    })

    const handlePin = (columnId: string, position: "left" | "right" | null) => {
      setColumnPinning((prev) => {
        const newPinning = {
          left: [...prev.left],
          right: [...prev.right],
        }

        // Remove from both left and right
        newPinning.left = newPinning.left.filter((id) => id !== columnId)
        newPinning.right = newPinning.right.filter((id) => id !== columnId)

        // Add to new position if not null
        if (position) {
          newPinning[position].push(columnId)
        }

        return newPinning
      })
    }

    return (
      <div className="mx-auto max-w-[800px] p-4">
        <div className="mb-4 space-y-4">
          <h3 className="text-lg font-medium">Interactive Column Pinning</h3>
          <div className="flex flex-wrap gap-2">
            {columns.filter((col) => col.enablePinning).map((col) => {
              const colId = (col.id || col.accessorKey) as string
              return (
                <div key={colId} className="flex items-center gap-2">
                  <span className="text-sm font-medium">
                    {typeof col.header === "string" ? col.header : colId}
                  </span>
                  <select
                    className="rounded-md border px-2 py-1 text-sm"
                    value={
                      columnPinning.left.includes(colId) ?
                        "left" :
                        columnPinning.right.includes(colId) ?
                          "right" :
                          "none"
                    }
                    onChange={(e) =>
                      handlePin(
                        colId,
                        e.target.value === "none" ? null : (e.target.value as "left" | "right"),
                      )}
                  >
                    <option value="none">Unpinned</option>
                    <option value="left">Pin Left</option>
                    <option value="right">Pin Right</option>
                  </select>
                </div>
              )
            })}
          </div>
        </div>
        <ProTable {...args} initialState={{ columnPinning }} />
      </div>
    )
  },
}

// Loading state story
export const Loading: Story = {
  args: {
    ...WithPinnedColumns.args,
    isLoading: true,
  },
}

// Empty state story
export const Empty: Story = {
  args: {
    ...WithPinnedColumns.args,
    data: [],
  },
}
