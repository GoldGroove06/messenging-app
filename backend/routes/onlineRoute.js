import { Router } from "express";
const onlineRoute = Router()
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

onlineRoute.get('/ping', async (req, res) => {
    console.log("ping",req.user.id)
    await prisma.user.update({ where: { id: req.user.id }, data: { lastseen: new Date() } })
    return res.status(200);
})

export default onlineRoute