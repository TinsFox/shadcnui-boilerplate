import type { useReactTable } from "@tanstack/react-table"
import * as React from "react"

import type { PaginationProps } from "@/components/pro-table/pagination"

export const ProTableContext = React.createContext<{
  table: ReturnType<typeof useReactTable<any>> | null
  isLoading?: boolean
  onRefresh?: () => void
  pagination?: PaginationProps
  data?: any[]
}>({
      table: null,
    })
