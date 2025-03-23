import { z } from "@hono/zod-openapi";

// 基础成功响应 Schema
export const BaseSuccessSchema = z.object({
	code: z.number().openapi({
		description: "Response status code",
		example: 200,
	}),
	msg: z.string().optional().openapi({
		description: "Response message",
		example: "Success",
	}),
});
export type BaseSuccessSchemaType = z.infer<typeof BaseSuccessSchema>;

// 基础错误响应 Schema
export const BaseErrorSchema = z.object({
	code: z.number().openapi({
		description: "Error code",
		example: 400,
	}),
	msg: z.string().openapi({
		description: "Error message",
		example: "Error occurred",
	}),
	data: z.null().optional(),
});
export type BaseErrorSchemaType = z.infer<typeof BaseErrorSchema>;

// 基础详情响应 Schema
export const BaseDetailSchema = <T extends z.ZodType>(dataSchema: T) =>
	BaseSuccessSchema.extend({
		data: dataSchema,
	});

export type BaseDetailSchemaType<T extends z.ZodType> = z.infer<
	ReturnType<typeof BaseDetailSchema<T>>
>;

// 基础分页响应 Schema
export const BasePaginationSchema = <T extends z.ZodType>(dataSchema: T) =>
	BaseSuccessSchema.extend({
		list: z.array(dataSchema),
		total: z.number(),
		page: z.number(),
		pageSize: z.number(),
		totalPages: z.number(),
	});
export type BasePaginationSchemaType<T extends z.ZodType> = z.infer<
	ReturnType<typeof BasePaginationSchema<T>>
>;

export const BasePaginateQuerySchema = z.object({
	page: z.coerce
		.number()
		.optional()
		.openapi({
			param: {
				name: "page",
				in: "query",
			},
			description: "Page number",
			example: 1,
		})
		.default(0),
	pageSize: z.coerce
		.number()
		.optional()
		.openapi({
			param: {
				name: "pageSize",
				in: "query",
			},
			description: "Items per page",
			example: 10,
		})
		.default(10),
});
