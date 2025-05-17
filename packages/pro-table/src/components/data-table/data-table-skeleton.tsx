import { TableCell, TableRow } from "@poketto/ui/table";

import type { PaginationProps } from "./data-table-pagination";

interface ProTableSkeletonProps {
	pagination?: PaginationProps;
	columns?: number;
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
				<TableRow
					key={`skeleton-row-${
						// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
						rowIndex
					}`}
				>
					{Array.from({ length: columns }).map((_, colIndex) => (
						<TableCell
							key={`skeleton-cell-${rowIndex}-${
								// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
								colIndex
							}`}
						>
							<div className="h-4 w-full animate-pulse rounded-md bg-muted" />
						</TableCell>
					))}
				</TableRow>
			))}
		</>
	);
}
