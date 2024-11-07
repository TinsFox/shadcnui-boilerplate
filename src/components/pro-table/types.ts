import type {
  ColumnDef as TanstackColumnDef,
  TableOptions,
  VisibilityState,
} from "@tanstack/react-table"

import type { PaginationProps } from "./pagination"

export interface SearchConfig {
  placeholder?: string
  render?: (props: {
    value: string
    onChange: (value: string) => void
    placeholder?: string
  }) => React.ReactNode
}
export type SearchType = boolean | SearchConfig

export type ColumnDef<TData, TValue = unknown> = TanstackColumnDef<TData, TValue> & {
  /**
   * enable column search
   * @default false
   */
  search?: SearchType
  /**
   * column width
   * @default auto
   */
  width?: number
}

export type SearchParams = Record<string, string>

export interface ProTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  isLoading: boolean
  toolbar?: React.ReactNode
  pagination?: PaginationProps
  initialState?: TableOptions<TData>["initialState"]
  onRefresh?: () => void
  onSearch?: (params: SearchParams) => void
  onDensityChange?: (density: "default" | "compact" | "comfortable") => void
  onColumnSettingChange?: (columnVisibility: VisibilityState) => void
}
