import pkg from 'jsonwebtoken';
const { sign } = pkg;
const secret = 'a santa at nasa';
import { compare } from 'bcrypt';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function postSignin(req, res) {
    const { email, password } = req.body
    try {
        const user = await prisma.user.findMany({
            where: {
                email: email
            }
        });
        if (!user[0]) res.status(400).json({ message: "No user found" });
        const isMatch = await compare(password, user[0].password);
        if (!isMatch) res.status(400).json({ message: "Incorrect password" });
        const token = sign({ id: user[0].id, email: user[0].email }, secret, {
            expiresIn: '1h'
        });

        res.cookie('token', token, {
            httpOnly: true,
            secure: false, // set to true in production with HTTPS
            sameSite: 'lax',
            maxAge: 3600000
        });

        return res.json({ message: 'Logged in' });
    }
    catch (error) {
        console.error(error)
        console.log("error in PostSigin")
    }
}

export default postSignin 