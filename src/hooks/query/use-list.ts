import { useQuery } from "@tanstack/react-query"
import { tasks } from "mock/seed"

export function useBasicList() {
  return useQuery({
    queryKey: ["list"],
    queryFn: () => fetchList(),
  })
}

async function fetchList() {
  return tasks
}
