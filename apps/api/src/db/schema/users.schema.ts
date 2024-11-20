// User table
import { numeric, pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core'
import { createInsertSchema, createSelectSchema } from 'drizzle-zod'

export const users = pgTable('User', {
  id: uuid('id').primaryKey().defaultRandom(),
  email: text('email').notNull().unique(),
  username: text('username').unique(),
  name: text('name'),
  avatar: text('avatar'),
  birthdate: text('birthdate'),
  bio: text('bio'),
  password: text('password').notNull(),
  registeredAt: timestamp('registeredAt').notNull().defaultNow(),
  status: text('status').notNull(),
  role: text('role').notNull(),
  amount: numeric('amount').notNull(),
  createdAt: timestamp('createdAt').notNull().defaultNow(),
  updatedAt: timestamp('updatedAt')
    .notNull()
    .$onUpdate(() => new Date()),
})

export type User = typeof users.$inferSelect
export type NewUser = typeof users.$inferInsert
export const insertUserSchema = createInsertSchema(users)
export const selectUserSchema = createSelectSchema(users)
