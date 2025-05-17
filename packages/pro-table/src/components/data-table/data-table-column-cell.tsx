import { cn } from "@poketto/ui/utils";
import type { Column, Row } from "@tanstack/react-table";

export interface DataTableColumnCellProps<TData, TValue>
	extends React.HTMLAttributes<HTMLDivElement> {
	column: Column<TData, TValue>;
	row: Row<TData>;
	render?: ({
		value,
		record,
		index,
	}: {
		value: TValue;
		record: TData;
		index: number;
	}) => React.ReactNode;
}

export function DataTableColumnCell<TData, TValue>({
	column,
	row,
	className,
	render,
}: DataTableColumnCellProps<TData, TValue>) {
	const value = row.getValue<TValue>(column.id);

	if (render) {
		return (
			<div className={cn(className)}>
				{render({ value, record: row.original, index: row.index })}
			</div>
		);
	}

	if (value == null) {
		return <div className={cn(className)}>-</div>;
	}

	return <div className={cn(className)}>{String(value)}</div>;
}
