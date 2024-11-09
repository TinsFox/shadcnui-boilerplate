import { Button } from "@/components/ui/button"

import { ProTable } from "../index"
import type { ColumnDef } from "../types"
import { basicColumns, basicData } from "./data"
import { TableWrapper } from "./wrapper"

export const customLayoutStory = {
  render: (args: any) => (
    <div className="space-y-4 p-4">
      <TableWrapper columns={basicColumns} data={basicData}>
        {(table) => (
          <ProTable.Root {...args}>
            <div className="flex items-center justify-between">
              <ProTable.Search
                table={table}
                searchValues={{}}
                onSearchChange={() => {}}
                onSubmit={() => {}}
              />
              <ProTable.ViewOptions table={table} />
            </div>
            <div className="rounded-md border">
              <ProTable.Table table={table} isLoading={false} />
            </div>
            <div className="flex items-center justify-between">
              <Button variant="outline" size="sm">
                Export Selected
              </Button>
              <ProTable.Pagination
                table={table}
                pagination={{
                  pageIndex: 0,
                  pageSize: 10,
                  total: basicData.length,
                  onPaginationChange: () => {},
                }}
              />
            </div>
          </ProTable.Root>
        )}
      </TableWrapper>
    </div>
  ),
  args: {
    columns: basicColumns as ColumnDef<unknown>[],
    data: basicData,
    isLoading: false,
  },
}
