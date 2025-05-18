import { z } from "zod";
import "zod-openapi/extend";

// 分页查询参数 Schema
export const paginationQuerySchema = z.object({
	limit: z.coerce.number().min(1).max(100).default(10).openapi({
		description: "Number of records per page",
	}),
	page: z.coerce.number().min(1).default(1).openapi({
		description: "Page number",
	}),
	pageSize: z.coerce.number().min(1).max(100).default(10).openapi({
		description: "Number of records per page",
	}),
});

// 分页响应 Schema
export const paginationResponseSchema = <T extends z.ZodType>(dataSchema: T) =>
	z.object({
		records: z.array(dataSchema),
		hasNextPage: z.boolean(),
		total: z.number(),
		page: z.number(),
		pageSize: z.number(),
	});

// 导出类型
export type PaginationQuery = z.infer<typeof paginationQuerySchema>;
export type PaginationResponse<T> = z.infer<
	ReturnType<typeof paginationResponseSchema<T>>
>;
