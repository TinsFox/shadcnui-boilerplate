import { db } from "@/db";
import { BasePaginateQuerySchema, BasePaginationSchema } from "@/schema/base";
import { users } from "auth-schema";
import { eq } from "drizzle-orm";
import { count } from "drizzle-orm";
import { Hono } from "hono";
import { describeRoute } from "hono-openapi";
import { resolver, validator as zValidator } from "hono-openapi/zod";
import { z } from "zod";
import {
	ParamsSchema,
	SearchQuerySchema,
	UpdateUserSchema,
	UserResponseSchema,
} from "./schema";

const userRouter = new Hono();

// Get users list with pagination
userRouter.get(
	"/",
	describeRoute({
		tags: ["Users"],
		summary: "Get users list",
		description:
			"Retrieve a paginated list of users with optional search query",
		responses: {
			200: {
				description: "Successfully retrieved users list",
				content: {
					"application/json": {
						schema: resolver(BasePaginationSchema(UserResponseSchema)),
					},
				},
			},
		},
	}),
	zValidator(
		"query",
		BasePaginateQuerySchema.merge(SearchQuerySchema.partial()),
	),
	async (c) => {
		const { page, pageSize } = c.req.valid("query");

		const allUsers = await db
			.select()
			.from(users)
			.orderBy(users.createdAt)
			.offset(page * pageSize)
			.limit(pageSize);

		const totalResult = await db.select({ count: count() }).from(users);
		const total = Number(totalResult[0].count);

		return c.json({
			code: 200,
			msg: "Successfully retrieved users list",
			list: allUsers.map((user) => ({
				...user,
				createdAt: user.createdAt.toISOString(),
				updatedAt: user.updatedAt.toISOString(),
			})),
			total,
			page: Number(page),
			pageSize: Number(pageSize),
			totalPages: Math.ceil(total / pageSize),
		});
	},
);

// Get current user info
userRouter.get(
	"/info",
	describeRoute({
		tags: ["Users"],
		summary: "Get user info",
		description: "Retrieve the current user's information",
		security: [{ Bearer: [] }],
		responses: {
			200: {
				content: {
					"application/json": {
						schema: resolver(UserResponseSchema),
					},
				},
				description: "Successfully retrieved user info",
			},
			404: {
				content: {
					"application/json": {
						schema: resolver(
							z.object({
								code: z.number(),
								msg: z.string(),
							}),
						),
					},
				},
				description: "User not found",
			},
		},
	}),
	async (c) => {
		const payload = c.get("jwtPayload");
		const user = await db.query.users.findFirst({
			where: eq(users.id, payload.sub),
		});

		if (!user) {
			return c.json(
				{
					code: 404,
					msg: "User not found",
				},
				404,
			);
		}

		return c.json({
			code: 200,
			msg: "Successfully retrieved user info",
			data: {
				...user,
				createdAt: user.createdAt.toISOString(),
				updatedAt: user.updatedAt.toISOString(),
			},
		});
	},
);

// Get user by ID
userRouter.get(
	"/:id",
	describeRoute({
		tags: ["Users"],
		summary: "Get user by id",
		description: "Retrieve a user by their ID",
		responses: {
			200: {
				content: {
					"application/json": {
						schema: resolver(UserResponseSchema),
					},
				},
				description: "Successfully retrieved user",
			},
			404: {
				content: {
					"application/json": {
						schema: resolver(
							z.object({
								code: z.number(),
								msg: z.string(),
							}),
						),
					},
				},
				description: "User not found",
			},
		},
	}),
	zValidator("param", ParamsSchema),
	async (c) => {
		const { id } = c.req.valid("param");
		const user = await db.query.users.findFirst({
			where: eq(users.id, id),
		});

		if (!user) {
			return c.json(
				{
					code: 404,
					msg: "User not found",
				},
				404,
			);
		}

		return c.json({
			code: 200,
			msg: "Successfully retrieved user",
			data: {
				...user,
				createdAt: user.createdAt.toISOString(),
				updatedAt: user.updatedAt.toISOString(),
			},
		});
	},
);

// Update user
userRouter.put(
	"/:id",
	describeRoute({
		tags: ["Users"],
		summary: "Update user",
		description: "Update a user's information",
		responses: {
			200: {
				content: {
					"application/json": {
						schema: resolver(UserResponseSchema),
					},
				},
				description: "User updated successfully",
			},
			404: {
				content: {
					"application/json": {
						schema: resolver(
							z.object({
								code: z.number(),
								msg: z.string(),
							}),
						),
					},
				},
				description: "User not found",
			},
		},
	}),
	zValidator("param", ParamsSchema),
	zValidator("json", UpdateUserSchema),
	async (c) => {
		const { id } = c.req.valid("param");
		const updateData = c.req.valid("json");

		const [updated] = await db
			.update(users)
			.set({
				...updateData,
				updatedAt: new Date(),
			})
			.where(eq(users.id, id))
			.returning();

		if (!updated) {
			return c.json(
				{
					code: 404,
					msg: "User not found",
				},
				404,
			);
		}

		return c.json({
			code: 200,
			msg: "User updated successfully",
			data: {
				...updated,
				createdAt: updated.createdAt.toISOString(),
				updatedAt: updated.updatedAt.toISOString(),
			},
		});
	},
);

// Delete user
userRouter.delete(
	"/:id",
	describeRoute({
		tags: ["Users"],
		summary: "Delete user",
		description: "Delete a user by their ID",
		responses: {
			200: {
				content: {
					"application/json": {
						schema: resolver(
							z.object({
								code: z.number(),
								msg: z.string(),
							}),
						),
					},
				},
				description: "User deleted successfully",
			},
			404: {
				content: {
					"application/json": {
						schema: resolver(
							z.object({
								code: z.number(),
								msg: z.string(),
							}),
						),
					},
				},
				description: "User not found",
			},
		},
	}),
	zValidator("param", ParamsSchema),
	async (c) => {
		const { id } = c.req.valid("param");
		const [deleted] = await db
			.delete(users)
			.where(eq(users.id, id))
			.returning();

		if (!deleted) {
			return c.json(
				{
					code: 404,
					msg: "User not found",
				},
				404,
			);
		}

		return c.json({
			code: 200,
			msg: "User deleted successfully",
		});
	},
);

export { userRouter };
