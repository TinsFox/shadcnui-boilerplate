import { useMutation, useQuery } from "@tanstack/react-query"

import { apiFetch } from "@/lib/api-fetch"
import type { IUserInfo } from "@/models/user"

export function useUser() {
  return useQuery({
    queryKey: ["userInfo"],
    queryFn: async () => apiFetch<IUserInfo>("/api/user"),
  })
}

export function useUserMutation() {
  return useMutation({
    mutationFn: async (params: any) =>
      await apiFetch("/api/login", {
        method: "POST",
        body: JSON.stringify(params),
      }),
  })
}
