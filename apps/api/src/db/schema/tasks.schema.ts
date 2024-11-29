
import { pgEnum, pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core'
import { TaskLabelEnum, TaskPriorityEnum, TaskStatusEnum } from '@/module/tasks/enums'
import { createInsertSchema, createSelectSchema } from 'drizzle-zod'

export const taskStatusEnum = pgEnum('task_status', TaskStatusEnum)
export const taskPriorityEnum = pgEnum('task_priority', TaskPriorityEnum)
export const taskLabelEnum = pgEnum('task_label', TaskLabelEnum)

// Task table
export const tasks = pgTable('tasks', {
  id: uuid('id').primaryKey().defaultRandom(),
  title: text('title').notNull(),
  status: taskStatusEnum().notNull().default(TaskStatusEnum[0]),
  label: taskLabelEnum().notNull().default(TaskLabelEnum[0]),
  priority: taskPriorityEnum('priority').notNull().default(TaskPriorityEnum[0]),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at')
    .notNull()
    .$onUpdate(() => new Date()),
})

export type Task = typeof tasks.$inferSelect
export type NewTask = typeof tasks.$inferInsert
export const insertTaskSchema = createInsertSchema(tasks)
export const selectTaskSchema = createSelectSchema(tasks)
