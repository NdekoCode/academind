import { Router } from "express";
import ProductFileCTRL from "../controllers/ProductFileCTRL.js";

const productCTRL = new ProductFileCTRL();
const router = Router();
router.get("/", productCTRL.getProducts);
export default router;
