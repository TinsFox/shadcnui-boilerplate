import { zodResolver } from "@hookform/resolvers/zod"
import type { Table } from "@tanstack/react-table"
import { ChevronDown, ChevronUp } from "lucide-react"
import * as React from "react"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form"
import { Input } from "@/components/ui/input"

import type { ColumnDef, SearchConfig, SearchType } from "./types"

interface SearchToolbarProps<TData> {
  table: Table<TData>
  searchValues: Record<string, string>
  onSearchChange: (field: string, value: string) => void
  onSubmit: (value: Record<string, string>) => void
}

function getSearchPlaceholder(search: SearchType, columnName: string): string {
  if (typeof search === "object" && !React.isValidElement(search)) {
    return (search as SearchConfig).placeholder ?? `Search ${columnName}`
  }
  return `Search ${columnName}`
}

type SearchSchemaType = z.ZodObject<Record<string, z.ZodString>>

const createSearchSchema = (columns: string[]): SearchSchemaType => {
  const shape = columns.reduce<Record<string, z.ZodString>>((acc, column) => {
    acc[column] = z.string().optional().unwrap()
    return acc
  }, {})
  return z.object(shape)
}

export function SearchToolbar<TData>({
  table,
  searchValues,
  onSubmit,
}: SearchToolbarProps<TData>) {
  const [expanded, setExpanded] = React.useState(false)
  const [searchSchema] = React.useState(() =>
    createSearchSchema(
      table.getAllColumns()
        .filter((column) => (column.columnDef as ColumnDef<TData>).search)
        .map((col) => col.id),
    ),
  )

  const form = useForm<z.infer<typeof searchSchema>>({
    resolver: zodResolver(searchSchema),
    defaultValues: searchValues,
    values: Object.keys(searchSchema.shape).reduce((acc, key) => {
      acc[key] = searchValues[key] || ""
      return acc
    }, {} as Record<string, string>),
  })

  const searchableColumns = table.getAllColumns().filter((column) => {
    const columnDef = column.columnDef as ColumnDef<TData>
    return columnDef.search
  })

  const visibleColumns = expanded ?
    searchableColumns :
    searchableColumns.slice(0, 3)

  if (searchableColumns.length === 0) {
    return null
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="rounded-md border">
          <div className="p-3">

            <div className="mb-3 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {visibleColumns.map((column) => {
                const columnDef = column.columnDef as ColumnDef<TData>
                const columnName = String(columnDef.header || column.id)

                return (
                  <div
                    key={column.id}
                    className="flex items-center gap-1.5"
                  >
                    <span className="w-20 shrink-0 text-sm font-medium text-muted-foreground">
                      {columnName}
                    </span>
                    {React.isValidElement(columnDef.search) ? (
                      columnDef.search
                    ) : (
                      <FormField
                        control={form.control}
                        name={column.id}
                        render={({ field }) => (
                          <FormItem className="flex-1 space-y-0">
                            <FormControl>
                              <Input
                                {...field}
                                value={field.value || ""}
                                placeholder={getSearchPlaceholder(columnDef.search!, columnName)}
                                className="h-8"
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    )}
                  </div>
                )
              })}
            </div>

            <div className="flex items-center justify-end gap-2">
              {searchableColumns.length > 3 && (
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="px-2"
                  onClick={() => setExpanded(!expanded)}
                >
                  {expanded ? (
                    <ChevronUp className="size-4" />
                  ) : (
                    <ChevronDown className="size-4" />
                  )}
                  <span className="ml-1">{expanded ? "Less" : "More"}</span>
                </Button>
              )}
              <Button type="submit" size="sm" variant="secondary">
                Search
              </Button>
            </div>
          </div>
        </div>
      </form>
    </Form>
  )
}
