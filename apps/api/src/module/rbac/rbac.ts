import { db } from "@/db";
import {
	insertPermissionSchema,
	insertRoleSchema,
	roles,
	selectPermissionSchema,
	selectRoleSchema,
} from "@/db/schema/rbac.schema";
import { permissions } from "@/db/schema/rbac.schema";
import { BaseDetailSchema, BaseErrorSchema } from "@/schema/base";
import { OpenAPIHono, createRoute, z } from "@hono/zod-openapi";

const rbacRouter = new OpenAPIHono();

// 获取所有角色
const getRolesRoute = createRoute({
	method: "get",
	path: "/roles",
	tags: ["RBAC"],
	summary: "获取角色列表",
	security: [{ bearer: [] }],
	responses: {
		200: {
			content: {
				"application/json": {
					schema: BaseDetailSchema(z.array(selectRoleSchema)),
				},
			},
			description: "成功获取角色列表",
		},
	},
});

rbacRouter.openapi(getRolesRoute, async (c) => {
	const allRoles = await db.query.roles.findMany();
	return c.json({
		code: 200,
		msg: "Success",
		data: allRoles,
	});
});

// 创建新角色
const createRoleRoute = createRoute({
	method: "post",
	path: "/roles",
	tags: ["RBAC"],
	summary: "创建新角色",
	security: [{ bearer: [] }],
	request: {
		body: {
			content: {
				"application/json": {
					schema: insertRoleSchema,
				},
			},
		},
	},
	responses: {
		200: {
			content: {
				"application/json": {
					schema: BaseDetailSchema(selectRoleSchema),
				},
			},
			description: "成功创建角色",
		},
		400: {
			content: {
				"application/json": {
					schema: BaseErrorSchema,
				},
			},
			description: "请求参数错误",
		},
	},
});

rbacRouter.openapi(createRoleRoute, async (c) => {
	const data = c.req.valid("json");
	const newRole = await db.insert(roles).values(data).returning();

	return c.json(
		{
			code: 200,
			msg: "Role created successfully",
			data: newRole[0],
		},
		200,
	);
});

// 获取所有权限
const getPermissionsRoute = createRoute({
	method: "get",
	path: "/permissions",
	tags: ["RBAC"],
	summary: "获取权限列表",
	security: [{ bearer: [] }],
	responses: {
		200: {
			content: {
				"application/json": {
					schema: BaseDetailSchema(z.array(selectPermissionSchema)),
				},
			},
			description: "成功获取权限列表",
		},
	},
});

rbacRouter.openapi(getPermissionsRoute, async (c) => {
	const allPermissions = await db.query.permissions.findMany();
	return c.json({
		code: 200,
		msg: "Success",
		data: allPermissions,
	});
});

// 创建新权限
const createPermissionRoute = createRoute({
	method: "post",
	path: "/permissions",
	tags: ["RBAC"],
	summary: "创建新权限",
	security: [{ bearer: [] }],
	request: {
		body: {
			content: {
				"application/json": {
					schema: insertPermissionSchema,
				},
			},
		},
	},
	responses: {
		200: {
			content: {
				"application/json": {
					schema: BaseDetailSchema(selectPermissionSchema),
				},
			},
			description: "成功创建权限",
		},
		400: {
			content: {
				"application/json": {
					schema: BaseErrorSchema,
				},
			},
			description: "请求参数错误",
		},
	},
});

rbacRouter.openapi(createPermissionRoute, async (c) => {
	const data = c.req.valid("json");
	const newPermission = await db.insert(permissions).values(data).returning();

	return c.json(
		{
			code: 200,
			msg: "Permission created successfully",
			data: newPermission[0],
		},
		200,
	);
});

export { rbacRouter };
