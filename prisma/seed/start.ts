import { PrismaClient } from '@prisma/client'
import { demoUser } from './user'


const prisma = new PrismaClient()

const main = async () => {
  await demoUser()
}
main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
  export { prisma };