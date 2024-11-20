import bcrypt from 'bcryptjs'

export function hashPassword(password: string) {
  if (!password) {
    throw new Error('Password is required')
  }
  return bcrypt.hashSync(password, 10)
}

export function comparePassword(password: string, hash: string) {
  return bcrypt.compareSync(password, hash)
}
