import { OpenAPIHono, createRoute } from '@hono/zod-openapi'
import { dbClientInWorker } from '@/db/client.serverless'
import { count, eq } from 'drizzle-orm'
import { createTaskSchema, ParamsSchema } from './schema'

import {
  BaseDetailSchema,
  BaseErrorSchema,
  BasePaginationSchema,
  BasePaginateQuerySchema,
  BaseSuccessSchema,
} from '@/schema/base'
import { selectTaskSchema, tasks } from '@/db/schema/tasks.schema'

const taskRouter = new OpenAPIHono<HonoEnvType>()

// 获取任务列表路由
const listTasksRoute = createRoute({
  method: 'get',
  path: '',
  tags: ['Tasks'],
  summary: 'Get task list',
  description: 'Retrieve a paginated list of tasks with optional status and priority filters',
  request: {
    query: BasePaginateQuerySchema.merge(selectTaskSchema.partial()),
  },
  responses: {
    200: {
      content: {
        'application/json': {
          schema: BasePaginationSchema(createTaskSchema),
        },
      },
      description: 'Successfully retrieved tasks',
    },
  },
})

// 创建任务路由
const createTaskRoute = createRoute({
  method: 'post',
  path: '',
  tags: ['Tasks'],
  summary: 'Create new task',
  description: 'Create a new task with the provided information',
  request: {
    body: {
      content: {
        'application/json': {
          schema: createTaskSchema,
        },
      },
    },
  },
  responses: {
    200: {
      content: {
        'application/json': {
          schema: BaseDetailSchema(selectTaskSchema),
        },
      },
      description: 'Task created successfully',
    },
    400: {
      content: {
        'application/json': {
          schema: BaseErrorSchema,
        },
      },
      description: 'Invalid input',
    },
  },
})

// 更新任务路由
const updateTaskRoute = createRoute({
  method: 'put',
  path: '/{id}',
  tags: ['Tasks'],
  summary: 'Update task',
  description: 'Update an existing task by ID',
  request: {
    params: ParamsSchema,
    body: {
      content: {
        'application/json': {
          schema: createTaskSchema.partial(),
        },
      },
    },
  },
  responses: {
    200: {
      content: {
        'application/json': {
          schema: BaseSuccessSchema,
        },
      },
      description: 'Task updated successfully',
    },
    404: {
      content: {
        'application/json': {
          schema: BaseErrorSchema,
        },
      },
      description: 'Task not found',
    },
  },
})

// 删除任务路由
const deleteTaskRoute = createRoute({
  method: 'delete',
  path: '/{id}',
  tags: ['Tasks'],
  summary: 'Delete task',
  description: 'Delete an existing task by ID',
  request: {
    params: ParamsSchema,
  },
  responses: {
    200: {
      content: {
        'application/json': {
          schema: BaseSuccessSchema,
        },
      },
      description: 'Task deleted successfully',
    },
    404: {
      content: {
        'application/json': {
          schema: BaseErrorSchema,
        },
      },
      description: 'Task not found',
    },
  },
})

// 实现获取任务列表
taskRouter.openapi(listTasksRoute, async (c) => {
  const { page, pageSize } = c.req.valid('query')

  const db = dbClientInWorker(c.env.DATABASE_URL)
  const data = await db
    .select()
    .from(tasks)
    .offset((page) * pageSize)
  const totalResult = await db.select({ count: count() }).from(tasks)

  return c.json({
    code: 200,
    msg: 'Get task list success',
    list: data,
    total: Number(totalResult[0].count),
    page,
    pageSize,
    totalPages: Math.ceil(Number(totalResult[0].count) / pageSize),
  })
})

// 实现创建任务
taskRouter.openapi(createTaskRoute, async (c) => {
  const data = c.req.valid('json')

  const [task] = await dbClientInWorker(c.env.DATABASE_URL)
    .insert(tasks)
    .values({
      ...data,
    })
    .returning()

  return c.json(
    {
      code: 200,
      msg: 'Create task success',
      data: task,
    },
    200,
  )
})

taskRouter.openapi(updateTaskRoute, async (c) => {
  const { id } = c.req.valid('param')
  const updateData = c.req.valid('json')

  const [existingTask] = await dbClientInWorker(c.env.DATABASE_URL).select().from(tasks).where(eq(tasks.id, id))

  if (!existingTask) {
    return c.json(
      {
        code: 404,
        msg: 'Task not found',
      },
      404,
    )
  }

  await dbClientInWorker(c.env.DATABASE_URL)
    .update(tasks)
    .set({
      ...updateData,
      updatedAt: new Date(),
    })
    .where(eq(tasks.id, id))

  return c.json({
    code: 200,
    msg: 'Update task success',
  })
})

// 实现删除任务
taskRouter.openapi(deleteTaskRoute, async (c) => {
  const { id } = c.req.valid('param')

  const [existingTask] = await dbClientInWorker(c.env.DATABASE_URL).select().from(tasks).where(eq(tasks.id, id))

  if (!existingTask) {
    return c.json(
      {
        code: 404,
        msg: 'Task not found',
      },
      404,
    )
  }

  await dbClientInWorker(c.env.DATABASE_URL).delete(tasks).where(eq(tasks.id, id))

  return c.json({
    code: 200,
    msg: 'Delete task success',
  })
})

export { taskRouter }
