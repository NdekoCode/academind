import { activeLink } from "../utils/utils.js";
export default class ErrorsCTRL {
  getError404(req, res) {
    res.status(404).render("pages/404", {
      pageTitle: "Page Not Found",
      activeLink,
      path: "",
    });
  }
  error500(req, res) {
    res.status(500).render("pages/500", {
      pageTitle: "Internal Server Error",
      activeLink,
      path: "",
    });
  }
}
