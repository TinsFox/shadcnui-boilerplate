import { z } from '@hono/zod-openapi'
import { TaskStatusEnumSchema, TaskPriorityEnumSchema, TaskLabelEnumSchema } from '@/module/tasks/enums'

// Query Parameters Schema
export const QuerySchema = z.object({
  page: z
    .string()
    .optional()
    .openapi({
      param: {
        name: 'page',
        in: 'query',
      },
      description: 'Page number',
      example: '1',
    }),
  pageSize: z
    .string()
    .optional()
    .openapi({
      param: {
        name: 'pageSize',
        in: 'query',
      },
      description: 'Items per page',
      example: '10',
    }),
  status: TaskStatusEnumSchema.optional().openapi({
    param: {
      name: 'status',
      in: 'query',
    },
    description: 'Filter by status',
  }),
  priority: TaskPriorityEnumSchema.optional().openapi({
    param: {
      name: 'priority',
      in: 'query',
    },
    description: 'Filter by priority',
  }),
})

// Route Parameters Schema
export const ParamsSchema = z.object({
  id: z
    .string()
    .uuid()
    .openapi({
      param: {
        name: 'id',
        in: 'path',
      },
      example: '123e4567-e89b-12d3-a456-426614174000',
    }),
})

// Add this new schema after the existing schemas
export const createTaskSchema = z.object({
  title: z.string().openapi({
    description: 'Task title',
    example: 'Implement new feature',
  }),
  status: TaskStatusEnumSchema.optional().openapi({
    description: 'Task status',
    example: 'TODO',
  }),
  label: TaskLabelEnumSchema.optional().openapi({
    description: 'Task label',
    example: 'FEATURE',
  }),
  priority: TaskPriorityEnumSchema.optional().openapi({
    description: 'Task priority',
    example: 'MEDIUM',
  }),
})

// You can also add a response schema if needed
export const taskResponseSchema = z.object({
  id: z.string().uuid().openapi({
    description: 'Task ID',
    example: '123e4567-e89b-12d3-a456-426614174000',
  }),
  title: z.string().openapi({
    description: 'Task title',
    example: 'Implement new feature',
  }),
  status: TaskStatusEnumSchema.openapi({
    description: 'Task status',
    example: 'TODO',
  }),
  label: TaskLabelEnumSchema.openapi({
    description: 'Task label',
    example: 'FEATURE',
  }),
  priority: TaskPriorityEnumSchema.openapi({
    description: 'Task priority',
    example: 'MEDIUM',
  }),
  createdAt: z.string().datetime().openapi({
    description: 'Task creation timestamp',
    example: '2024-03-15T10:00:00Z',
  }),
  updatedAt: z.string().datetime().openapi({
    description: 'Task last update timestamp',
    example: '2024-03-15T10:00:00Z',
  }),
})
