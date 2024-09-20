import {
  keepPreviousData,
  queryOptions,
  useMutation,
  useQuery,
  useSuspenseQuery,
} from "@tanstack/react-query"
import type { PaginationState } from "@tanstack/react-table"

import { apiFetch } from "@/lib/api-fetch"
import type { ILoginForm, IUserInfo } from "@/models/user"

export const queryUser = () => queryOptions({
  queryKey: ["userInfo"],
  queryFn: async () => apiFetch<IUserInfo>("/api/user"),
})

export function useUser() {
  return useSuspenseQuery(queryUser())
}

export function useUserLoginMutation() {
  return useMutation({
    mutationFn: async (loginForm: ILoginForm) =>
      await apiFetch("/api/login", {
        method: "POST",
        body: loginForm,
      }),
  })
}

export function useUserLogoutMutation() {
  return useMutation({
    mutationFn: async () => await apiFetch("/api/logout"),
    mutationKey: ["userLogout"],
  })
}

export interface IUsers {
  id: string
  amount: number
  status: "pending" | "processing" | "success" | "failed"
  email: string
  name: string
  avatar: string
  createdAt: string
  role: string
  bio: string
}
export function useUsers(pagination: PaginationState) {
  const { data } = useQuery({
    queryKey: ["users", pagination.pageIndex, pagination.pageSize],
    queryFn: async () => apiFetch<{
      list: IUsers[]
      total: number
      page: number
      pageSize: number
    }>("/api/users", {
      params: {
        page: pagination.pageIndex,
        pageSize: pagination.pageSize,
      },
    }),
    placeholderData: keepPreviousData,
  })

  return {
    data: {
      list: data?.list || [],
      total: data?.total || 0,
      page: data?.page || 0,
      pageSize: data?.pageSize || 0,
    },
  }
}
