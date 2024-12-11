import { PrismaClient, User } from '@prisma/client';

const prisma = new PrismaClient();

prisma.user.findMany()
    .then((users: User[]) => {  // Explicitly type 'users' as an array of User
        console.log(users);  // Now TypeScript knows it's an array of 'User' type
    })
    .catch((err) => {
        console.error(err);
    })
    .finally(async () => {
        await prisma.$disconnect();  // Disconnect Prisma client when done
    });