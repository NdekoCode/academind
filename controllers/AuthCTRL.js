import { activeLink } from "../utils/utils.js";
export default class AuthCTRL {
  login(req, res, next) {
    return res.render("pages/auth/login", {
      pageTitle: "Login In page",
      path: "/login",
      activeLink,
      isAuthenticated: req.session.isLoggedIn,
    });
  }
  postLogin(req, res, ext) {
    req.session.isLoggedIn = true;
    console.log(req.body);
    res.redirect("/products");
  }
  signup(req, res, next) {
    return res.render("pages/auth/signup", {
      pageTitle: "Signup page",
      path: "/signup",
      activeLink,
      isAuthenticated: req.session.isLoggedIn,
    });
  }
}
