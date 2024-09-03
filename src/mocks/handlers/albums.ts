import { faker } from "@faker-js/faker"
import { delay, http, HttpResponse } from "msw"

interface IAlbum {
  id: number
  title: string
  cover: string
  url: string
}

faker.seed(123)
const list = () => HttpResponse.json({
  data: {
    list: Array.from({ length: 10 }, () => ({
      id: faker.number.int(),
      title: faker.music.songName(),
      cover: faker.image.url(),
      url: faker.internet.url(),
    })),
  },
})
export const albumHandles = [
  http.get("/api/albums", list),
  // http.get("/api/albums", () => HttpResponse.json({
  //   data: {
  //     list: Array.from({ length: 10 }, () => ({
  //       id: faker.number.int(),
  //       title: faker.music.songName(),
  //       cover: faker.image.url(),
  //       url: faker.internet.url(),
  //     })),
  //   },
  // })),
]
