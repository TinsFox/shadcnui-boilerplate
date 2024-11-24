import { ChevronLeftIcon, ChevronRightIcon } from "@radix-ui/react-icons"
import { Button } from "@repo/ui/button"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
} from "@repo/ui/pagination"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@repo/ui/select"
import type { PaginationState, Table } from "@tanstack/react-table"
import * as React from "react"

import { DEFAULT_PAGE_INDEX, DEFAULT_PAGE_SIZE, DEFAULT_PAGINATION_STEP } from "./data-table-util"

export interface PaginationProps {
  pageIndex?: number
  pageSize?: number
  onPaginationChange?: (pagination: PaginationState) => void
  total?: number
  quickJump?: boolean
}
interface DataTablePaginationProps<TData> {
  table: Table<TData>
  pagination?: PaginationProps
}

export function DataTablePagination<TData>({ table, pagination }: DataTablePaginationProps<TData>) {
  const [paginationState, setPaginationState] = React.useState<PaginationState>({
    pageIndex: pagination?.pageIndex ?? DEFAULT_PAGE_INDEX,
    pageSize: pagination?.pageSize ?? DEFAULT_PAGE_SIZE,
  })

  // when change page size, reset page index to 0
  const handlePageSizeChange = (_pageSize: string) => {
    const newPaginationState = { pageIndex: 0, pageSize: Number(_pageSize) }
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
    <div className="flex w-full items-center justify-between px-4">
      {table.getPageCount() > 1 && (
        <div className="flex w-full items-center justify-end space-x-2 py-4">
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

                {pagination?.quickJump && (
                  <>
                    {(() => {
                      const currentPage = table.getState().pagination.pageIndex
                      const totalPages = table.getPageCount()
                      const visiblePages = []
                      const addPage = (index: number) => {
                        visiblePages.push(
                          <PaginationItem key={index}>
                            <PaginationLink
                              size="sm"
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
                              className="cursor-pointer"
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
                              className="cursor-pointer"
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
                  </>
                )}

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
