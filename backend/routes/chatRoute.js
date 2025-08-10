import { Router } from "express";
const chatRoute = Router();
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();


chatRoute.get("/", (req, res) => {
    res.status(200).json({ message: "Authenticated" });
});

chatRoute.get("/messages/:chatid/:messageNum", async (req, res) => {
    const { chatid } = req.params
    const messages = await prisma.chat.findMany({
        where: { id: chatid },
        include: {
            chat: true
        }
    }
    )
    console.log()
    return res.status(200).json({ chat: messages[0].chat, senderName: messages[0].names.filter(name => name !== req.user.name) });
})

chatRoute.get("/chats/list", async (req, res) => {
    const id = req.user.id
    const chats = await prisma.chat.findMany({
        where: { users: { some: { id: id } } },
        include: {
            users: true
        }
    })
    console.log(chats)
    const updatedChat = chats.map(chat => ({
        ...chat,
        names: chat.names.filter(name => name !== req.user.name)
    }))
    return res.status(200).json({ chats: updatedChat });
});

chatRoute.post("/start/:userId", async (req, res) => {
    const { userId } = req.params
    const reqUser = await prisma.user.findFirst({ where: { id: req.user.id } })
    const user = await prisma.user.findFirst({ where: { id: userId } })
    if (!user || !reqUser) {
        return res.status(400).json({ message: "User not found" });
    }
    const checkChat = await prisma.chat.findFirst({ where: { users: { some: { id: userId } }, users: { some: { id: req.user.id } } } })
    if (checkChat) {
        return res.status(400).json({ message: "Chat already exists" });
    }
    const chat = await prisma.chat.create({ data: { users: { connect: [{ id: userId }, { id: req.user.id }] }, names: { set: [user.name, reqUser.name] } } })

    return res.status(200).json({ chat: chat });
})


export default chatRoute