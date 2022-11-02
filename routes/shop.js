import { Router } from "express";
import { loadFile } from "../utils/utils.js";
const router = Router();
router.get("/", (req, res, next) => {
  return res.sendFile(loadFile("views/shop.html"));
});
export default router;
