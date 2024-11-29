import { OpenAPIHono, createRoute, z } from '@hono/zod-openapi'
import { deleteCookie, getCookie, setCookie } from 'hono/cookie'
import { eq } from 'drizzle-orm'
import { sign } from 'hono/jwt'
import { HTTPException } from 'hono/http-exception'
import { dbClientInWorker } from '../../db/client.serverless'
import { comparePassword, hashPassword } from '../../lib/crypto'
import { AuthResponseSchema, LoginSchema, RegisterSchema } from './schema'
import { users } from '@/db/schema/users.schema'

const authRouter = new OpenAPIHono<HonoEnvType>()

const loginRoute = createRoute({
  method: 'post',
  path: '/login',
  tags: ['Authentication'],
  summary: 'User login',
  description: 'Authenticate a user with email and password',
  request: {
    body: {
      content: {
        'application/json': {
          schema: LoginSchema,
        },
      },
    },
  },
  responses: {
    200: {
      content: {
        'application/json': {
          schema: AuthResponseSchema.success.extend({
            token: z.string().openapi({
              description: 'JWT token for authentication',
              example: 'eyJhbGciOiJIUzI1NiIs...',
            }),
          }),
        },
      },
      description: 'Login successful',
    },
    401: {
      content: {
        'application/json': {
          schema: AuthResponseSchema.error,
        },
      },
      description: 'Invalid credentials',
    },
  },
})

const registerRoute = createRoute({
  method: 'post',
  path: '/register',
  tags: ['Authentication'],
  summary: 'User registration',
  description: 'Register a new user account',
  request: {
    body: {
      content: {
        'application/json': {
          schema: RegisterSchema,
        },
      },
    },
  },
  responses: {
    200: {
      content: {
        'application/json': {
          schema: z.object({
            code: z.number().openapi({
              description: 'Response status code',
              example: 200,
            }),
            msg: z.string().openapi({
              description: 'Response message',
              example: 'Register success',
            }),
            user: z
              .object({
                id: z.string(),
                email: z.string(),
                username: z.string().optional(),
                name: z.string().optional(),
                createdAt: z.string(),
                updatedAt: z.string(),
              })
              .openapi({
                description: 'Registered user information',
              }),
          }),
        },
      },
      description: 'Registration successful',
    },
    400: {
      content: {
        'application/json': {
          schema: z.object({
            code: z.number().openapi({
              description: 'Error code',
              example: 400,
            }),
            msg: z.string().openapi({
              description: 'Error message',
              example: 'Email already exists',
            }),
          }),
        },
      },
      description: 'Invalid registration data or email already exists',
    },
  },
})

const logoutRoute = createRoute({
  method: 'post',
  path: '/logout',
  tags: ['Authentication'],
  summary: 'User logout',
  description: 'Logout current user and invalidate session',
  security: [{ BearerAuth: [] }],
  responses: {
    200: {
      content: {
        'application/json': {
          schema: z.object({
            code: z.number().openapi({
              description: 'Response status code',
              example: 200,
            }),
            msg: z.string().openapi({
              description: 'Response message',
              example: 'Logout success',
            }),
          }),
        },
      },
      description: 'Logout successful',
    },
  },
})

authRouter.openapi(loginRoute, async (c) => {
  const { email, password } = c.req.valid('json')

  const [user] = await dbClientInWorker(c.env.DATABASE_URL).select().from(users).where(eq(users.email, email))

  if (!user) {
    throw new HTTPException(401, { message: 'Invalid email or password' })
  }

  const isValidPassword = comparePassword(password, user.password)
  if (!isValidPassword) {
    throw new HTTPException(401, { message: 'Invalid email or password' })
  }

  const token = await sign({ sub: user.id }, c.env.JWT_SECRET)
  setCookie(c, c.env.COOKIE_KEY, token, {
    secure: true,
    httpOnly: true,
    sameSite: 'Lax',
  })

  return c.json({
    code: 200,
    msg: 'Login success',
    token,
  })
})

authRouter.openapi(registerRoute, async (c) => {
  const data = c.req.valid('json')

  const [existingUser] = await dbClientInWorker(c.env.DATABASE_URL)
    .select()
    .from(users)
    .where(eq(users.email, data.email))

  if (existingUser) {
    return c.json(
      {
        code: 400,
        msg: 'Email already exists',
      },
      400,
    )
  }

  const hashedPassword = hashPassword(data.password)
  const [dbUser] = await dbClientInWorker(c.env.DATABASE_URL)
    .insert(users)
    .values({
      ...data,
      status: 'active',
      role: 'user',
      amount: '0',
      password: hashedPassword,
    })
    .returning()

  // 转换用户数据以匹配 schema 定义
  const user = {
    id: dbUser.id,
    email: dbUser.email,
    username: dbUser.username || undefined,
    name: dbUser.name || undefined,
    createdAt: dbUser.createdAt.toISOString(),
    updatedAt: dbUser.updatedAt.toISOString(),
  }

  return c.json(
    {
      code: 200,
      msg: 'Register success',
      user,
    },
    200,
  )
})

authRouter.openapi(logoutRoute, async (c) => {
  const token = getCookie(c, c.env.COOKIE_KEY)
  if (token) {
    deleteCookie(c, c.env.COOKIE_KEY)
  }
  return c.json({
    code: 200,
    msg: 'Logout success',
  })
})

export { authRouter }
