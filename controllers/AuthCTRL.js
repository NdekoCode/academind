import { activeLink } from "../utils/utils.js";
export default class AuthCTRL {
  login(req, res, next) {
    const isLoggedIn = req.get("Cookie").split(";")[0].trim().split("=")[1];
    return res.render("pages/auth/login", {
      pageTitle: "Login In page",
      path: "/login",
      activeLink,
      isAuthenticated: isLoggedIn,
    });
  }
  postLogin(req, res, ext) {
    res.setHeader("set-Cookie", "isLoggedIn=true");
    console.log(req.body);
    res.redirect("/products");
  }
  signup(req, res, next) {
    return res.render("pages/auth/signup", {
      pageTitle: "Signup page",
      path: "/signup",
      activeLink,
      isAuthenticated: req.isLoggedIn,
    });
  }
}
