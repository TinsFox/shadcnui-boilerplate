import { z } from '@hono/zod-openapi'
import { createAlbumSchema, selectAlbumSchema } from '@/db/schema/album.schema'

// 更新专辑 Schema
export const updateAlbumSchema = createAlbumSchema
  .extend({
    title: z.string().openapi({
      description: 'Album title',
      example: 'Greatest Hits',
    }),
    artist: z.string().openapi({
      description: 'Artist name',
      example: 'John Doe',
    }),
    description: z.string().nullable().openapi({
      description: 'Album description',
      example: 'The best album of the year',
    }),
    coverUrl: z.string().nullable().openapi({
      description: 'Album cover URL',
      example: 'https://example.com/cover.jpg',
    }),
    releaseDate: z.date().nullable().openapi({
      description: 'Release date',
      example: '2024-03-20',
    }),
    genre: z.string().nullable().openapi({
      description: 'Music genre',
      example: 'Rock',
    }),
    label: z.string().nullable().openapi({
      description: 'Record label',
      example: 'Universal Music',
    }),
    totalTracks: z.number().openapi({
      description: 'Total number of tracks',
      example: 12,
    }),
    playCount: z.number().openapi({
      description: 'Total play count',
      example: 1000000,
    }),
    likeCount: z.number().openapi({
      description: 'Total likes',
      example: 50000,
    }),
    isPublished: z.boolean().openapi({
      description: 'Publication status',
      example: true,
    }),
  })
  .openapi('Album')

export const queryAlbumSchema = selectAlbumSchema.pick({ id: true }).extend({
  id: z
    .string()
    .uuid()
    .openapi({ param: { name: 'id', in: 'path' } }),
  title: z.string().optional().openapi({
    description: 'Album title',
    example: 'Greatest Hits',
  }),
  artist: z.string().optional().openapi({
    description: 'Artist name',
    example: 'John Doe',
  }),
  description: z.string().nullable().openapi({
    description: 'Album description',
    example: 'The best album of the year',
  }),
  coverUrl: z.string().optional().nullable().openapi({
    description: 'Album cover URL',
    example: 'https://example.com/cover.jpg',
  }),
  releaseDate: z.date().optional().nullable().openapi({
    description: 'Release date',
    example: '2024-03-20',
  }),
  genre: z.string().optional().nullable().openapi({
    description: 'Music genre',
    example: 'Rock',
  }),
  label: z.string().optional().nullable().openapi({
    description: 'Record label',
    example: 'Universal Music',
  }),
  totalTracks: z.number().optional().nullable().openapi({
    description: 'Total number of tracks',
    example: 12,
  }),
  playCount: z.number().optional().nullable().openapi({
    description: 'Total play count',
    example: 1000000,
  }),
  likeCount: z.number().optional().nullable().openapi({
    description: 'Total likes',
    example: 50000,
  }),
  isPublished: z.boolean().nullable().openapi({
    description: 'Publication status',
    example: true,
  }),
  createdAt: z.date().optional().openapi({
    description: 'Creation date',
    example: '2024-03-20',
  }),
  updatedAt: z.date().optional().openapi({
    description: 'Update date',
    example: '2024-03-20',
  }),
})
