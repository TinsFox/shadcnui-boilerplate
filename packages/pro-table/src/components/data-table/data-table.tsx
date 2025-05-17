import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@poketto/ui/table";
import { flexRender } from "@tanstack/react-table";
import { useMemo } from "react";

import { Empty } from "../empty";
import { DataTableSkeleton } from "./data-table-skeleton";
import type { DataTableProps } from "./data-table-types";
import { getCommonPinningStyles } from "./data-table-util";

export function DataTable<TData>({
	isLoading,
	pagination,
	table,
}: DataTableProps<TData>) {
	const columns = useMemo(() => {
		return table?.getAllColumns();
	}, [table]);
	return (
		<div className="rounded-md border">
			<Table>
				<TableHeader>
					{table.getHeaderGroups().map((headerGroup) => (
						<TableRow key={headerGroup.id}>
							{headerGroup.headers.map((header) => (
								<TableHead
									key={header.id}
									colSpan={header.colSpan}
									style={{ ...getCommonPinningStyles(header.column) }}
								>
									{header.isPlaceholder
										? null
										: flexRender(
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
						<DataTableSkeleton pagination={pagination} />
					) : table.getRowModel().rows?.length ? (
						table.getRowModel().rows.map((row) => (
							<TableRow
								key={row.id}
								data-state={row.getIsSelected() && "selected"}
							>
								{row.getVisibleCells().map((cell) => (
									<TableCell
										key={cell.id}
										style={{ ...getCommonPinningStyles(cell.column) }}
									>
										{flexRender(cell.column.columnDef.cell, cell.getContext())}
									</TableCell>
								))}
							</TableRow>
						))
					) : (
						<TableRow>
							<TableCell colSpan={columns.length} className="h-24 text-center">
								<Empty />
							</TableCell>
						</TableRow>
					)}
				</TableBody>
			</Table>
		</div>
	);
}
