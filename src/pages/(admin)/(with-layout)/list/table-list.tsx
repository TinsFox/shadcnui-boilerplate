import { columns } from "./components/columns"
import { DataTable } from "./components/data-table"
import { tasks } from "./data/seed"

export function Component() {
  return (
    <div>
      <DataTable data={tasks} columns={columns} />
    </div>
  )
}
