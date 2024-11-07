import {
  keepPreviousData,
  queryOptions,
  useMutation,
  useQuery,
  useSuspenseQuery,
} from "@tanstack/react-query"
import type { PaginationState } from "@tanstack/react-table"
import { useNavigate } from "react-router-dom"

import { apiFetch } from "@/lib/api-fetch"
import type { ILoginForm, IUserProfile, IUsers } from "@/schema/user"

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
  const navigate = useNavigate()
  return useMutation({
    mutationFn: async () => await apiFetch("/api/logout"),
    mutationKey: ["user-logout"],
    onSuccess: () => {
      localStorage.clear()
      navigate("/login")
    },
  })
}

export function useUsers(pagination: PaginationState, searchParams?: Partial<IUsers>) {
  const { data, isPending, isFetching, refetch } = useQuery({
    queryKey: ["users", pagination.pageIndex, pagination.pageSize, ...Object.entries(searchParams || {})],
    queryFn: async () => apiFetch<{
      list: IUsers[]
      total: number
      page: number
      pageSize: number
    }>("/api/team-users", {
      params: {
        page: pagination.pageIndex,
        pageSize: pagination.pageSize,
        ...searchParams,
      },
    }),
    placeholderData: keepPreviousData,
  })

  return {
    isPending,
    isLoading: isFetching,
    refetch,
    data: {
      list: data?.list || [],
      total: data?.total || 0,
      page: data?.page || 0,
      pageSize: data?.pageSize || 0,
    },
  }
}
