import { OpenAPIHono } from '@hono/zod-openapi'
import { csrf } from 'hono/csrf'
import { cors } from 'hono/cors'
import { userRouter } from './module/users/users'
import { albumRouter } from './module/albums/albums'
import { authRouter } from './module/auth/auth'

import { logger } from 'hono/logger'
import { requestId } from 'hono/request-id'
import { authMiddleware } from './middleware/auth-middleware'
import { taskRouter } from './module/tasks/tasks'
import { apiReference } from '@scalar/hono-api-reference'
import { showRoutes } from 'hono/dev'
const app = new OpenAPIHono<HonoEnvType>().basePath('/api')

app.get('/', (c) => {
  return c.text(`Your request id is ${c.get('requestId')}`)
})

app.doc('/doc', {
  openapi: '3.0.0',
  info: {
    title: 'API Documentation',
    version: '1.0.0',
    description: 'Complete API documentation for all routes',
  },
  servers: [
    {
      url: 'http://localhost:8787',
      description: 'Development server',
    },
  ],
})

app.get(
  '/reference',
  apiReference({
    spec: {
      url: 'http://localhost:8787/api/doc',
    },
  }),
)

app.use('*', logger())
app.use('*', csrf())
app.use('*', cors())
app.use('*', requestId())
app.use('*', authMiddleware)

app.route(`/auth`, authRouter)
app.route(`/albums`, albumRouter)
app.route(`/users`, userRouter)
app.route(`/tasks`, taskRouter)

showRoutes(app)
export default {
  ...app,
  fetch: app.fetch,
}
