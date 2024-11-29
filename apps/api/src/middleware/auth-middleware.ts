import { jwt } from 'hono/jwt'
import { Context, Next } from 'hono'

const authWhiteList = ['/api/auth/login', '/api/auth/register', '/api/seed', '/reference', '/doc']

export const authMiddleware = (c: Context, next: Next) => {
  if (authWhiteList.length === 0) {
    return next()
  }
  if (authWhiteList.includes(c.req.path)) {
    return next()
  }
  const jwtMiddleware = jwt({
    secret: c.env.JWT_SECRET,
    cookie: c.env.COOKIE_KEY,
  })
  return jwtMiddleware(c, next)
}
