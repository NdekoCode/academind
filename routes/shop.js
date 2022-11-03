import { Router } from "express";
import { products } from "./admin.js";
import { activeLink } from "../utils/utils.js";

const router = Router();
router.get("/", (req, res, next) => {
  return res.render("pages/shop", {
    pageTitle: "My products",
    prods: products,
    path: "/",
    hasProducts: products.length > 0,
    activeShop: true,
    productCSS: true,
    activeLink,
  });
});
export default router;
