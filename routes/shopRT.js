import { Router } from "express";
import ShopFileCTRL from "../controllers/ShopFileCTRL.js";

const shopCTRL = new ShopFileCTRL();
const router = Router();
router.get("/", shopCTRL.getIndex);
router.get("/products", shopCTRL.getProducts);
router.get("/cart", shopCTRL.getCart);
router.get("/checkout", shopCTRL.getCheckout);
router.get("/orders", shopCTRL.getOrders);
export default router;
