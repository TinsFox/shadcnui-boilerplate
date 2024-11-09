import { DataTable as DataTablePrimitive } from "./data-table"
import { DataTablePagination } from "./data-table-pagination"
import { DataTableSearchToolbar } from "./data-table-search-toolbar"
import { DataTableSkeleton } from "./data-table-skeleton"
import { DataTableToolbar } from "./data-table-toolbar"
import { DataTableViewOptions } from "./data-table-view-options"

export const DEFAULT_PAGINATION_STEP = 3
export const DEFAULT_PAGE_INDEX = 0
export const DEFAULT_PAGE_SIZE = 10

export const DataTable = {
  Search: DataTableSearchToolbar,
  Toolbar: DataTableToolbar,
  Table: DataTablePrimitive,
  Pagination: DataTablePagination,
  ViewOptions: DataTableViewOptions,
  Skeleton: DataTableSkeleton,
}

export type {
  ColumnDef,
  DataTableProps as ProTableProps,
  SearchConfig,
  SearchParams,
  SearchType,
} from "./data-table-types"
