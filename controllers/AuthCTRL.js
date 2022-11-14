import { activeLink } from "../utils/utils.js";
export default class AuthCTRL {
  login(req, res, next) {
    return res.render("pages/auth/login", {
      pageTitle: "Login In page",
      path: "/login",
      activeLink,
    });
  }
  signup(req, res, next) {
    return res.render("pages/auth/signup", {
      pageTitle: "Signup page",
      path: "/signup",
      activeLink,
    });
  }
}
