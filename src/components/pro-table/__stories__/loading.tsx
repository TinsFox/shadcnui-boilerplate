import { ProTable } from "../index"
import type { ColumnDef } from "../types"
import { basicColumns } from "./data"

export const loadingStory = {
  render: () => (
    <div className="space-y-4 p-4">
      <div className="rounded-md border">
        <ProTable.Skeleton
          pagination={{
            pageSize: 5,
          }}
        />
      </div>
    </div>
  ),
  args: {
    columns: basicColumns as ColumnDef<unknown>[],
    data: [],
    isLoading: true,
  },
}
