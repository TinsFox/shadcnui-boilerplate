import { drizzle } from 'drizzle-orm/neon-http'

import { neon } from '@neondatabase/serverless'
import * as schema from './schema'

export const dbClientInWorker = (DATABASE_URL: string) => {

  const sql = neon(DATABASE_URL)
  return drizzle(sql, { schema, logger: true })
}
