import { db } from "@/db";
import {
	insertPermissionSchema,
	insertRoleSchema,
	roles,
	selectPermissionSchema,
	selectRoleSchema,
} from "@/db/schema/rbac.schema";
import { permissions } from "@/db/schema/rbac.schema";
import { Hono } from "hono";
import { describeRoute } from "hono-openapi";
import { resolver, validator as zValidator } from "hono-openapi/zod";
import { z } from "zod";

const rbacRouter = new Hono();

// Get all roles
rbacRouter.get(
	"/roles",
	describeRoute({
		tags: ["RBAC"],
		summary: "Get all roles",
		security: [{ bearer: [] }],
		responses: {
			200: {
				description: "Successfully retrieved roles list",
				content: {
					"application/json": {
						schema: resolver(z.array(selectRoleSchema)),
					},
				},
			},
		},
	}),
	async (c) => {
		const allRoles = await db.query.roles.findMany();
		return c.json(allRoles);
	},
);

// Create new role
rbacRouter.post(
	"/roles",
	describeRoute({
		tags: ["RBAC"],
		summary: "Create a new role",
		security: [{ bearer: [] }],
		responses: {
			201: {
				description: "Role created successfully",
				content: {
					"application/json": {
						schema: resolver(selectRoleSchema),
					},
				},
			},
		},
	}),
	zValidator("json", insertRoleSchema),
	async (c) => {
		const role = c.req.valid("json");
		const [newRole] = await db.insert(roles).values(role).returning();
		return c.json(newRole, 201);
	},
);

// Get all permissions
rbacRouter.get(
	"/permissions",
	describeRoute({
		tags: ["RBAC"],
		summary: "Get all permissions",
		security: [{ bearer: [] }],
		responses: {
			200: {
				description: "Successfully retrieved permissions list",
				content: {
					"application/json": {
						schema: resolver(z.array(selectPermissionSchema)),
					},
				},
			},
		},
	}),
	async (c) => {
		const allPermissions = await db.query.permissions.findMany();
		return c.json(allPermissions);
	},
);

// Create new permission
rbacRouter.post(
	"/permissions",
	describeRoute({
		tags: ["RBAC"],
		summary: "Create a new permission",
		security: [{ bearer: [] }],
		responses: {
			201: {
				description: "Permission created successfully",
				content: {
					"application/json": {
						schema: resolver(selectPermissionSchema),
					},
				},
			},
		},
	}),
	zValidator("json", insertPermissionSchema),
	async (c) => {
		const permission = c.req.valid("json");
		const [newPermission] = await db
			.insert(permissions)
			.values(permission)
			.returning();
		return c.json(newPermission, 201);
	},
);

export { rbacRouter };
