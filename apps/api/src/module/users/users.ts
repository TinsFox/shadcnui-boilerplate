import { db } from "@/db";
import {
	BaseDetailSchema,
	BaseErrorSchema,
	BasePaginateQuerySchema,
	BasePaginationSchema,
} from "@/schema/base";
import { OpenAPIHono, createRoute, z } from "@hono/zod-openapi";
import { users } from "auth-schema";
import { eq } from "drizzle-orm";
import { count } from "drizzle-orm";
import { dbClientInWorker } from "../../db/client.serverless";
import {
	ParamsSchema,
	SearchQuerySchema,
	UpdateUserSchema,
	UserResponseSchema,
} from "./schema";

const userRouter = new OpenAPIHono<HonoEnvType>();

const getUsersRoute = createRoute({
	method: "get",
	path: "",
	tags: ["Users"],
	summary: "Get users list",
	description: "Retrieve a paginated list of users with optional search query",
	request: {
		query: BasePaginateQuerySchema.merge(SearchQuerySchema.partial()),
	},
	responses: {
		200: {
			content: {
				"application/json": {
					schema: BasePaginationSchema(UserResponseSchema),
				},
			},
			description: "Successfully retrieved users list",
		},
	},
});

// 修改获取用户信息的路由配置
const getUserInfoRoute = createRoute({
	method: "get",
	path: "/info",
	tags: ["Users"],
	summary: "Get user info",
	description: "Retrieve the current user's information",
	security: [{ Bearer: [] }],
	responses: {
		200: {
			content: {
				"application/json": {
					schema: BaseDetailSchema(UserResponseSchema),
				},
			},
			description: "Successfully retrieved user info",
		},
		404: {
			content: {
				"application/json": {
					schema: BaseErrorSchema,
				},
			},
			description: "User not found",
		},
	},
});

// 修改获取指定用户的路由配置
const getUserByIdRoute = createRoute({
	method: "get",
	path: "/{id}",
	tags: ["Users"],
	summary: "Get user by id",
	description: "Retrieve a user by their ID",
	request: {
		params: ParamsSchema,
	},
	responses: {
		200: {
			content: {
				"application/json": {
					schema: BaseDetailSchema(UserResponseSchema),
				},
			},
			description: "Successfully retrieved user",
		},
		400: {
			content: {
				"application/json": {
					schema: BaseErrorSchema,
				},
			},
			description: "Bad request",
		},
		404: {
			content: {
				"application/json": {
					schema: BaseErrorSchema,
				},
			},
			description: "User not found",
		},
	},
});

userRouter.openapi(getUsersRoute, async (c) => {
	const { page, pageSize } = c.req.valid("query");

	const allUsers = await dbClientInWorker(c.env.DATABASE_URL)
		.select()
		.from(users)
		.offset(page * pageSize)
		.limit(pageSize);

	const totalResult = await dbClientInWorker(c.env.DATABASE_URL)
		.select({ count: count() })
		.from(users);
	const total = Number(totalResult[0].count);

	return c.json({
		code: 200,
		list: allUsers,
		msg: "Get user list success",
		total,
		page: Number(page),
		pageSize: Number(pageSize),
		totalPages: Math.ceil(total / pageSize),
	});
});

userRouter.openapi(getUserInfoRoute, async (c) => {
	const payload = c.get("jwtPayload");

	const [user] = await db
		.select({
			id: users.id,
			email: users.email,
			password: users.password,
			name: users.name,
			username: users.username,
			avatar: users.avatar,
			birthdate: users.birthdate,
			registeredAt: users.registeredAt,
			createdAt: users.createdAt,
			updatedAt: users.updatedAt,
			status: users.status,
			role: users.role,
			bio: users.bio,
			amount: users.amount,
		})
		.from(users)
		.where(eq(users.id, payload.sub));

	if (!user) {
		return c.json(
			{
				code: 404,
				msg: "User not found",
				data: null,
			},
			404,
		);
	}

	return c.json(
		{
			code: 200,
			msg: "Get user info success",
			data: {
				...user,
				birthdate: user.birthdate?.toString() ?? null,
				registeredAt: user.registeredAt.toISOString(),
				createdAt: user.createdAt.toISOString(),
				updatedAt: user.updatedAt.toISOString(),
				amount: user.amount?.toString() ?? "0",
			},
		},
		200,
	);
});

userRouter.openapi(getUserByIdRoute, async (c) => {
	const { id } = c.req.valid("param");

	const [user] = await dbClientInWorker(c.env.DATABASE_URL)
		.select({
			id: users.id,
			email: users.email,
			password: users.password,
			name: users.name,
			username: users.username,
			avatar: users.avatar,
			birthdate: users.birthdate,
			registeredAt: users.registeredAt,
			bio: users.bio,
			role: users.role,
			amount: users.amount,
			status: users.status,
			createdAt: users.createdAt,
			updatedAt: users.updatedAt,
		})
		.from(users)
		.where(eq(users.id, id));

	if (!user) {
		return c.json(
			{
				code: 404,
				msg: "User not found",
				data: null,
			},
			404,
		);
	}

	return c.json(
		{
			code: 200,
			msg: "Get user success",
			data: {
				...user,
				birthdate: user.birthdate?.toString() ?? null,
				registeredAt: user.registeredAt.toISOString(),
				createdAt: user.createdAt.toISOString(),
				updatedAt: user.updatedAt.toISOString(),
				amount: user.amount?.toString() ?? "0",
			},
		},
		200,
	);
});

const updateUserRoute = createRoute({
	method: "put",
	path: "/{id}",
	tags: ["Users"],
	summary: "Update user",
	description: "Update a user's information",
	request: {
		params: ParamsSchema,
		body: {
			content: {
				"application/json": {
					schema: UpdateUserSchema,
				},
			},
		},
	},
	responses: {
		200: {
			content: {
				"application/json": {
					schema: z.object({
						code: z.number(),
						msg: z.string(),
					}),
				},
			},
			description: "User updated successfully",
		},
		400: {
			content: {
				"application/json": {
					schema: z.object({
						code: z.number(),
						msg: z.string(),
					}),
				},
			},
			description: "Invalid request",
		},
	},
});

userRouter.openapi(updateUserRoute, async (c) => {
	const { id } = c.req.valid("param");
	const updateData = c.req.valid("json");

	await dbClientInWorker(c.env.DATABASE_URL)
		.update(users)
		.set({
			...updateData,
			updatedAt: new Date(),
		})
		.where(eq(users.id, id));

	return c.json({
		code: 200,
		msg: "Update user success",
	});
});

// 添加删除用户的路由配置
const deleteUserRoute = createRoute({
	method: "delete",
	path: "/{id}",
	tags: ["Users"],
	summary: "Delete user",
	description: "Delete a user by their ID",
	request: {
		params: ParamsSchema,
	},
	responses: {
		200: {
			content: {
				"application/json": {
					schema: z.object({
						code: z.number(),
						msg: z.string(),
					}),
				},
			},
			description: "User deleted successfully",
		},
		404: {
			content: {
				"application/json": {
					schema: z.object({
						code: z.number(),
						msg: z.string(),
					}),
				},
			},
			description: "User not found",
		},
	},
});

// 实现删除用户路由
userRouter.openapi(deleteUserRoute, async (c) => {
	const { id } = c.req.valid("param");

	const [existingUser] = await dbClientInWorker(c.env.DATABASE_URL)
		.select()
		.from(users)
		.where(eq(users.id, id));

	if (!existingUser) {
		return c.json(
			{
				code: 404,
				msg: "User not found",
				data: null,
			},
			404,
		);
	}

	await dbClientInWorker(c.env.DATABASE_URL)
		.delete(users)
		.where(eq(users.id, id));

	return c.json({
		code: 200,
		msg: "Delete user success",
	});
});

export { userRouter };
