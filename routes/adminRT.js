import { Router } from "express";
import AdminFileCTRL from "../controllers/AdminFileCTRL.js";
const AdminCTRL = new AdminFileCTRL();
// CTRL
// MDL
// RT
const productRT = Router();

// /admin/add-product => GET
productRT.get("/add-product", AdminCTRL.getAddProduct);
// /admin/product => GET
productRT.get("/products", AdminCTRL.getAddProduct);

productRT.post("/add-product", AdminCTRL.postAddProduct);

export default productRT;
