import MDL from "./MDL.js";
import ProductMDL from "./ProductMDL.js";
export default class CartMDL extends MDL {
  /**
   * @description Add a new product in the cart
   * - Fetch the previous cart
   * - Analyse the cart => find existing product
   * - Add new product/increase the quantity and the total price
   * @author NdekoCode
   * @static
   * @memberof CartMDL
   */
  static addProduct(id, productPrice) {}
  static deleteProduct(id, productPrice) {}
  getCart() {}
  getProducts() {}
}
