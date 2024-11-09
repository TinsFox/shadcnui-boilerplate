import { TableCell, TableRow } from "@/components/ui/table"

import type { PaginationProps } from "./data-table-pagination"

interface ProTableSkeletonProps {
  pagination?: PaginationProps
  columns?: number
}

/**
 * 表格骨架屏
 * @param pagination - 分页信息
 * @param columns - 列数，默认为4
 * @returns
 */
export function DataTableSkeleton({
  pagination,
  columns = 10,
}: ProTableSkeletonProps) {
  return (
    <>
      {Array.from({ length: pagination?.pageSize ?? 10 }).map((_, rowIndex) => (
        // eslint-disable-next-line @eslint-react/no-array-index-key
        <TableRow key={`skeleton-row-${rowIndex}`}>
          {Array.from({ length: columns }).map((_, colIndex) => (
            // eslint-disable-next-line @eslint-react/no-array-index-key
            <TableCell key={`skeleton-cell-${rowIndex}-${colIndex}`}>
              <div className="h-4 w-full animate-pulse rounded-md bg-muted" />
            </TableCell>
          ))}
        </TableRow>
      ))}
    </>
  )
}
