import { db } from "@/db";
import { tasks } from "@/db/schema/tasks.schema";
import { paginateWithLimitOffset } from "@/lib/drizzle-pagination";
import {
	paginationQuerySchema,
	paginationResponseSchema,
} from "@/schema/pagination";
import { z } from "@hono/zod-openapi";
import { eq } from "drizzle-orm";
import { Hono } from "hono";
import { describeRoute } from "hono-openapi";
import { resolver, validator as zValidator } from "hono-openapi/zod";
import { createTaskSchema } from "./schema";

const taskRouter = new Hono();

// Get tasks list
taskRouter.get(
	"/",
	describeRoute({
		tags: ["tasks"],
		summary: "Get all tasks with pagination",
		responses: {
			200: {
				description: "List of tasks with pagination info",
				content: {
					"application/json": {
						schema: resolver(
							paginationResponseSchema(z.object(createTaskSchema.shape)),
						),
					},
				},
			},
		},
	}),
	zValidator("query", paginationQuerySchema),
	async (c) => {
		const { limit, page, pageSize } = c.req.valid("query");

		const result = await paginateWithLimitOffset(db.select().from(tasks), {
			limit,
			offset: (page - 1) * pageSize,
			orderBy: [[tasks.createdAt, "desc"]],
		});

		return c.json({
			records: result.data,
			nextOffset: result.hasNextPage ? result.nextCursor?.[0] : undefined,
			hasNextPage: result.hasNextPage,
			total: result.total,
			page: page,
			pageSize: pageSize,
		});
	},
);

// Create task
taskRouter.post(
	"/",
	describeRoute({
		tags: ["tasks"],
		summary: "Create a new task",
		responses: {
			201: {
				description: "Task created successfully",
				content: {
					"application/json": {
						schema: resolver(z.object(createTaskSchema.shape)),
					},
				},
			},
		},
	}),
	zValidator("json", createTaskSchema),
	async (c) => {
		const task = c.req.valid("json");
		const [newTask] = await db.insert(tasks).values(task).returning();

		return c.json(newTask, 201);
	},
);

// Get single task
taskRouter.get(
	"/:id",
	describeRoute({
		tags: ["tasks"],
		summary: "Get a task by ID",
		responses: {
			200: {
				description: "Task details",
				content: {
					"application/json": {
						schema: resolver(z.object(createTaskSchema.shape)),
					},
				},
			},
			404: {
				description: "Task not found",
				content: {
					"application/json": {
						schema: resolver(z.object({ message: z.string() })),
					},
				},
			},
		},
	}),
	zValidator("param", z.object({ id: z.string().uuid() })),
	async (c) => {
		const { id } = c.req.valid("param");
		const task = await db.query.tasks.findFirst({
			where: eq(tasks.id, id),
		});

		if (!task) {
			return c.json({ message: "Task not found" }, 404);
		}
		return c.json(task);
	},
);

// Update task
taskRouter.put(
	"/:id",
	describeRoute({
		tags: ["tasks"],
		summary: "Update a task by ID",
		responses: {
			200: {
				description: "Task updated successfully",
				content: {
					"application/json": {
						schema: resolver(z.object(createTaskSchema.shape)),
					},
				},
			},
			404: {
				description: "Task not found",
				content: {
					"application/json": {
						schema: resolver(z.object({ message: z.string() })),
					},
				},
			},
		},
	}),
	zValidator("param", z.object({ id: z.string().uuid() })),
	zValidator("json", createTaskSchema.partial()),
	async (c) => {
		const { id } = c.req.valid("param");
		const task = c.req.valid("json");

		const [updated] = await db
			.update(tasks)
			.set({
				...task,
				updatedAt: new Date(),
			})
			.where(eq(tasks.id, id))
			.returning();

		if (!updated) {
			return c.json({ message: "Task not found" }, 404);
		}
		return c.json(updated);
	},
);

// Delete task
taskRouter.delete(
	"/:id",
	describeRoute({
		tags: ["tasks"],
		summary: "Delete a task by ID",
		responses: {
			200: {
				description: "Task deleted successfully",
				content: {
					"application/json": {
						schema: resolver(z.object({ message: z.string() })),
					},
				},
			},
			404: {
				description: "Task not found",
				content: {
					"application/json": {
						schema: resolver(z.object({ message: z.string() })),
					},
				},
			},
		},
	}),
	zValidator("param", z.object({ id: z.string().uuid() })),
	async (c) => {
		const { id } = c.req.valid("param");
		const [deleted] = await db
			.delete(tasks)
			.where(eq(tasks.id, id))
			.returning();

		if (!deleted) {
			return c.json({ message: "Task not found" }, 404);
		}
		return c.json({ message: "Task deleted" });
	},
);

export { taskRouter };
