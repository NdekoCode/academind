import { Router } from "express";
const router = Router();
router.get("/", (req, res, next) => {
  console.log("In the first middleware");
  res.send("<h1>Page d'acceuil</h1>");
});
export default router;
