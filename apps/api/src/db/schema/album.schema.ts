import { createInsertSchema, createSelectSchema } from 'drizzle-zod'
import { integer, pgTable, text, timestamp, uuid, boolean, varchar } from 'drizzle-orm/pg-core'

// Album table
export const albumsTableSchema = pgTable('Album', {
  id: uuid('id').primaryKey().defaultRandom(),
  title: varchar('title', { length: 255 }).notNull(),
  artist: varchar('artist', { length: 255 }).notNull(),
  description: text('description'),
  coverUrl: varchar('cover_url', { length: 255 }),
  releaseDate: timestamp('release_date'),
  genre: varchar('genre', { length: 100 }),
  label: varchar('label', { length: 255 }),
  totalTracks: integer('total_tracks').default(0),
  playCount: integer('play_count').default(0),
  likeCount: integer('like_count').default(0),
  isPublished: boolean('is_published').default(false),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at')
    .notNull()
    .$onUpdate(() => new Date()),
})

export type AlbumType = typeof albumsTableSchema.$inferSelect
export type NewAlbumType = typeof albumsTableSchema.$inferInsert
export const createAlbumSchema = createInsertSchema(albumsTableSchema)
export const selectAlbumSchema = createSelectSchema(albumsTableSchema)
