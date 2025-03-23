import {
	TaskLabelEnum,
	TaskPriorityEnum,
	TaskStatusEnum,
} from "@/module/tasks/enums";
import { pgTable, text, timestamp, uuid, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";

// Task table
export const tasks = pgTable("tasks", {
	id: uuid("id").primaryKey().defaultRandom(),
	title: text("title").notNull(),
	status: varchar().notNull().default(TaskStatusEnum[0]),
	label: varchar().notNull().default(TaskLabelEnum[0]),
	priority: varchar("priority").notNull().default(TaskPriorityEnum[0]),
	createdAt: timestamp("created_at").notNull().defaultNow(),
	updatedAt: timestamp("updated_at")
		.notNull()
		.$onUpdate(() => new Date()),
});

export type Task = typeof tasks.$inferSelect;
export type NewTask = typeof tasks.$inferInsert;
export const insertTaskSchema = createInsertSchema(tasks);
export const selectTaskSchema = createSelectSchema(tasks);
