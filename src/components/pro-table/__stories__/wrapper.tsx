import type { Table } from "@tanstack/react-table"
import { getCoreRowModel, useReactTable } from "@tanstack/react-table"
import * as React from "react"

import type { ColumnDef } from "../types"
import type { Person } from "./data"

interface TableWrapperProps {
  children: (table: Table<Person>) => React.ReactNode
  columns: ColumnDef<Person>[]
  data: Person[]
}

export function TableWrapper({ children, columns, data }: TableWrapperProps) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  return <>{children(table)}</>
}
