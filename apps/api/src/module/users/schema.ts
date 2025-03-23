import { z } from "@hono/zod-openapi";

import { selectUserSchema } from "@/db/schema/users.schema";

// 定义查询参数 Schema
export const SearchQuerySchema = selectUserSchema.extend({
	id: z
		.string()
		.uuid()
		.optional()
		.openapi({
			param: {
				name: "id",
				in: "query",
			},
			description: "User ID",
			example: "123e4567-e89b-12d3-a456-426614174000",
		}),
	email: z
		.string()
		.optional()
		.openapi({
			param: {
				name: "email",
				in: "query",
			},
			description: "User email",
			example: "john@example.com",
		}),
	username: z
		.string()
		.optional()
		.openapi({
			param: {
				name: "username",
				in: "query",
			},
			description: "Username",
			example: "johndoe",
		}),
	status: z
		.string()
		.optional()
		.openapi({
			param: {
				name: "status",
				in: "query",
			},
			description: "User status",
			example: "active",
		}),
	role: z
		.string()
		.optional()
		.openapi({
			param: {
				name: "role",
				in: "query",
			},
			description: "User role",
			example: "user",
		}),
});

// 定义更新用户 Schema
export const UpdateUserSchema = selectUserSchema
	.partial()
	.pick({
		name: true,
		avatar: true,
		birthdate: true,
		bio: true,
		username: true,
	})
	.extend({
		name: z.string().optional().openapi({
			description: "User's name",
			example: "John Doe",
		}),
		avatar: z.string().optional().openapi({
			description: "User's avatar URL",
			example: "https://example.com/avatar.jpg",
		}),
		birthdate: z.string().optional().openapi({
			description: "User's birthdate",
			example: "1990-01-01",
		}),
		bio: z.string().optional().openapi({
			description: "User's biography",
			example: "A software developer",
		}),
		username: z.string().optional().openapi({
			description: "User's username",
			example: "johndoe",
		}),
	})
	.openapi("UpdateUser");

// 定义路由参数 Schema
export const ParamsSchema = selectUserSchema.pick({ id: true }).extend({
	id: z
		.string()
		.uuid()
		.openapi({
			param: {
				name: "id",
				in: "path",
			},
			example: "123e4567-e89b-12d3-a456-426614174000",
		}),
});

// 定义用户响应 Schema
export const UserResponseSchema = selectUserSchema
	.extend({
		id: z.string(),
		email: z.string(),
		name: z.string().nullable(),
		avatar: z.string().nullable(),
		username: z.string().nullable(),
		status: z.string(),
		role: z.string(),
		bio: z.string().nullable(),
		amount: z.string(),
		createdAt: z.string(),
		updatedAt: z.string(),
	})
	.openapi("User");
