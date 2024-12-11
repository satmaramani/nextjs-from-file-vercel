const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');

const prisma = new PrismaClient();

async function addUser(email, password, name) {
  // Hash the password before storing it in the database
  const hashedPassword = bcrypt.hashSync(password, 10);

  // Create a new user in the database
  const newUser = await prisma.user.create({
    data: {
      email: email,
      password: hashedPassword,
      name: name,
    },
  });

  console.log('New User Created:', newUser);
}

// Example usage
addUser('samnew1@example.com', 'password123', 'John Doe')
  .catch((e) => {
    throw e
  })
  .finally(async () => {
    await prisma.$disconnect();
  });