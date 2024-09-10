import type {
  ColumnDef,
} from "@tanstack/react-table"
import {
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table"
import * as React from "react"
import Markdown from "react-markdown"
import rehypeRaw from "rehype-raw"
import remarkGfm from "remark-gfm"

import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { cn } from "@/lib/utils"

export type Dependency = {
  id: string
  name: string
  version: string
}

const columns: ColumnDef<Dependency>[] = [
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => (
      <div>{row.getValue("name")}</div>
    ),
  },
  {
    accessorKey: "version",
    header: "Version",
    cell: ({ row }) => <div>{row.getValue("version")}</div>,
  },
]

const getDependenciesData = (dependencies: Record<string, string>) => Object.entries(dependencies).map(([name, version]) => ({
  id: name + version,
  name,
  version,
}
))

export function Component() {
  return (
    <>
      <div className="prose max-w-none dark:prose-invert">
        <Markdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>{README}</Markdown>
        <div className="mb-8 rounded-lg">
          <p className="mb-2 text-lg"><strong>Version:</strong> {pkg.version}</p>
        </div>
        <h2>Build with</h2>
        <div className="not-prose flex w-full justify-between gap-x-3">
          <DependencyTable data={getDependenciesData(dependencies)} />
          <DependencyTable data={getDependenciesData(devDependencies)} />
        </div>
      </div>
    </>

  )
}

interface DependencyTableProps {
  data: Dependency[]
  className?: string
  style?: React.CSSProperties
}

function DependencyTable(props: DependencyTableProps) {
  const { data, className, style } = props

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  })

  return (
    <div className={cn("relative flex-1 rounded-md border", className)} style={style}>
      <div className="h-96 ">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
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
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>

        </Table>
      </div>
      <div className="mt-16 flex items-center justify-end space-x-2 p-2">
        <div className="flex-1 text-sm text-muted-foreground">
          total
          {" "}
          {table.getFilteredRowModel().rows.length}
          {" "}
          dependencies.
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  )
}
