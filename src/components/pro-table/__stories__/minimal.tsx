import { ProTable } from "../index"
import type { ColumnDef } from "../types"
import { basicColumns, basicData } from "./data"
import { TableWrapper } from "./wrapper"

export const minimalStory = {
  render: (args: any) => (
    <div className="space-y-4 p-4">
      <TableWrapper columns={basicColumns} data={basicData}>
        {(table) => (
          <ProTable.Root {...args}>
            <div className="rounded-md border">
              <ProTable.Table table={table} isLoading={false} />
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
