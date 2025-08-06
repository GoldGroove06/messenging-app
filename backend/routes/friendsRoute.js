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

friendsRoute.post("/add/:userId", async (req, res) => {
     const {userId} = req.params
     const friends = await prisma.user.findFirst({where: {id: req.user.id, friends: {some: {id: userId}}}})
     if (friends) {
          return res.status(400).json({ message: "Already friends" });
     }
     else if (!friends) {
          await prisma.user.update({where: {id: req.user.id}, data: {friends: {connect: {id: userId}}}})
          await prisma.user.update({where: {id: userId}, data: {friendsOf: {connect: {id: req.user.id}}}})
          return res.status(200).json({ message: "Added friend" });
     }
     return res.status(400).json({ message: "Something went wrong" });
})

friendsRoute.post("/remove/:userId", async (req, res) => {
     const {userId} = req.params
     const friends = await prisma.user.findFirst({where: {id: req.user.id, friends: {some: {id: userId}}}})
     if (!friends) {
          return res.status(400).json({ message: "Not friend" });
     }
     else if (friends) {
          await prisma.user.update({where: {id: req.user.id}, data: {friends: {disconnect: {id: userId}}}})
          await prisma.user.update({where: {id: userId}, data: {friendsOf: {disconnect: {id: req.user.id}}}})
          return res.status(200).json({ message: "Deleted friend" });
     }
     return res.status(400).json({ message: "Something went wrong" });
})

friendsRoute.get("/search/:username", async (req,res) => {
     const {username} = req.params
     const user = await prisma.user.findFirst({where:{username: username}})
     if (user) {
          return res.status(200).json({user: user})
     }
     else if (!user) {
          return res.status(400).json({ message: "User not found" });
     }

     return res.status(400).json({ message: "Something went wrong" });
})

export default friendsRoute