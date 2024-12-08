import type { ColumnFiltersState, SortingState, VisibilityState } from "@tanstack/react-table"
import {
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"
import * as React from "react"

import { DataTable } from "../data-table/data-table"
import { DataTablePagination } from "../data-table/data-table-pagination"
import { DataTableSearch } from "../data-table/data-table-search"
import { DataTableToolbar } from "../data-table/data-table-toolbar"
import type { ProTableProps, SearchParams } from "./types"

// Constants
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
  enableSearch = true,
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
    onRefresh?.()
  }

  return (
    <div className="space-y-4">
      {enableSearch && (
        <DataTableSearch
          table={table}
          searchValues={searchValues}
          onSearchChange={handleSearchChange}
          onSubmit={handleSearch}
        />
      )}

      <DataTableToolbar
        table={table}
        onRefresh={onRefresh}
        isLoading={isLoading}
        toolbar={toolbar}
      />

      <div className="rounded-md border">
        <DataTable table={table} isLoading={isLoading} pagination={pagination} />
        <DataTablePagination
          table={table}
          pagination={{
            ...pagination,
            quickJump: true,
          }}
        />
      </div>
    </div>
  )
}
export * from "./types"
