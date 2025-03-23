import { OpenAPIHono, createRoute } from "@hono/zod-openapi";
import { count } from "drizzle-orm";

import { BasePaginateQuerySchema, BasePaginationSchema } from "@/schema/base";
import { queryAlbumSchema } from "./schema";

import { db } from "@/db";
import { albumsTableSchema } from "@/db/schema/album.schema";

const albumRouter = new OpenAPIHono<HonoEnvType>();

const listAlbumsRoute = createRoute({
	method: "get",
	path: "",
	request: {
		query: BasePaginateQuerySchema,
	},
	responses: {
		200: {
			description: "Success",
			content: {
				"application/json": {
					schema: BasePaginationSchema(queryAlbumSchema),
				},
			},
		},
	},
});

// 实现获取列表路由
albumRouter.openapi(listAlbumsRoute, async (c) => {
	const { page, pageSize } = c.req.valid("query");

	const data = await db
		.select()
		.from(albumsTableSchema)
		.offset(page * pageSize);

	// 查询总数
	const totalResult = await db
		.select({ count: count() })
		.from(albumsTableSchema);
	const total = Number(totalResult[0].count);

	return c.json({
		code: 200,
		list: data,
		total,
		page,
		pageSize,
		totalPages: Math.ceil(total / pageSize),
		msg: "获取专辑列表成功",
	});
});

export { albumRouter };
