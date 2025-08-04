import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

const names = ["Alice", "Bob", "Charlie", "David", "Eva", "Frank", "Grace", "Helen", "Ian", "Jane"];
const randomBool = () => Math.random() < 0.5;
const randomMessage = () => {
  const messages = [
    "Hello!",
    "What's going on?",
    "Any updates?",
    "This feature is awesome!",
    "Deploy is done.",
    "Working on the fix.",
    "Meet at 5 PM.",
    "Push your changes.",
    "All tests passing!",
    "Let's go live!"
  ];
  return messages[Math.floor(Math.random() * messages.length)];
};

async function main() {
  console.log("🌱 Seeding database...");

  // Clean existing data
  await prisma.message.deleteMany();
  await prisma.chat.deleteMany();
  await prisma.user.deleteMany();

  // 1️⃣ Create Users
  const users = [];
  for (let i = 0; i < 10; i++) {
    const name = names[i];
    const email = `${name.toLowerCase()}@app.com`;
    const username = `${name.toLowerCase()}${i}`;
    const passwordHash = await bcrypt.hash("password123", 10);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        username,
        password: passwordHash,
        online: randomBool(),
      },
    });

    users.push(user);
  }

  // 2️⃣ Create Friendships (each user friends with next 2 users in array)
  for (let i = 0; i < users.length; i++) {
    const u = users[i];
    const friendsToAdd = [users[(i + 1) % users.length], users[(i + 2) % users.length]];

    await prisma.user.update({
      where: { id: u.id },
      data: {
        friends: { connect: friendsToAdd.map((f) => ({ id: f.id })) },
      },
    });
  }

  // 3️⃣ Create Chats (5 chats, each with random 3-5 members)
  const chats = [];
  for (let i = 1; i <= 5; i++) {
    const shuffled = [...users].sort(() => 0.5 - Math.random());
    const members = shuffled.slice(0, Math.floor(Math.random() * 3) + 3);
    const memberNames = members.map((m) => m.name);

    const chat = await prisma.chat.create({
      data: {
        names: memberNames, // Array of member names
        users: { connect: members.map((m) => ({ id: m.id })) },
      },
    });

    chats.push({ chat, members });
  }

  // 4️⃣ Create Messages for Each Chat
  for (const { chat, members } of chats) {
    for (let i = 0; i < 10; i++) {
      const sender = members[Math.floor(Math.random() * members.length)];

      await prisma.message.create({
        data: {
          text: randomMessage(),
          senderId: sender.id,
          senderName: sender.name,
          chatId: chat.id,
          read: randomBool(),
          notification: randomBool(),
        },
      });
    }
  }

  console.log("✅ Seeding completed successfully!");
}

main()
  .catch((e) => {
    console.error("❌ Seeding failed", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
  