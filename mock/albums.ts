import { faker } from "@faker-js/faker"

import type { IAlbum } from "@/schema/album"

export const albums: IAlbum[] = Array.from({ length: 100 }, () => ({
  id: faker.string.uuid(),
  title: faker.music.songName(),
  artist: faker.person.fullName(),
  year: faker.number.int({ min: 1950, max: 2023 }),
  genre: faker.music.genre(),
  coverUrl: faker.image.url(),
  tracks: faker.number.int({ min: 5, max: 20 }),
  duration: `${faker.number.int({ min: 30, max: 70 })}:${faker.number.int({ min: 10, max: 59 })}`,
  price: Number(faker.commerce.price({ min: 9.99, max: 39.99, dec: 2 })),
  rating: faker.number.float({ min: 1, max: 5, precision: 0.1 }),
  cover: faker.image.url(),
  url: faker.internet.url(),
  slogan: faker.company.catchPhrase(),
  updatedAt: faker.date.past(),
  digitalDownloads: faker.number.int({ min: 0, max: 1000000 }),
}))
