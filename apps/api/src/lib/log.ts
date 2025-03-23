interface ServerInfo {
	Description: string;
	URL: string;
}

export function formatTable(data: ServerInfo[]): void {
	const headers = Object.keys(data[0]) as (keyof ServerInfo)[];
	const rows = data.map((row) => headers.map((header) => row[header]));

	const columnWidths = headers.map((header, i) =>
		Math.max(header.length, ...rows.map((row) => row[i].length)),
	);

	const formatRow = (row: string[]): string =>
		row.map((cell, i) => cell.padEnd(columnWidths[i])).join(" | ");

	const separator = columnWidths.map((width) => "-".repeat(width)).join("-|-");

	console.log(formatRow(headers as unknown as string[]));
	console.log(separator);
	for (const row of rows) {
		console.log(formatRow(row));
	}
}
