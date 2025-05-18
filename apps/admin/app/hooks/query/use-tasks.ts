import { keepPreviousData, useQuery } from "@tanstack/react-query";
import type { PaginationState } from "@tanstack/react-table";

import { apiFetch } from "@/lib/api-fetch";
import type { ITask } from "@/schema/task";

export function useTasks(
	pagination?: PaginationState,
	searchParams?: Partial<ITask>,
) {
	const { pageIndex = 1, pageSize = 10 } = pagination || {};
	const { data, isPending, isFetching, refetch } = useQuery({
		queryKey: [
			"use-tasks",
			pageIndex,
			pageSize,
			...Object.entries(searchParams || {}),
		],
		queryFn: () =>
			apiFetch("/api/tasks", {
				params: {
					page: pageIndex,
					pageSize,
					...searchParams,
				},
			}),
		placeholderData: keepPreviousData,
	});

	return {
		isPending,
		isFetching,
		refetch,
		data: {
			list: data?.list || [],
			total: data?.total || 0,
			page: data?.page || 1,
			pageSize: data?.pageSize || 0,
		},
	};
}
