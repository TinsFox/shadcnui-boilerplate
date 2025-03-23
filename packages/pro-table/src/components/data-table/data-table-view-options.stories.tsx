import type { Meta, StoryObj } from "@storybook/react";
import type { VisibilityState } from "@tanstack/react-table";
import { getCoreRowModel, useReactTable } from "@tanstack/react-table";
import * as React from "react";

import { DataTableViewOptions } from "./data-table-view-options";

// 创建一个包装组件来使用 Hook
function ViewOptionsWrapper() {
	const [columnVisibility, setColumnVisibility] =
		React.useState<VisibilityState>({});

	// 模拟数据
	const data = React.useMemo(
		() => [
			{
				id: 1,
				name: "John Doe",
				email: "john@example.com",
				role: "Admin",
				status: "Active",
			},
			{
				id: 2,
				name: "Jane Smith",
				email: "jane@example.com",
				role: "User",
				status: "Inactive",
			},
		],
		[],
	);

	// 模拟列配置
	const columns = React.useMemo(
		() => [
			{ accessorKey: "id", header: "ID" },
			{ accessorKey: "name", header: "Name" },
			{ accessorKey: "email", header: "Email" },
			{ accessorKey: "role", header: "Role" },
			{ accessorKey: "status", header: "Status" },
		],
		[],
	);

	const table = useReactTable({
		data,
		columns,
		getCoreRowModel: getCoreRowModel(),
		state: {
			columnVisibility,
		},
		onColumnVisibilityChange: setColumnVisibility,
	});

	return (
		<div className="space-y-4">
			<DataTableViewOptions table={table} />
			<div className="rounded-md border">
				<table className="w-full">
					<thead>
						<tr className="border-b bg-muted/50">
							{table
								.getHeaderGroups()
								.at(0)
								?.headers.map((header) => (
									<th
										key={header.id}
										className="h-10 px-4 text-left align-middle font-medium"
									>
										{header.column.columnDef.header?.toString()}
									</th>
								))}
						</tr>
					</thead>
					<tbody>
						{table.getRowModel().rows.map((row) => (
							<tr key={row.id} className="border-b">
								{row.getVisibleCells().map((cell) => (
									<td key={cell.id} className="p-4">
										{cell.getValue() as React.ReactNode}
									</td>
								))}
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
}

// 创建一个带有隐藏列的包装组件
function ViewOptionsWrapperWithHidden() {
	const [columnVisibility, setColumnVisibility] =
		React.useState<VisibilityState>({
			email: false,
			role: false,
		});

	// 模拟数据
	const data = React.useMemo(
		() => [
			{
				id: 1,
				name: "John Doe",
				email: "john@example.com",
				role: "Admin",
				status: "Active",
			},
			{
				id: 2,
				name: "Jane Smith",
				email: "jane@example.com",
				role: "User",
				status: "Inactive",
			},
		],
		[],
	);

	const columns = React.useMemo(
		() => [
			{ accessorKey: "id", header: "ID" },
			{ accessorKey: "name", header: "Name" },
			{ accessorKey: "email", header: "Email" },
			{ accessorKey: "role", header: "Role" },
			{ accessorKey: "status", header: "Status" },
		],
		[],
	);

	const table = useReactTable({
		data,
		columns,
		getCoreRowModel: getCoreRowModel(),
		state: {
			columnVisibility,
		},
		onColumnVisibilityChange: setColumnVisibility,
	});

	return (
		<div className="space-y-4">
			<DataTableViewOptions table={table} />
			<div className="rounded-md border">
				<table className="w-full">
					<thead>
						<tr className="border-b bg-muted/50">
							{table
								.getHeaderGroups()
								.at(0)
								?.headers.map((header) => (
									<th
										key={header.id}
										className="h-10 px-4 text-left align-middle font-medium"
									>
										{header.column.columnDef.header?.toString()}
									</th>
								))}
						</tr>
					</thead>
					<tbody>
						{table.getRowModel().rows.map((row) => (
							<tr key={row.id} className="border-b">
								{row.getVisibleCells().map((cell) => (
									<td key={cell.id} className="p-4">
										{cell.getValue() as React.ReactNode}
									</td>
								))}
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
}

const meta = {
	title: "Components/ProTable/ViewOptions",
	component: ViewOptionsWrapper,
	parameters: {
		layout: "centered",
	},
	tags: ["autodocs"],
} satisfies Meta<typeof ViewOptionsWrapper>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithHiddenColumns: Story = {
	render: () => <ViewOptionsWrapperWithHidden />,
};
