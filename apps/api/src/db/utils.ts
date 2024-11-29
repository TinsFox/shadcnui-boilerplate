import { faker } from '@faker-js/faker'

import { hashPassword } from '../lib/crypto'
import { TaskLabelEnum, TaskPriorityEnum, TaskStatusEnum } from '@/module/tasks/enums'
import { NewUser } from '@/db/schema/users.schema'
import { NewAlbumType } from '@/db/schema/album.schema'
import { Task } from '@/db/schema/tasks.schema'

export function generateRandomTask(): Task {
  return {
    id: faker.string.uuid(),
    title: faker.hacker.phrase(),
    status: faker.helpers.arrayElement(TaskStatusEnum),
    label: faker.helpers.arrayElement(TaskLabelEnum),
    priority: faker.helpers.arrayElement(TaskPriorityEnum),
    createdAt: new Date(),
    updatedAt: new Date(),
  }
}

export function generateRandomAlbum(): NewAlbumType {
  return {
    title: faker.music.songName(),
    artist: faker.person.fullName(),
    description: faker.lorem.paragraph(),
    coverUrl: faker.image.urlPicsumPhotos(),
    releaseDate: faker.date.past(),
    genre: faker.music.genre(),
    label: faker.company.name(),
    totalTracks: faker.number.int({ min: 1, max: 20 }),
    playCount: faker.number.int({ min: 0, max: 1000000 }),
    likeCount: faker.number.int({ min: 0, max: 100000 }),
    isPublished: faker.datatype.boolean(),
  }
}

export function generateRandomTeamUser(): NewUser {
  return {
    id: faker.string.uuid(),
    name: faker.person.fullName(),
    username: faker.internet.username(),
    email: faker.internet.email(),
    avatar: faker.image.avatar(),
    status: faker.helpers.arrayElement(['active', 'inactive', 'busy']),
    role: faker.helpers.arrayElement(['admin', 'member', 'guest']),
    bio: faker.lorem.paragraph(),
    amount: faker.number.int({ min: 0, max: 10000 }).toString(),
    createdAt: new Date(),
    updatedAt: new Date(),
    password: hashPassword(faker.internet.password()),
  } as NewUser
}
