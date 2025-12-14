import { prisma } from "../database/index.js"

export async function createUserService(name: string, email: string) {
  return prisma.user.create({
    data: { name, email }
  })
}

export async function listUsersService() {
  return prisma.user.findMany()
}
