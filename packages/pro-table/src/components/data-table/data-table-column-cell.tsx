import { cn } from "@repo/ui/utils";
import type { Column, Row } from "@tanstack/react-table";

export interface DataTableColumnCellProps<TData, TValue>
	extends React.HTMLAttributes<HTMLDivElement> {
	column: Column<TData, TValue>;
	row: Row<TData>;
	render?: (value: TValue) => React.ReactNode;
}

export function DataTableColumnCell<TData, TValue>({
	column,
	row,
	className,
	render,
}: DataTableColumnCellProps<TData, TValue>) {
	if (render) {
		return (
			<div className={cn(className)}>{render(row.getValue(column.id))}</div>
		);
	}
	return <div className={cn(className)}>{row.getValue(column.id)}</div>;
}
