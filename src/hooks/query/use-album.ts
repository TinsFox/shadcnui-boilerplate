import { useMutation, useQuery } from "@tanstack/react-query"

import { apiFetch } from "@/lib/api-fetch"
import type { IUserInfo } from "@/models/user"

export function useAlbums() {
  return useQuery({
    queryKey: ["albums"],
    queryFn: async () => apiFetch<IUserInfo>("/api/albums"),
  })
}
