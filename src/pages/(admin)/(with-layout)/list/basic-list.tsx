import {
  CaretSortIcon,
  ChevronDownIcon,
  DotsHorizontalIcon,
} from "@radix-ui/react-icons"
import type {
  ColumnDef,
  ColumnFiltersState,
  PaginationState,
  SortingState,
  VisibilityState,
} from "@tanstack/react-table"
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"
import * as React from "react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { useUsers } from "@/hooks/query/use-user"
import type { IUsers } from "@/models/user"

import { ViewUser } from "./components/view-user"

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
    cell: ({ row }) => <div className="lowercase">{row.getValue("id")}</div>,
  },
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => <div className="lowercase">{row.getValue("name")}</div>,
  },
  {
    accessorKey: "role",
    header: "Role",
    cell: ({ row }) => <div className="lowercase">{row.getValue("role")}</div>,
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
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("status")}</div>
    ),
  },
  {
    accessorKey: "email",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Email
        <CaretSortIcon className="ml-2 size-4" />
      </Button>
    ),
    cell: ({ row }) => <div className="lowercase">{row.getValue("email")}</div>,
  },
  {
    accessorKey: "amount",
    header: () => <div className="text-right">Amount</div>,
    cell: ({ row }) => {
      const amount = Number.parseFloat(row.getValue("amount"))

      // Format the amount as a dollar amount
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
            <ViewUser user={row.original} />
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]

export function Component() {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    [],
  )
  const [pagination, setPagination] = React.useState<PaginationState>({
    pageIndex: 0,
    pageSize: 50,
  })
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState({})
  const { data: users } = useUsers(pagination)

  const PAGINATION_STEP = 3 // You can easily change this value to adjust the pagination step

  const table = useReactTable({
    data: users.list,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    onPaginationChange: setPagination,
    manualPagination: true,
    rowCount: users.total,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
      pagination: {
        pageIndex: users.page, // Set the starting page to 1 instead of 0
        pageSize: users.pageSize,
      },
    },
  })

  return (
    <div>
      <div className="flex items-center  py-4">
        <Input
          placeholder="Filter emails..."
          value={(table.getColumn("email")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("email")?.setFilterValue(event.target.value)}
          className="max-w-sm"
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Columns <ChevronDownIcon className="ml-2 size-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => (
                <DropdownMenuCheckboxItem
                  key={column.id}
                  className="capitalize"
                  checked={column.getIsVisible()}
                  onCheckedChange={(value) =>
                    column.toggleVisibility(!!value)}
                >
                  {column.id}
                </DropdownMenuCheckboxItem>
              ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder ?
                      null :
                      flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {table.getPageCount() > 1 && (
        <div className="flex items-center justify-end space-x-2 py-4">
          <div className="flex-1 text-sm text-muted-foreground">
            Page
            {" "}
            {table.getState().pagination.pageIndex + 1}
            {" "}
            of
            {" "}
            {table.getPageCount() ? table.getPageCount().toLocaleString() : "-"}
          </div>
          <div className="space-x-2">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()} />
                </PaginationItem>

                {(() => {
                  const currentPage = table.getState().pagination.pageIndex
                  const totalPages = table.getPageCount()
                  const visiblePages = []
                  const addPage = (index: number) => {
                    visiblePages.push(
                      <PaginationItem key={index}>
                        <PaginationLink
                          onClick={() => {
                            setPagination({
                              ...pagination,
                              pageIndex: index,
                            })
                          }}
                          isActive={currentPage === index}
                        >

                          {String(index + 1)}
                        </PaginationLink>
                      </PaginationItem>,
                    )
                  }

                  // Always show first page
                  addPage(0)

                  if (totalPages <= 7) {
                    // If total pages are 7 or less, show all pages
                    for (let i = 1; i < totalPages; i++) {
                      addPage(i)
                    }
                  } else {
                    let startPage = Math.max(1, currentPage - 1)
                    let endPage = Math.min(totalPages - 2, currentPage + 1)

                    // Adjust start and end page to always show 3 pages when possible
                    if (startPage === 1) {
                      endPage = Math.min(3, totalPages - 2)
                    } else if (endPage === totalPages - 2) {
                      startPage = Math.max(1, totalPages - 4)
                    }

                    // Show ellipsis at the start if needed
                    if (startPage > 1) {
                      visiblePages.push(
                        <PaginationEllipsis
                          key="ellipsis1"
                          onClick={() => setPagination({ ...pagination, pageIndex: Math.max(0, currentPage - PAGINATION_STEP) })}
                        />,
                      )
                    }

                    // Add visible pages
                    for (let i = startPage; i <= endPage; i++) {
                      addPage(i)
                    }

                    // Show ellipsis at the end if needed
                    if (endPage < totalPages - 2) {
                      visiblePages.push(
                        <PaginationEllipsis
                          key="ellipsis2"
                          onClick={() => setPagination({ ...pagination, pageIndex: Math.min(totalPages - 1, currentPage + PAGINATION_STEP) })}
                        />,
                      )
                    }

                    // Always show last page
                    addPage(totalPages - 1)
                  }

                  return visiblePages
                })()}

                <PaginationItem>
                  <PaginationNext onClick={() => table.nextPage()} disabled={!table.getCanNextPage()} />
                </PaginationItem>
                <PaginationItem>
                  <Select value={pagination.pageSize.toString()} onValueChange={(value) => setPagination({ ...pagination, pageSize: Number(value) })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a page size" />
                    </SelectTrigger>
                    <SelectContent>
                      {[10, 20, 30, 40, 50].map((pageSize) => (
                        <SelectItem key={pageSize} value={pageSize.toString()}>
                          {pageSize} / page
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        </div>
      )}
    </div>
  )
}
