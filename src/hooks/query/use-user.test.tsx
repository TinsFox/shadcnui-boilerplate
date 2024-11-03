import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { renderHook, waitFor } from "@testing-library/react"
import type { ReactNode } from "react"
import * as router from "react-router-dom"
import { beforeEach, describe, expect, it, vi } from "vitest"

import { apiFetch } from "@/lib/api-fetch"

import { useUser, useUserLoginMutation, useUserLogoutMutation, useUsers } from "./use-user"

// Mock apiFetch
vi.mock("@/lib/api-fetch")
// Mock useNavigate
vi.mock("react-router-dom")

describe("User Hooks", () => {
  let queryClient: QueryClient

  beforeEach(() => {
    queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          retry: false,
        },
      },
    })
    vi.clearAllMocks()
  })

  // 测试包装器
  const createWrapper = () => {
    return function Wrapper({ children }: { children: ReactNode }) {
      return (
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      )
    }
  }

  describe("useUser", () => {
    it("should fetch user info successfully", async () => {
      const mockUserData = {
        id: 1,
        name: "Test User",
        email: "test@example.com",
      }

      // Mock API response
      vi.mocked(apiFetch).mockResolvedValueOnce(mockUserData)

      const { result } = renderHook(() => useUser(), {
        wrapper: createWrapper(),
      })

      await waitFor(() => {
        expect(result.current.data).toEqual(mockUserData)
      })

      expect(apiFetch).toHaveBeenCalledWith("/api/user/info")
    })
  })

  describe("useUserLoginMutation", () => {
    it("should handle login mutation", async () => {
      const mockLoginResponse = { token: "test-token" }
      vi.mocked(apiFetch).mockResolvedValueOnce(mockLoginResponse)

      const { result } = renderHook(() => useUserLoginMutation(), {
        wrapper: createWrapper(),
      })

      const loginData = { email: "test@example.com", password: "password" }
      result.current.mutate(loginData)

      await waitFor(() => {
        expect(apiFetch).toHaveBeenCalledWith("/api/auth/login", {
          method: "POST",
          body: loginData,
        })
      })
    })
  })

  describe("useUserLogoutMutation", () => {
    it("should handle logout mutation", async () => {
      const mockNavigate = vi.fn()
      vi.spyOn(router, "useNavigate").mockImplementation(() => mockNavigate)
      vi.mocked(apiFetch).mockResolvedValueOnce({})

      const { result } = renderHook(() => useUserLogoutMutation(), {
        wrapper: createWrapper(),
      })

      result.current.mutate()

      await waitFor(() => {
        expect(apiFetch).toHaveBeenCalledWith("/api/logout")
        expect(mockNavigate).toHaveBeenCalledWith("/login")
      })
    })
  })

  describe("useUsers", () => {
    it("should fetch users list with pagination", async () => {
      const mockUsersData = {
        list: [{ id: 1, name: "User 1" }],
        total: 1,
        page: 0,
        pageSize: 10,
      }

      vi.mocked(apiFetch).mockResolvedValueOnce(mockUsersData)

      const pagination = { pageIndex: 0, pageSize: 10 }
      const { result } = renderHook(() => useUsers(pagination), {
        wrapper: createWrapper(),
      })

      await waitFor(() => {
        expect(result.current.data).toEqual(mockUsersData)
        expect(result.current.isPending).toBe(false)
      })

      expect(apiFetch).toHaveBeenCalledWith("/api/team-users", {
        params: {
          page: pagination.pageIndex,
          pageSize: pagination.pageSize,
        },
      })
    })

    it("should return default values when data is undefined", async () => {
      vi.mocked(apiFetch).mockResolvedValueOnce()

      const pagination = { pageIndex: 0, pageSize: 10 }
      const { result } = renderHook(() => useUsers(pagination), {
        wrapper: createWrapper(),
      })

      await waitFor(() => {
        expect(result.current.data).toEqual({
          list: [],
          total: 0,
          page: 0,
          pageSize: 0,
        })
      })
    })
  })
})
