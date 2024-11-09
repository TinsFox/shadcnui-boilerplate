import { cn } from "@/lib/utils"

// 基础数据接口
export interface Person {
  id: number
  firstName: string
  lastName: string
  age: number
  email: string
  status: "active" | "inactive"
}

// 基础数据
export const basicData: Person[] = Array.from({ length: 10 }).map((_, index) => ({
  id: index + 1,
  firstName: `First${index + 1}`,
  lastName: `Last${index + 1}`,
  age: 20 + (index % 30),
  email: `person${index + 1}@example.com`,
  status: index % 2 === 0 ? "active" : "inactive",
}))

// 基础列配置
export const basicColumns = [
  {
    id: "id",
    accessorKey: "id",
    header: "ID",
    size: 80,
  },
  {
    accessorKey: "firstName",
    header: "First Name",
    size: 150,
  },
  {
    accessorKey: "lastName",
    header: "Last Name",
    size: 150,
  },
  {
    accessorKey: "age",
    header: "Age",
    size: 100,
  },
  {
    accessorKey: "email",
    header: "Email",
    size: 200,
  },
  {
    accessorKey: "status",
    header: "Status",
    size: 120,
    cell: ({ row }: { row: { original: Person } }) => (
      <span
        className={cn(
          "inline-flex rounded-full px-2 text-xs font-semibold leading-5",
          row.original.status === "active" ?
            "bg-green-100 text-green-800" :
            "bg-red-100 text-red-800",
        )}
      >
        {row.original.status}
      </span>
    ),
  },
]
