import type { TimingVariables } from 'hono/timing'
import type { RequestIdVariables } from 'hono/request-id'
import type { JwtVariables } from 'hono/jwt'

export type Bindings = {
  COOKIE_KEY: string
  DATABASE_URL: string
  JWT_SECRET: string
}

export interface IPayload {
  sub: string
  role: string
  exp: number
}

export type JwtPayload = IPayload
declare global {
  interface HonoEnvType {
    Bindings: Bindings
    Variables: RequestIdVariables & TimingVariables & JwtVariables
  }
  namespace NodeJS {
    interface ProcessEnv {
      DATABASE_URL: string
    }
  }
}
