import type { PaginationProps } from "@/components/pro-table/pagination"

interface ProTableSkeletonProps {
  pagination?: PaginationProps
}

/**
 * TODO: 优化 loading 效果, 根据 columns 长度动态生成 loading 效果
 * @param pagination - 分页信息
 * @returns
 */
export function ProTableSkeleton({ pagination }: ProTableSkeletonProps) {
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
