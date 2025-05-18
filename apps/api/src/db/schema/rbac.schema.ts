import { boolean, pgTable, text, uuid } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { users } from "../../../auth-schema";

// 权限表
export const permissions = pgTable("permissions", {
	id: uuid("id").primaryKey().defaultRandom(),
	name: text("name").notNull().unique(), // 权限名称，如 "create:user", "read:user"
	description: text("description"), // 权限描述
	resource: text("resource").notNull(), // 资源类型，如 "user", "task"
	action: text("action").notNull(), // 操作类型，如 "create", "read", "update", "delete"
	isActive: boolean("is_active").default(true), // 权限是否启用
});

// 角色表
export const roles = pgTable("roles", {
	id: uuid("id").primaryKey().defaultRandom(),
	name: text("name").notNull().unique(), // 角色名称，如 "admin", "user"
	description: text("description"), // 角色描述
	isDefault: boolean("is_default").default(false), // 是否为默认角色
	isSystem: boolean("is_system").default(false), // 是否为系统角色（不可删除）
	isActive: boolean("is_active").default(true), // 角色是否启用
});

// 角色 - 权限关系表
export const rolePermissions = pgTable("role_permissions", {
	id: uuid("id").primaryKey().defaultRandom(),
	roleId: uuid("role_id")
		.notNull()
		.references(() => roles.id, { onDelete: "cascade" }),
	permissionId: uuid("permission_id")
		.notNull()
		.references(() => permissions.id, { onDelete: "cascade" }),
});

// 用户 - 角色关系表
export const userRoles = pgTable("user_roles", {
	id: uuid("id").primaryKey().defaultRandom(),
	userId: text("user_id")
		.notNull()
		.references(() => users.id, { onDelete: "cascade" }),
	roleId: uuid("role_id")
		.notNull()
		.references(() => roles.id, { onDelete: "cascade" }),
});

// 导出类型和 Schema
export type Permission = typeof permissions.$inferSelect;
export type NewPermission = typeof permissions.$inferInsert;
export type Role = typeof roles.$inferSelect;
export type NewRole = typeof roles.$inferInsert;

export const insertPermissionSchema = createInsertSchema(permissions);
export const selectPermissionSchema = createSelectSchema(permissions);
export const insertRoleSchema = createInsertSchema(roles);
export const selectRoleSchema = createSelectSchema(roles);
