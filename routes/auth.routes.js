import { Router } from "express";
import AuthCTRL from "../controllers/AuthCTRL.js";
const authRouter = Router();
const authCTRL = new AuthCTRL();
authRouter.get("/login", authCTRL.login);
authRouter.get("/signup", authCTRL.signup);
export default authRouter;
