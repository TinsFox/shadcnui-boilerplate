import { z } from '@hono/zod-openapi'

// 定义登录请求 Schema
export const LoginSchema = z
  .object({
    email: z.string().email().openapi({
      description: "User's email",
      example: 'user@example.com',
    }),
    password: z.string().min(1).openapi({
      description: "User's password",
      example: 'password123',
    }),
  })
  .openapi('Login')

// 定义注册请求 Schema
export const RegisterSchema = z
  .object({
    email: z.string().email().openapi({
      description: "User's email",
      example: 'user@example.com',
    }),
    password: z.string().min(6).openapi({
      description: "User's password",
      example: 'password123',
    }),
    username: z.string().optional().openapi({
      description: "User's username",
      example: 'johndoe',
    }),
    name: z.string().optional().openapi({
      description: "User's full name",
      example: 'John Doe',
    }),
  })
  .openapi('Register')

export const AuthResponseSchema = {
  success: z.object({
    code: z.number().openapi({
      description: 'Response status code',
      example: 200,
    }),
    msg: z.string().openapi({
      description: 'Response message',
      example: 'Success',
    }),
  }),
  error: z.object({
    code: z.number().openapi({
      description: 'Error code',
      example: 400,
    }),
    msg: z.string().openapi({
      description: 'Error message',
      example: 'Error occurred',
    }),
  }),
}
