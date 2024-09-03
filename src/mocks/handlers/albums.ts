import { faker } from "@faker-js/faker"
import { http, HttpResponse } from "msw"

import type { IAlbum } from "@/models/album"

faker.seed(123)

const FakerAlbumList = Array.from({ length: 100 }, () => ({
  id: faker.string.uuid(),
  title: faker.music.songName(),
  cover: faker.image.url(),
  url: faker.internet.url(),
  slogan: faker.lorem.sentence(),
  updatedAt: faker.date.recent(),
  digitalDownloads: faker.number.float({ min: 10, max: 100, multipleOf: 0.02 }),
} as IAlbum))

const list = () => HttpResponse.json({
  list: FakerAlbumList,
})

export const albumHandles = [
  http.get("/api/albums", list),
  http.get("/api/albums?page=1", list),
  http.get("/api/album/", list),
]
