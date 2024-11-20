import { z } from 'zod'

export const TaskStatusEnum = ['TODO', 'IN_PROGRESS', 'DONE', 'CANCELLED'] as const

export const TaskStatusEnumSchema = z.enum(TaskStatusEnum)
export type TaskStatusType = z.infer<typeof TaskStatusEnumSchema>

export const TaskPriorityEnum = ['LOW', 'MEDIUM', 'HIGH', 'URGENT'] as const
export const TaskPriorityEnumSchema = z.enum(TaskPriorityEnum)
export type TaskPriorityType = z.infer<typeof TaskPriorityEnumSchema>

export const TaskLabelEnum = ['BUG', 'FEATURE', 'IMPROVEMENT', 'DOCUMENTATION'] as const
export const TaskLabelEnumSchema = z.enum(TaskLabelEnum)
export type TaskLabelType = z.infer<typeof TaskLabelEnumSchema>
