import type { Table as TableType } from "@tanstack/react-table"
import { flexRender } from "@tanstack/react-table"

import { Empty } from "@/components/empty"
import { ProTableSkeleton } from "@/components/pro-table/skeleton"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

import { getCommonPinningStyles } from "./util"

interface ProTableMainProps<TData> {
  table: TableType<TData>
  isLoading: boolean
}

export function ProTableMain<TData>({ table, isLoading }: ProTableMainProps<TData>) {
  const columns = table.getAllColumns()
  return (
    <Table style={{
      width: table.getTotalSize(),
    }}
    >
      <TableHeader>
        {table.getHeaderGroups().map((headerGroup) => (
          <TableRow key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <TableHead
                key={header.id}
                colSpan={header.colSpan}
                style={{ ...getCommonPinningStyles(header.column) }}
              >
                {header.isPlaceholder ?
                  null :
                  flexRender(
                    header.column.columnDef.header,
                    header.getContext(),
                  )}
              </TableHead>
            ))}
          </TableRow>
        ))}
      </TableHeader>
      <TableBody>
        {isLoading ? (
          <TableRow>
            <TableCell className="h-24 text-center">
              <ProTableSkeleton />
            </TableCell>
          </TableRow>
        ) : (
          table.getRowModel().rows?.length ?
              (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id} style={{ ...getCommonPinningStyles(cell.column) }}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext(),
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) :
              (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    <Empty />
                  </TableCell>
                </TableRow>
              )
        )}
      </TableBody>
    </Table>
  )
}
