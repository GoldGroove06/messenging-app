import { Router } from "express";
const friendsRoute = Router()
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();


friendsRoute.get("/list",async (req, res) => {
     const id = req.user.id
     console.log(id)
     const friends = await prisma.user.findMany({where: {id: id},
     include: {
      friends: true, 
      friendsOf: true,  
      chats: true 
    },})

     return res.status(200).json({ friends: friends[0].friends });
});



export default friendsRoute