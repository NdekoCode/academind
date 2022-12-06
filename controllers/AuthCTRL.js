import { activeLink } from "../utils/utils.js";
export default class AuthCTRL {
  login(req, res, next) {
    console.log(req.session.isLoggedIn);
    const loggedIn = req.get("Cookie").split("=")[1] === "true";
    return res.render("pages/auth/login", {
      pageTitle: "Login In page",
      path: "/login",
      activeLink,
      isAuthenticated: loggedIn,
    });
  }
  postLogin(req, res, ext) {
    // res.setHeader("Set-Cookie", "isLoggedIn=true; HttpOnly");
    req.session.isLoggedIn = true;
    req.isLoggedIn = true;
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
