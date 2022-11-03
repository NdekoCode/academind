import { Router } from "express";
import { products } from "./admin.js";

const router = Router();
router.get("/", (req, res, next) => {
  console.log(products);

  return res.render("pages/shop", { title: "My products" });
});
export default router;
