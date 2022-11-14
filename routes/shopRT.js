import { Router } from "express";
import ShopCTRL from "../controllers/ShopCTRL.js";

const shopCTRL = new ShopCTRL();
const router = Router();
router.get("/", shopCTRL.getIndex);
router.get("/products", shopCTRL.getProducts);
router.get("/products/:productTitle", shopCTRL.getProduct);
// router.get("/cart", shopCTRL.getCart);
router.post("/cart", shopCTRL.postCart);
// router.post("/cart-delete-item", shopCTRL.postCartDelete);
// router.post("/create-order", shopCTRL.postOrder);
// // router.get("/checkout", shopCTRL.getCheckout);
// router.get("/orders", shopCTRL.getOrders);
export default router;
