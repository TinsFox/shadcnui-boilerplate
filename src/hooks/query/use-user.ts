import {
  keepPreviousData,
  queryOptions,
  useMutation,
  useQuery,
  useSuspenseQuery,
} from "@tanstack/react-query"
import type { PaginationState } from "@tanstack/react-table"

import { apiFetch } from "@/lib/api-fetch"
import type { ILoginForm, IUserProfile, IUsers } from "@/models/user"

export const queryUser = () => queryOptions({
  queryKey: ["userInfo"],
  queryFn: async () => apiFetch<IUserProfile>("/api/user"),
})

export const queryUserInfo = () =>
  queryOptions({
    queryKey: ["user-info"],
    queryFn: async () => apiFetch<IUserProfile>(`/api/user/info`),
  })

export function useUser() {
  return useSuspenseQuery(queryUserInfo())
}

export function useUserLoginMutation() {
  return useMutation({
    mutationFn: async (loginForm: ILoginForm) =>
      await apiFetch("/api/auth/login", {
        method: "POST",
        body: loginForm,
      }),
    mutationKey: ["user-login"],
  })
}

export function useUserLogoutMutation() {
  return useMutation({
    mutationFn: async () => await apiFetch("/api/logout"),
    mutationKey: ["userLogout"],
  })
}

export function useUsers(pagination: PaginationState) {
  const { data } = useQuery({
    queryKey: ["users", pagination.pageIndex, pagination.pageSize],
    queryFn: async () => apiFetch<{
      list: IUsers[]
      total: number
      page: number
      pageSize: number
    }>("/api/team-users", {
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
