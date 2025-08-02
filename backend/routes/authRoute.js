import { Router } from "express";
const authRoute = Router()
import postSignin from "../controllers/signinController.js";
import postSignup from "../controllers/signupController.js";
import emailCheck from "../validators/createUserEmailValidator.js";
import usernameCheck from "../validators/createUserNameValidator.js";


authRoute.post("/signin", postSignin)


authRoute.post("/check-username", usernameCheck(), (req, res) => {
    res.status(200).send("username available")
})
authRoute.post("/check-email", emailCheck(), (req, res) => {
    res.status(200).send("email available")
})
authRoute.post("/signup", postSignup)

export default authRoute