import {
	DataTableColumnCell,
	DataTableColumnHeader,
	DataTablePagination,
	DataTableSearch,
} from "@poketto/pro-table/data-table";
import { Avatar, AvatarFallback, AvatarImage } from "@poketto/ui/avatar";
import { Button } from "@poketto/ui/button";
import { Checkbox } from "@poketto/ui/checkbox";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuTrigger,
} from "@poketto/ui/dropdown-menu";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@poketto/ui/table";
import { CaretSortIcon, DotsHorizontalIcon } from "@radix-ui/react-icons";
import type {
	ColumnDef,
	ColumnFiltersState,
	PaginationState,
	SortingState,
	VisibilityState,
} from "@tanstack/react-table";
import {
	flexRender,
	getCoreRowModel,
	getFilteredRowModel,
	getPaginationRowModel,
	getSortedRowModel,
	useReactTable,
} from "@tanstack/react-table";
import * as React from "react";

import { Empty } from "@/components/empty";
import { Loading } from "@/components/loading";
import { useUsers } from "@/hooks/query/use-user";

import { CopyButton } from "@poketto/ui/copy-button";

import type { UserWithRole } from "better-auth/plugins/admin";

import { ViewUser } from "./components/view-user";

const columns: ColumnDef<UserWithRole>[] = [
	{
		id: "select",
		header: ({ table }) => (
			<Checkbox
				checked={
					table.getIsAllPageRowsSelected() ||
					(table.getIsSomePageRowsSelected() && "indeterminate")
				}
				onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
				aria-label="Select all"
			/>
		),
		cell: ({ row }) => (
			<Checkbox
				checked={row.getIsSelected()}
				onCheckedChange={(value) => row.toggleSelected(!!value)}
				aria-label="Select row"
			/>
		),
		enableSorting: false,
		enableHiding: false,
	},
	{
		accessorKey: "id",
		header: ({ column }) => (
			<DataTableColumnHeader
				title="ID"
				column={column}
				className="line-clamp-1"
			/>
		),
		cell: ({ row, column }) => (
			<DataTableColumnCell
				className="lowercase line-clamp-1"
				row={row}
				column={column}
				render={({ record }) => (
					<div className="flex items-center space-x-2 group">
						<span>{record.id}</span>
						<CopyButton
							className="invisible group-hover:visible"
							aria-label="Copy ID"
							value={record.id}
						/>
					</div>
				)}
			/>
		),
	},
	{
		accessorKey: "name",
		header: "Name",
		cell: ({ row }) => <div className="lowercase">{row.getValue("name")}</div>,
	},
	{
		accessorKey: "role",
		header: "Role",
		cell: ({ row }) => <div className="lowercase">{row.getValue("role")}</div>,
	},
	{
		accessorKey: "avatar",
		header: "Avatar",
		cell: ({ row }) => (
			<div className="lowercase">
				<Avatar>
					<AvatarImage src={row.getValue("avatar")} />
					<AvatarFallback>{row.original.name.charAt(0)}</AvatarFallback>
				</Avatar>
			</div>
		),
	},
	{
		accessorKey: "createdAt",
		header: "Created At",
		cell: ({ row }) => (
			<div className="lowercase">
				{new Date(row.getValue("createdAt")).toLocaleDateString()}
			</div>
		),
	},
	{
		accessorKey: "email",
		header: ({ column }) => (
			<Button
				variant="ghost"
				onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
			>
				Email
				<CaretSortIcon className="ml-2 size-4" />
			</Button>
		),
		cell: ({ row }) => <div className="lowercase">{row.getValue("email")}</div>,
	},
	{
		id: "actions",
		enableHiding: false,
		header: "Action",
		cell: ({ row }) => {
			return (
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button variant="ghost" className="size-8 p-0">
							<span className="sr-only">Open menu</span>
							<DotsHorizontalIcon className="size-4" />
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent align="end">
						<DropdownMenuLabel>Actions</DropdownMenuLabel>
						<ViewUser user={row.original} />
					</DropdownMenuContent>
				</DropdownMenu>
			);
		},
	},
];

export default function Component() {
	const [sorting, setSorting] = React.useState<SortingState>([]);
	const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
		[],
	);
	const [pagination, setPagination] = React.useState<PaginationState>({
		pageIndex: 0,
		pageSize: 10,
	});
	const [columnVisibility, setColumnVisibility] =
		React.useState<VisibilityState>({});
	const [rowSelection, setRowSelection] = React.useState({});
	const { data: users, isPending } = useUsers(pagination);

	const table = useReactTable({
		data: users.list,
		columns,
		rowCount: users.total,
		manualPagination: true,
		state: {
			sorting,
			columnFilters,
			columnVisibility,
			rowSelection,
			pagination,
		},
		onSortingChange: setSorting,
		onColumnFiltersChange: setColumnFilters,
		getCoreRowModel: getCoreRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		getSortedRowModel: getSortedRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
		onColumnVisibilityChange: setColumnVisibility,
		onRowSelectionChange: setRowSelection,
		onPaginationChange: setPagination,
	});

	return (
		<div>
			<DataTableSearch table={table} />
			<div className="rounded-md border">
				<Table>
					<TableHeader>
						{table.getHeaderGroups().map((headerGroup) => (
							<TableRow key={headerGroup.id}>
								{headerGroup.headers.map((header) => (
									<TableHead key={header.id}>
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
						{table.getRowModel().rows?.length ? (
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
						) : (
							<TableRow>
								<TableCell
									colSpan={columns.length}
									className="h-24 text-center"
								>
									{isPending ? <Loading /> : <Empty />}
								</TableCell>
							</TableRow>
						)}
					</TableBody>
				</Table>
			</div>
			<DataTablePagination
				table={table}
				pagination={{
					pageIndex: pagination.pageIndex,
					pageSize: pagination.pageSize,
					onPaginationChange: (pagination) => {
						setPagination(pagination);
					},
					quickJump: true,
				}}
			/>
		</div>
	);
}
