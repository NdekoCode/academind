import { Router } from "express";
import { loadFile } from "../utils/utils.js";
export const products = [];
const router = Router();

router.get("/add-product", (req, res, next) => {
  return res.render("pages/add-product", { title: "Add a product" });
});

router.post("/add-product", (req, res, next) => {
  products.push({ title: req.body.title });
  return res.redirect("/");
});

export default router;
