import { useQuery } from "@tanstack/react-query";
import type { PaginationState } from "@tanstack/react-table";

import { apiFetch } from "@/lib/api-fetch";
import type { IAlbum } from "@/schema/album";

export function useAlbums(
	pagination?: PaginationState,
	searchParams?: Partial<IAlbum>,
) {
	const { pageIndex = 0, pageSize = 10 } = pagination || {};
	const { data, isPending, isFetching, refetch } = useQuery({
		queryKey: [
			"albums",
			pageIndex,
			pageSize,
			...Object.entries(searchParams || {}),
		],
		queryFn: async () =>
			apiFetch("/api/albums", {
				params: {
					page: pageIndex,
					pageSize,
					...searchParams,
				},
			}),
	});

	return {
		isPending,
		isFetching,
		refetch,
		data: {
			list: data?.list || [],
			total: data?.total || 0,
			page: data?.page || 0,
			pageSize: data?.pageSize || 0,
		},
	};
}
