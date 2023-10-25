import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export const demoUser = async () => {
 await prisma.demoUser.createMany({
    data: [
      {
        userName: 'Admin2',
        email: 'admin2@example.com',
        password: "1234",
      },
      {
        userName: 'Driver',
        email: 'admin5@example.com',
        password: "12345",
      },
      
    ],
  })
}
