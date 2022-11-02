import { Router } from "express";
import { loadFile } from "../utils/utils.js";
const router = Router();

router.get("/add-product", (req, res, next) => {
  return res.sendFile(loadFile("views/add-product.html"));
});

router.post("/add-product", (req, res, next) => {
  return res.redirect("/");
});

export default router;
