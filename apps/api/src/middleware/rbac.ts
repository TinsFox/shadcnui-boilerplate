import { db } from "@/db";
import {
	permissions,
	rolePermissions,
	userRoles,
} from "@/db/schema/rbac.schema";
import { users } from "auth-schema";
import { and, eq, inArray } from "drizzle-orm";
import type { MiddlewareHandler } from "hono";

export interface RBACOptions {
	resource: string;
	action: string;
}

/**
 * RBAC 权限检查中间件
 * @param options RBAC 配置选项
 * @returns Hono 中间件处理函数
 */
export const rbac = (options: RBACOptions): MiddlewareHandler => {
	return async (c, next) => {
		const user = c.get("user");

		if (!user) {
			return c.json(
				{
					code: 401,
					msg: "Unauthorized",
				},
				401,
			);
		}

		// 1. 获取用户的所有角色
		const userRoleRecords = await db.query.userRoles.findMany({
			where: eq(userRoles.userId, user.id),
			with: {
				role: true,
			},
		});

		if (!userRoleRecords.length) {
			return c.json(
				{
					code: 403,
					msg: "No roles assigned",
				},
				403,
			);
		}

		const roleIds = userRoleRecords.map((ur) => ur.roleId);

		// 2. 获取这些角色的所有权限
		const rolePermissionRecords = await db.query.rolePermissions.findMany({
			where: and(
				inArray(rolePermissions.roleId, roleIds),
				eq(permissions.resource, options.resource),
				eq(permissions.action, options.action),
				eq(permissions.isActive, true),
			),
			with: {
				permission: true,
			},
		});

		// 3. 检查是否有所需权限
		const hasPermission = rolePermissionRecords.length > 0;

		if (!hasPermission) {
			return c.json(
				{
					code: 403,
					msg: "Insufficient permissions",
				},
				403,
			);
		}

		// 有权限，继续处理请求
		await next();
	};
};

/**
 * 检查用户是否为管理员中间件
 */
export const isAdmin: MiddlewareHandler = async (c, next) => {
	const user = c.get("user");

	if (!user) {
		return c.json(
			{
				code: 401,
				msg: "Unauthorized",
			},
			401,
		);
	}

	const isUserAdmin = await db.query.users.findFirst({
		where: eq(users.id, user.id),
		columns: {
			role: true,
		},
	});

	if (isUserAdmin?.role !== "admin") {
		return c.json(
			{
				code: 403,
				msg: "Admin access required",
			},
			403,
		);
	}

	await next();
};
