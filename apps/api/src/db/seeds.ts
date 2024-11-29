import { dbClient } from './client.node'
import { generateRandomTask, generateRandomTeamUser, generateRandomAlbum } from './utils'
import { hashPassword } from '../lib/crypto'
import { faker } from '@faker-js/faker'
import { NewUser, users } from '@/db/schema/users.schema'
import { NewAlbumType, albumsTableSchema } from '@/db/schema/album.schema'
import { NewTask, tasks } from '@/db/schema/tasks.schema'

export async function seedAdminUser() {
  const adminUser: NewUser[] = [
    {
      email: 'admin@shadcn.com',
      username: 'admin',
      name: 'Admin',
      avatar: faker.image.avatarGitHub(),
      birthdate: faker.date.birthdate().toISOString(),
      bio: faker.lorem.paragraph(),
      password: hashPassword('admin'),
      status: 'active',
      role: 'admin',
      amount: '1000',
    },
    {
      email: 'user@shadcn.com',
      username: 'user',
      name: 'User',
      avatar: faker.image.avatarGitHub(),
      birthdate: faker.date.birthdate().toISOString(),
      bio: faker.lorem.paragraph(),
      password: hashPassword('user'),
      status: 'active',
      role: 'member',
      amount: '1000',
    },
    {
      email: 'guest@shadcn.com',
      username: 'guest',
      name: 'Guest',
      avatar: faker.image.avatarGitHub(),
      birthdate: faker.date.birthdate().toISOString(),
      bio: faker.lorem.paragraph(),
      password: hashPassword('guest'),
      status: 'active',
      role: 'guest',
      amount: '1000',
    },
  ]
  try {
    await dbClient.delete(users)
    console.log('📝 Inserting admin user', adminUser.length)
    await dbClient.insert(users).values(adminUser)
  } catch (err) {
    console.error(err)
  }
}

export async function seedUsers(input: { count: number }) {
  const count = input.count ?? 100

  try {
    const allUsers: NewUser[] = []

    for (let i = 0; i < count; i++) {
      allUsers.push(generateRandomTeamUser())
    }

    console.log('📝 Inserting users', allUsers.length)

    await dbClient.insert(users).values(allUsers).onConflictDoNothing()
  } catch (err) {
    console.error(err)
  }
}
export async function seedTasks(input: { count: number }) {
  const count = input.count ?? 100

  try {
    const allTasks: NewTask[] = []

    for (let i = 0; i < count; i++) {
      allTasks.push(generateRandomTask())
    }

    await dbClient.delete(tasks)

    console.log('📝 Inserting tasks', allTasks.length)

    await dbClient.insert(tasks).values(allTasks).onConflictDoNothing()
  } catch (err) {
    console.error(err)
  }
}

export async function seedAlbums(input: { count: number }) {
  const count = input.count ?? 100

  try {
    const allAlbums: NewAlbumType[] = []

    for (let i = 0; i < count; i++) {
      allAlbums.push(generateRandomAlbum())
    }

    await dbClient.delete(albumsTableSchema)

    console.log('📝 Inserting albums', allAlbums.length)

    await dbClient.insert(albumsTableSchema).values(allAlbums).onConflictDoNothing()
  } catch (err) {
    console.error(err)
  }
}
