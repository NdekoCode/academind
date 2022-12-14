import { Router } from "express";
import AdminFileCTRL from "../controllers/files/AdminFileCTRL.js";
const AdminCTRL = new AdminFileCTRL();
// CTRL
// MDL
// RT
const productRT = Router();

// /admin/add-product => GET
productRT.get("/add-product", AdminCTRL.getAddProduct);
productRT.get("/edit-product/:productId", AdminCTRL.getEditProduct);
productRT.post("/edit-product", AdminCTRL.postEditProduct);
productRT.post("/delete-product", AdminCTRL.postDeleteProduct);
// /admin/product => GET
productRT.get("/products", AdminCTRL.getProducts);

productRT.post("/add-product", AdminCTRL.postAddProduct);

export default productRT;
