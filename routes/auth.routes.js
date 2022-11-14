import { Router } from "express";
import { activeLink } from "../utils/utils.js";
const authRouter = Router();
authRouter.get("/login", (req, res, next) => {
  return res.render("pages/login", {
    pageTitle: "Login page",
    path: "/signin",
    activeLink,
  });
});
authRouter.get("/signin", (req, res, next) => {
  return res.render("pages/signin", {
    pageTitle: "Signin page",
    path: "/signin",
    activeLink,
  });
});
export default authRouter;
