import type { Table } from "@tanstack/react-table"
import * as React from "react"

import type { PaginationProps } from "./pagination"

interface ProTableContextValue<TData> {
  table: Table<TData> | null
  isLoading?: boolean
  onRefresh?: () => void
  pagination?: PaginationProps
  data?: TData[]
}

export const ProTableContext = React.createContext<ProTableContextValue<any>>({
  table: null,
})

export function useProTable<TData>() {
  return React.useContext(ProTableContext) as ProTableContextValue<TData>
}
