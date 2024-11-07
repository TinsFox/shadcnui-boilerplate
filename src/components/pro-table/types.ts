import type {
  ColumnDef as TanstackColumnDef,
} from "@tanstack/react-table"
import type { ReactElement } from "react"

export interface SearchConfig {
  placeholder?: string
}

export type SearchType = boolean | SearchConfig | ReactElement

export type ColumnDef<TData, TValue = unknown> = TanstackColumnDef<TData, TValue> & {
  search?: SearchType
}

export type SearchParams = Record<string, string>
