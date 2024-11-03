import { DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu"
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  MixerHorizontalIcon,
} from "@radix-ui/react-icons"
import type {
  ColumnDef,
  ColumnFiltersState,
  PaginationState,
  SortingState,
  Table as TableType,
  VisibilityState,
} from "@tanstack/react-table"
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
import { RefreshCcw } from "lucide-react"
import * as React from "react"

import { Empty } from "@/components/empty"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
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
import { cn } from "@/lib/utils"

const DEFAULT_PAGINATION_STEP = 3
const DEFAULT_PAGE_INDEX = 0
const DEFAULT_PAGE_SIZE = 10

export const ProTableContext = React.createContext<{
  table: ReturnType<typeof useReactTable<any>> | null
  isLoading?: boolean
  onRefresh?: () => void
  pagination?: PaginationProps
  data?: any[]
}>({
      table: null,
    })

interface DataTableToolbarProps<TData> {
  table: ReturnType<typeof useReactTable<TData>>
  onRefresh?: () => void
  isLoading?: boolean
  toolbar?: React.ReactNode
}

interface DataTableViewOptionsProps<TData> {
  table: TableType<TData>
}
export function DataTableViewOptions<TData>({
  table,
}: DataTableViewOptionsProps<TData>) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="ml-auto h-8 lg:flex"
        >
          <MixerHorizontalIcon className="mr-2 size-4" />
          View
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[150px]">
        <DropdownMenuLabel>Toggle columns</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {table
          .getAllColumns()
          .filter(
            (column) =>
              column.accessorFn !== undefined && column.getCanHide(),
          )
          .map((column) => (
            <DropdownMenuCheckboxItem
              key={column.id}
              className="capitalize"
              checked={column.getIsVisible()}
              onCheckedChange={(value) => column.toggleVisibility(!!value)}
            >
              {column.id}
            </DropdownMenuCheckboxItem>
          ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
export function ProTableToolbar<TData>({
  table,
  onRefresh,
  isLoading,
  toolbar,
}: DataTableToolbarProps<TData>) {
  const handleRefresh = async () => {
    if (!onRefresh || isLoading) return
    onRefresh()
  }

  return (
    <div className="flex items-center justify-between py-4">
      <div className="flex flex-1 items-center space-x-2">
        {toolbar}
      </div>
      <div className="flex items-center space-x-2">

        <DataTableViewOptions table={table} />

        <Button
          variant="outline"
          size="sm"
          onClick={handleRefresh}
          disabled={isLoading}
          className="size-8 p-0"
        >
          <RefreshCcw className={cn(
            "size-4",
            isLoading && "animate-spin",
          )}
          />
        </Button>
      </div>
    </div>
  )
}

interface ProTablePaginationProps<TData> {
  table: ReturnType<typeof useReactTable<TData>>
  pagination?: PaginationProps
}

function ProTablePagination<TData>({ table, pagination }: ProTablePaginationProps<TData>) {
  const [paginationState, setPaginationState] = React.useState<PaginationState>({
    pageIndex: pagination?.pageIndex ?? DEFAULT_PAGE_INDEX,
    pageSize: pagination?.pageSize ?? DEFAULT_PAGE_SIZE,
  })

  const handlePageSizeChange = (_pageSize: string) => {
    const newPaginationState = { ...paginationState, pageSize: Number(_pageSize) }
    setPaginationState(newPaginationState)
    pagination?.onPaginationChange?.(newPaginationState)
  }
  const handlePageIndexChange = (_pageIndex: number) => {
    const newPaginationState = { ...paginationState, pageIndex: _pageIndex }
    setPaginationState(newPaginationState)
    pagination?.onPaginationChange?.(newPaginationState)
  }
  const handlePreviousPage = () => {
    table.previousPage()
    const newPaginationState = { ...paginationState, pageIndex: paginationState.pageIndex - 1 }
    setPaginationState(newPaginationState)
    pagination?.onPaginationChange?.(newPaginationState)
  }
  const handleNextPage = () => {
    table.nextPage()
    const newPaginationState = { ...paginationState, pageIndex: paginationState.pageIndex + 1 }
    setPaginationState(newPaginationState)
    pagination?.onPaginationChange?.(newPaginationState)
  }
  return (
    <div className="flex items-center justify-between px-2">
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
                  <Button
                    variant="outline"
                    className="size-9 p-0"
                    onClick={handlePreviousPage}
                    disabled={!table.getCanPreviousPage()}
                  >
                    <span className="sr-only">Go to previous page</span>
                    <ChevronLeftIcon className="size-4" />
                  </Button>
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
                            handlePageIndexChange(index)
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
                          onClick={() => handlePageIndexChange(Math.max(0, currentPage - DEFAULT_PAGINATION_STEP))}
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
                          onClick={() => {
                            handlePageIndexChange(Math.min(totalPages - 1, currentPage + DEFAULT_PAGINATION_STEP))
                          }}
                        />,
                      )
                    }

                    // Always show last page
                    addPage(totalPages - 1)
                  }

                  return visiblePages
                })()}

                <PaginationItem>
                  <Button
                    variant="outline"
                    className="size-9 p-0"
                    onClick={handleNextPage}
                    disabled={!table.getCanNextPage()}
                  >
                    <span className="sr-only">Go to next page</span>
                    <ChevronRightIcon className="size-4" />
                  </Button>
                </PaginationItem>
                <PaginationItem>
                  <Select
                    value={pagination?.pageSize?.toString() ?? DEFAULT_PAGE_SIZE.toString()}
                    onValueChange={(value) => {
                      handlePageSizeChange(value)
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a page size" />
                    </SelectTrigger>
                    <SelectContent>
                      {[10, 20, 30, 40, 50].map((pageSize) => (
                        <SelectItem
                          key={pageSize}
                          value={pageSize.toString()}
                        >
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
interface PaginationProps {
  pageIndex: number
  pageSize: number
  onPaginationChange: (pagination: PaginationState) => void
  total: number
}
interface ProTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  isLoading: boolean
  toolbar?: React.ReactNode
  pagination?: PaginationProps
  onRefresh?: () => void
  onDensityChange?: (density: "default" | "compact" | "comfortable") => void
  onColumnSettingChange?: (columnVisibility: VisibilityState) => void
}

export function ProTable<TData, TValue>({
  columns,
  data,
  isLoading,
  toolbar,
  pagination,
  onRefresh,
}: ProTableProps<TData, TValue>) {
  // 使用 context 传递 table 实例
  const [rowSelection, setRowSelection] = React.useState({})
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({})
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    [],
  )
  const [sorting, setSorting] = React.useState<SortingState>([])

  const table = useReactTable({
    data,
    columns,
    rowCount: pagination?.total ?? 0,
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

  return (
    <div className="space-y-4">
      {/* 工具栏 */}
      <ProTableToolbar
        table={table}
        onRefresh={onRefresh}
        isLoading={isLoading}
        toolbar={toolbar}
      />
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
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  <ProTableLoading />
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
                          <TableCell key={cell.id}>
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

interface ProTableLoadingProps {
  pagination?: PaginationProps
}

/**
 * TODO: 优化 loading 效果, 根据 columns 长度动态生成 loading 效果
 * @param pagination - 分页信息
 * @returns
 */
function ProTableLoading({ pagination }: ProTableLoadingProps) {
  return (
    <div className="w-full animate-pulse">
      {Array.from({ length: pagination?.pageSize ?? 10 }).map((_, index) => (
        <div
          // eslint-disable-next-line @eslint-react/no-array-index-key
          key={index}
          className="flex h-14 items-center px-4 py-3"
        >
          <div className="h-4 w-[10%] rounded-md bg-muted" />
          <div className="mx-4 h-4 w-[30%] rounded-md bg-muted" />
          <div className="mx-4 h-4 w-2/5 rounded-md bg-muted" />
          <div className="h-4 w-1/5 rounded-md bg-muted" />
        </div>
      ))}
    </div>
  )
}
