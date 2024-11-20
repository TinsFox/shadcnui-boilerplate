import { drizzle } from 'drizzle-orm/neon-http'

import { neon } from '@neondatabase/serverless'
import { config } from 'dotenv'
import * as schema from './schema'
config({ path: '../../.dev.vars' })

export const dbClient = drizzle(process.env.DATABASE_URL!, { schema })

export const dbClientInWorker = (DATABASE_URL: string) => {
  const sql = neon(DATABASE_URL)
  return drizzle(sql, { schema, logger: true })
}
