import { Router } from "express";
const authRoute = Router()
import postSignin from "../controllers/signinController.js";
import postSignup from "../controllers/signupController.js";
import emailCheck from "../validators/createUserEmailValidator.js";
import usernameCheck from "../validators/createUserNameValidator.js";
import { validationResult } from "express-validator";


authRoute.post("/signin", postSignin)


authRoute.post("/check/username", usernameCheck(), (req, res) => {
    const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({ error: "username not available" });
        }
    return res.status(200).json({ message: "username available"})
})
authRoute.post("/check/email", emailCheck(), (req, res) => {
    const errors = validationResult(req);
        if (!errors.isEmpty()) {
           return res.status(400).json({ error: "email already exists" });
        }
    res.status(200).json({ message: "email available"})
})
authRoute.post("/signup", postSignup)

export default authRoute