import { Router } from "express";
import ProductFileCTRL from "../controllers/ProductFileCTRL.js";
const productCTRL = new ProductFileCTRL();
// CTRL
// MDL
// RT
const productRT = Router();
productRT.get("/add-product", productCTRL.getAddProduct);

productRT.post("/add-product", productCTRL.postAddProduct);

export default productRT;
