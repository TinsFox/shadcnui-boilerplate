import { z } from "zod"

export const albumSchema = z.object({
  id: z.string(),
  title: z.string(),
  url: z.string(),
  slogan: z.string(),
  updatedAt: z.date(),
  digitalDownloads: z.number(),
  artist: z.string(),
  year: z.number(),
  genre: z.string(),
  tracks: z.number(),
  duration: z.string(),
  price: z.number(),
  rating: z.number(),
  coverUrl: z.string(),
})

export type IAlbum = z.infer<typeof albumSchema>
