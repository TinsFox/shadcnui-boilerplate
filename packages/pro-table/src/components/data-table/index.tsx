export const DEFAULT_PAGINATION_STEP = 3;
export const DEFAULT_PAGE_INDEX = 0;
export const DEFAULT_PAGE_SIZE = 10;

// export const DataTable = {
//   Search: DataTableSearch,
//   Toolbar: DataTableToolbar,
//   Table: DataTablePrimitive,
//   Pagination: DataTablePagination,
//   ViewOptions: DataTableViewOptions,
//   Skeleton: DataTableSkeleton,
// }

export * from "./data-table";
export * from "./data-table-column-cell";
export * from "./data-table-column-header";
export * from "./data-table-faceted-filter";
export * from "./data-table-pagination";
export * from "./data-table-search";
export * from "./data-table-skeleton";
export * from "./data-table-toolbar";
export type {
	ColumnDef,
	DataTableProps as ProTableProps,
	SearchConfig,
	SearchParams,
	SearchType,
} from "./data-table-types";
export * from "./data-table-view-options";
