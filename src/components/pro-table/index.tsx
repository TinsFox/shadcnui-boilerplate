import type { ColumnFiltersState, SortingState, VisibilityState } from "@tanstack/react-table"
import {
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"
import * as React from "react"

import { Empty } from "@/components/empty"
import { ProTablePagination } from "@/components/pro-table/pagination"
import { ProTableSkeleton } from "@/components/pro-table/skeleton"
import { ProTableToolbar } from "@/components/pro-table/toolbar"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

import { SearchToolbar } from "./search-toolbar"
import type { ProTableProps, SearchParams } from "./types"
import { getCommonPinningStyles } from "./util"

export const DEFAULT_PAGINATION_STEP = 3
export const DEFAULT_PAGE_INDEX = 0
export const DEFAULT_PAGE_SIZE = 10

export function ProTable<TData, TValue>({
  columns,
  data,
  isLoading,
  toolbar,
  pagination,
  onRefresh,
  onSearch,
  initialState,
}: ProTableProps<TData, TValue>) {
  const [rowSelection, setRowSelection] = React.useState({})
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({})
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    [],
  )
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [searchValues, setSearchValues] = React.useState<Record<string, string>>({})

  const columnPinningColumns = React.useMemo(() => {
    const leftColumns = columns.filter((column) => column.pinned === "left").map((column) => column.id).filter((id): id is string => id !== undefined) || []
    const rightColumns = columns.filter((column) => column.pinned === "right").map((column) => column.id).filter((id): id is string => id !== undefined) || []
    return {
      left: leftColumns,
      right: rightColumns,
    }
  }, [columns])

  const table = useReactTable({
    data,
    columns,
    rowCount: pagination?.total ?? 0,
    initialState: {
      ...initialState,
      columnPinning: columnPinningColumns,
    },
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
      pagination: {
        pageIndex: pagination?.pageIndex ?? DEFAULT_PAGE_INDEX,
        pageSize: pagination?.pageSize ?? DEFAULT_PAGE_SIZE,
      },
    },
    enableRowSelection: true,
    manualPagination: true,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
  })

  const handleSearchChange = (field: string, value: string) => {
    setSearchValues((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleSearch = (value: SearchParams) => {
    const filteredValue = Object.fromEntries(
      Object.entries(value).filter(([, value]) => value !== ""),
    )
    onSearch?.(filteredValue)
  }

  return (
    <div className="space-y-4">
      <SearchToolbar
        table={table}
        searchValues={searchValues}
        onSearchChange={handleSearchChange}
        onSubmit={handleSearch}
      />

      <ProTableToolbar
        table={table}
        onRefresh={onRefresh}
        isLoading={isLoading}
        toolbar={toolbar}
      />

      <div className="rounded-md border">
        <Table style={{
          width: table.getTotalSize(),
        }}
        >
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    colSpan={header.colSpan}
                    style={{ ...getCommonPinningStyles(header.column) }}
                  >
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
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  <ProTableSkeleton />
                </TableCell>
              </TableRow>
            ) : (
              table.getRowModel().rows?.length ?
                  (
                    table.getRowModel().rows.map((row) => (
                      <TableRow
                        key={row.id}
                        data-state={row.getIsSelected() && "selected"}
                      >
                        {row.getVisibleCells().map((cell) => (
                          <TableCell key={cell.id} style={{ ...getCommonPinningStyles(cell.column) }}>
                            {flexRender(
                              cell.column.columnDef.cell,
                              cell.getContext(),
                            )}
                          </TableCell>
                        ))}
                      </TableRow>
                    ))
                  ) :
                  (
                    <TableRow>
                      <TableCell
                        colSpan={columns.length}
                        className="h-24 text-center"
                      >
                        <Empty />
                      </TableCell>
                    </TableRow>
                  )
            )}
          </TableBody>
        </Table>
        <ProTablePagination
          table={table}
          pagination={pagination}
        />
      </div>
    </div>
  )
}
