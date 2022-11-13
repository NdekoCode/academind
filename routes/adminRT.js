import { Router } from "express";
import AdminCTRL from "../controllers/AdminCTRL.js";
const adminCTRL = new AdminCTRL();
// CTRL
// MDL
// RT
const productRT = Router();

// /admin/add-product => GET
// productRT.get("/add-product", adminCTRL.getAddProduct);
// productRT.post("/add-product", adminCTRL.postAddProduct);
// productRT.get("/edit-product/:productId", adminCTRL.getEditProduct);
// productRT.post("/edit-product", adminCTRL.postEditProduct);
// productRT.post("/delete-product", adminCTRL.postDeleteProduct);
// /admin/product => GET
// productRT.get("/products", adminCTRL.getProducts);

export default productRT;
