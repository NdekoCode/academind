import { Router } from "express";
import ProductFileCTRL from "../controllers/ProductFileCTRL.js";

const productCTRL = new ProductFileCTRL();
const router = Router();
router.get("/", productCTRL.getProducts);
router.get("/products", productCTRL.getProducts);
router.get("/cart", productCTRL.getProducts);
router.get("/checkout", productCTRL.getProducts);
export default router;
