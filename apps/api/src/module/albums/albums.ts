import { db } from "@/db";
import { albumsTableSchema } from "@/db/schema/album.schema";
import { createAlbumSchema, selectAlbumSchema } from "@/db/schema/album.schema";
import { paginateWithLimitOffset } from "@/lib/drizzle-pagination";
import {
	paginationQuerySchema,
	paginationResponseSchema,
} from "@/schema/pagination";
import { eq } from "drizzle-orm";
import { Hono } from "hono";
import { describeRoute } from "hono-openapi";
import { resolver, validator as zValidator } from "hono-openapi/zod";
import { z } from "zod";

const albumRouter = new Hono();

// Create album
albumRouter.post(
	"/",
	describeRoute({
		tags: ["albums"],
		summary: "Create a new album",
		responses: {
			201: {
				description: "Album created successfully",
				content: {
					"application/json": {
						schema: resolver(selectAlbumSchema),
					},
				},
			},
		},
	}),
	zValidator("json", createAlbumSchema),
	async (c) => {
		const album = c.req.valid("json");
		const [newAlbum] = await db
			.insert(albumsTableSchema)
			.values(album)
			.returning();

		return c.json(newAlbum, 201);
	},
);

// Get albums list
albumRouter.get(
	"/",
	describeRoute({
		tags: ["albums"],
		summary: "Get all albums with pagination",
		responses: {
			200: {
				description: "List of albums with pagination info",
				content: {
					"application/json": {
						schema: resolver(paginationResponseSchema(selectAlbumSchema)),
					},
				},
			},
		},
	}),
	zValidator("query", paginationQuerySchema),
	async (c) => {
		const { limit, page, pageSize } = c.req.valid("query");

		const result = await paginateWithLimitOffset(
			db.select().from(albumsTableSchema),
			{
				limit,
				offset: (page - 1) * pageSize,
				orderBy: [[albumsTableSchema.createdAt, "desc"]],
			},
		);

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

// Get single album
albumRouter.get(
	"/:id",
	describeRoute({
		tags: ["albums"],
		summary: "Get an album by ID",
		responses: {
			200: {
				description: "Album details",
				content: {
					"application/json": {
						schema: resolver(selectAlbumSchema),
					},
				},
			},
			404: {
				description: "Album not found",
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
		const album = await db.query.albumsTableSchema.findFirst({
			where: eq(albumsTableSchema.id, id),
		});

		if (!album) {
			return c.json({ message: "Album not found" }, 404);
		}
		return c.json(album);
	},
);

// Update album
albumRouter.put(
	"/:id",
	describeRoute({
		tags: ["albums"],
		summary: "Update an album by ID",
		responses: {
			200: {
				description: "Album updated successfully",
				content: {
					"application/json": {
						schema: resolver(selectAlbumSchema),
					},
				},
			},
			404: {
				description: "Album not found",
				content: {
					"application/json": {
						schema: resolver(z.object({ message: z.string() })),
					},
				},
			},
		},
	}),
	zValidator("param", z.object({ id: z.string().uuid() })),
	zValidator("json", createAlbumSchema.partial()),
	async (c) => {
		const { id } = c.req.valid("param");
		const album = c.req.valid("json");

		const [updated] = await db
			.update(albumsTableSchema)
			.set({
				...album,
				updatedAt: new Date(),
			})
			.where(eq(albumsTableSchema.id, id))
			.returning();

		if (!updated) {
			return c.json({ message: "Album not found" }, 404);
		}
		return c.json(updated);
	},
);

// Delete album
albumRouter.delete(
	"/:id",
	describeRoute({
		tags: ["albums"],
		summary: "Delete an album by ID",
		responses: {
			200: {
				description: "Album deleted successfully",
				content: {
					"application/json": {
						schema: resolver(z.object({ message: z.string() })),
					},
				},
			},
			404: {
				description: "Album not found",
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
			.delete(albumsTableSchema)
			.where(eq(albumsTableSchema.id, id))
			.returning();

		if (!deleted) {
			return c.json({ message: "Album not found" }, 404);
		}
		return c.json({ message: "Album deleted" });
	},
);

export { albumRouter };
