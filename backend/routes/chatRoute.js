import { Router } from "express";
const chatRoute = Router();
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();


chatRoute.get("/", (req, res) => {
    res.status(200).json({ message: "Authenticated" });
});

chatRoute.get("/messages/:chatid/:messageNum", async (req, res) => {
    const {chatid} = req.params
    const messages = await prisma.chat.findMany({where: {id: chatid},
        
            include: {
                chat: true
            }
    }
    )
    console.log(messages[0])
    return res.status(200).json({chat:messages[0].chat, senderName: messages[0].names}  );
})

chatRoute.get("/chats/list", async (req, res) => {
    const id = req.user.id
    console.log(id)
   const chats = await prisma.chat.findMany({where: {users: {some: {id: id}}},
       include: {
           users: true
       }
   })

    return res.status(200).json({ chats: chats });
});

chatRoute.post("/start/:userId", async (req, res) => {
    const {userId} = req.params
    const chat = await prisma.chat.create({data: {users: {connect: {id: userId}}}})
    console.log(chat)
    return res.status(200).json({ chat: chat });
})


export default chatRoute