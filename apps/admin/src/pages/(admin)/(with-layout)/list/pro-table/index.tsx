import {
  DotsHorizontalIcon,
} from "@radix-ui/react-icons"
import type { ColumnDef, SearchParams } from "@repo/pro-table/pro-table"
import { ProTable } from "@repo/pro-table/pro-table"
import { Avatar, AvatarFallback, AvatarImage } from "@repo/ui/avatar"
import { Button } from "@repo/ui/button"
import { Checkbox } from "@repo/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@repo/ui/dropdown-menu"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@repo/ui/select"
import { Textarea } from "@repo/ui/textarea"
import type {
  PaginationState,
} from "@tanstack/react-table"
import * as React from "react"

import { useUsers } from "@/hooks/query/use-user"
import type { IUsers } from "@/schema/user"

const columns: ColumnDef<IUsers>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "id",
    header: "ID",
    cell: ({ row }) => <div className="lowercase line-clamp-1">{row.getValue("id")}</div>,
    search: {
      placeholder: "Search by ID",
    },
  },
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => <div className="lowercase">{row.getValue("name")}</div>,
    search: {
      placeholder: "Search by name",
    },
  },
  {
    accessorKey: "role",
    header: "Role",
    cell: ({ row }) => <div className="lowercase">{row.getValue("role")}</div>,
    search: {
      render: ({ value, onChange }) => (
        <Select
          value={value}
          onValueChange={onChange}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select a role" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="admin">Admin</SelectItem>
            <SelectItem value="user">User</SelectItem>
          </SelectContent>
        </Select>
      ),
    },
  },
  {
    accessorKey: "avatar",
    header: "Avatar",
    cell: ({ row }) => (
      <div className="lowercase">
        <Avatar>
          <AvatarImage src={row.getValue("avatar")} />
          <AvatarFallback>
            {row.original.name.charAt(0)}
          </AvatarFallback>
        </Avatar>
      </div>
    ),
  },
  {
    accessorKey: "createdAt",
    header: "Created At",
    cell: ({ row }) => (
      <div className="lowercase">
        {new Date(row.getValue("createdAt")).toLocaleDateString()}
      </div>
    ),
    search: {
      placeholder: "Search by date",
      render: ({ value, onChange }) => (
        <input
          type="date"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
        />
      ),
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("status")}</div>
    ),
    search: {
      placeholder: "Search by status",
      render: ({ value, onChange }) => (
        <Select
          value={value}
          onValueChange={onChange}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="inactive">Inactive</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
          </SelectContent>
        </Select>
      ),
    },
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => <div className="lowercase">{row.getValue("email")}</div>,
    search: {
      render: ({ value, onChange }) => (
        <Textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Type your message here."
        />
      ),
    },
  },
  {
    accessorKey: "amount",
    header: () => <div className="text-right">Amount</div>,
    cell: ({ row }) => {
      const amount = Number.parseFloat(row.getValue("amount"))

      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount)

      return <div className="text-right font-medium">{formatted}</div>
    },
  },
  {
    id: "actions",
    enableHiding: false,
    header: () => <div className="">Actions</div>,
    cell: ({ row }) => {
      const user = row.original
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="size-8 p-0">
              <span className="sr-only">Open menu</span>
              <DotsHorizontalIcon className="size-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(user.id)}
            >
              Copy payment ID
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]

export function Component() {
  const [pagination, setPagination] = React.useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  })
  const [searchParams, setSearchParams] = React.useState<Partial<IUsers>>({})

  const { data: users, isLoading, refetch } = useUsers(pagination, searchParams)
  const handlePaginationChange = (_pagination: PaginationState) => {
    setPagination(_pagination)
  }

  const handleSearch = (params: SearchParams) => {
    setSearchParams(params)
  }

  return (
    <div>
      <div className="mb-4 text-2xl font-bold">Pro Data Table</div>
      <ProTable
        columns={columns}
        data={users?.list ?? []}
        isLoading={isLoading}
        onRefresh={() => refetch()}
        pagination={{
          pageIndex: pagination.pageIndex,
          pageSize: pagination.pageSize,
          total: users?.total ?? 0,
          onPaginationChange: handlePaginationChange,
        }}
        onSearch={handleSearch}
      />
    </div>
  )
}
