import { Router } from "express";
const chatRoute = Router();
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();


chatRoute.get("/", (req, res) => {
    res.status(200).json({ message: "Authenticated" });
});

chatRoute.get("/messages/:messageNum", async (req, res) => {
    const messages = await prisma.message
})


export default chatRoute