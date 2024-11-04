import { z } from "zod"

export const albumSchema = z.object({
  id: z.string(),
  title: z.string(),
  cover: z.string(),
  url: z.string(),
  slogan: z.string(),
  updatedAt: z.date(),
  digitalDownloads: z.number(),
})

export type IAlbum = z.infer<typeof albumSchema>
