import { drizzle } from 'drizzle-orm/node-postgres'

import { config } from 'dotenv'
import * as schema from './schema'
config({ path: '.dev.vars' })

export const dbClient = drizzle(process.env.DATABASE_URL!, { schema })
