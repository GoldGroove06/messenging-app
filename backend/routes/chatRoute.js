import { Router } from "express";
const chatRoute = Router()


chatRoute.get("/", (req, res) => {
    res.status(200).json({ message: "Authenticated" });
});


export default chatRoute