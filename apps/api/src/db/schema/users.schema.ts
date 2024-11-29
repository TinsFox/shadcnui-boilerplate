
import { numeric, pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core'
import { createInsertSchema, createSelectSchema } from 'drizzle-zod'

// User table
export const users = pgTable('users', {
  id: uuid('id').primaryKey().defaultRandom(),
  email: text('email').notNull().unique(),
  username: text('username').unique(),
  name: text('name'),
  avatar: text('avatar'),
  birthdate: text('birthdate'),
  bio: text('bio'),
  password: text('password').notNull(),
  registeredAt: timestamp('registered_at').notNull().defaultNow(),
  status: text('status').notNull(),
  role: text('role').notNull(),
  amount: numeric('amount').notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at')
    .notNull()
    .$onUpdate(() => new Date()),
})

export type User = typeof users.$inferSelect
export type NewUser = typeof users.$inferInsert
export const insertUserSchema = createInsertSchema(users)
export const selectUserSchema = createSelectSchema(users)
