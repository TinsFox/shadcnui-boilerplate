// Task table
import { pgEnum, pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core'
import { TaskLabelEnum, TaskPriorityEnum, TaskStatusEnum } from '@/module/tasks/enums'
import { createInsertSchema, createSelectSchema } from 'drizzle-zod'

const taskStatusEnum = pgEnum('taskStatus', TaskStatusEnum)
const taskPriorityEnum = pgEnum('taskPriority', TaskPriorityEnum)
const taskLabelEnum = pgEnum('taskLabel', TaskLabelEnum)

export const tasks = pgTable('Task', {
  id: uuid('id').primaryKey().defaultRandom(),
  title: text('title').notNull(),
  status: taskStatusEnum('status').notNull().default('TODO'),
  label: taskLabelEnum('label').notNull().default('FEATURE'),
  priority: taskPriorityEnum('priority').notNull().default('MEDIUM'),
  createdAt: timestamp('createdAt').notNull().defaultNow(),
  updatedAt: timestamp('updatedAt')
    .notNull()
    .$onUpdate(() => new Date()),
})

export type Task = typeof tasks.$inferSelect
export type NewTask = typeof tasks.$inferInsert
export const insertTaskSchema = createInsertSchema(tasks)
export const selectTaskSchema = createSelectSchema(tasks)
