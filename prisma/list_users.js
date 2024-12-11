const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function getUsers() {
    const users = await prisma.user.findMany();
    console.log(users); // This should return the users added to your database
  }
  
  getUsers()
    .catch((e) => {
      throw e
    })
    .finally(async () => {
      await prisma.$disconnect();
    });