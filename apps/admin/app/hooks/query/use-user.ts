import {
	keepPreviousData,
	queryOptions,
	useMutation,
	useQuery,
	useQueryClient,
	useSuspenseQuery,
} from "@tanstack/react-query";
import type { PaginationState } from "@tanstack/react-table";
import { useNavigate } from "react-router";

import { apiFetch } from "@/lib/api-fetch";
import { authClient } from "@/lib/auth-client";
import type { IBetterAuthUsers, ILoginForm, IUserProfile } from "@/schema/user";

const userKeys = {
	all: ["users"] as const,
	list: () => [...userKeys.all, "list"] as const,
	detail: (id: string) => [...userKeys.all, id] as const,
};

export const queryUserSession = () =>
	queryOptions({
		queryKey: ["user-info"],
		queryFn: async () => {
			return await authClient.getSession();
		},
	});

export function useSession() {
	return useSuspenseQuery(queryUserSession());
}

export function useUserLoginMutation() {
	return useMutation({
		mutationFn: async (loginForm: ILoginForm) =>
			await apiFetch("/api/auth/login", {
				method: "POST",
				body: loginForm,
			}),
		mutationKey: ["user-login"],
	});
}

export function useUserLogoutMutation() {
	const navigate = useNavigate();
	return useMutation({
		mutationFn: async () => await apiFetch("/api/logout"),
		mutationKey: ["user-logout"],
		onSuccess: () => {
			localStorage.clear();
			navigate("/login");
		},
	});
}

export function useUsers(
	pagination?: PaginationState,
	searchParams?: Partial<IBetterAuthUsers>,
) {
	const { pageIndex = 1, pageSize = 10 } = pagination || {};
	const { data, isPending, isFetching, refetch } = useQuery({
		queryKey: [
			"users",
			pageIndex,
			pageSize,
			...Object.entries(searchParams || {}),
		],
		queryFn: async () => {
			const users = await authClient.admin.listUsers({
				query: {
					limit: 10,
				},
			});

			return users;
		},
		placeholderData: keepPreviousData,
	});

	return {
		isPending,
		isLoading: isFetching,
		refetch,
		data: {
			list: data?.data?.users || [],
			total: data?.data?.total || 0,
		},
	};
}

export function useUpdateUser() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async (user: IBetterAuthUsers) =>
			await apiFetch(`/api/${user.id}`, {
				method: "PUT",
				body: user,
			}),
		onSuccess: () => {
			// 更新用户列表缓存
			queryClient.invalidateQueries({ queryKey: ["users"] });
		},
	});
}
