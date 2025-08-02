import { body } from "express-validator";
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();


const usernameCheck = () => {
    return body("username").custom(async value => {
        console.log("working")
        const existingUser = await prisma.user.findMany({
            where: {
                username: value
            }
        })
        console.log(existingUser)
        if (existingUser[0]) {
          console.log("error")
          // Will use the below as the error message
          throw new Error('A user already exists with this e-mail address');
        }
      });
}


export default usernameCheck