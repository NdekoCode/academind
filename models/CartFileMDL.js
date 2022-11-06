import { readFile, writeFile } from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { loadFile } from "../utils/utils.js";
import MDLFile from "./MDLFile.js";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const cartFile = loadFile("data/cart.json");
export default class CartFileMDL extends MDLFile {
  /**
   * @description Add a new product in the cart
   * - Fetch the previous cart
   * - Analyse the cart => find existing product
   * - Add new product/increase the quantity and the total price
   * @author NdekoCode
   * @static
   * @memberof CartFileMDL
   */
  static addProduct(id, productPrice) {
    readFile(cartFile, { encoding: "utf-8" }, (error, fileContent) => {
      let cart = { products: [], totalPrice: 0 };
      if (!error && fileContent) {
        cart = JSON.parse(fileContent);
      }
      const existingProductIndex = cart.products.findIndex((p) => p.id === id);
      // Analyse the cart => find existing product
      const existingProduct = cart.products[existingProductIndex];
      let updateProduct;
      // Add new product/increase the quantity and the total price
      if (existingProduct) {
        updateProduct = { ...existingProduct };
        updateProduct.quantity = existingProduct.quantity + 1;
        cart.products = [...cart.products];
        cart.products[existingProductIndex] = updateProduct;
      } else {
        updateProduct = { id, quantity: 1 };
        cart.products = [...cart.products, updateProduct];
      }
      cart.totalPrice += productPrice;
      CartFileMDL.insertFromFile(cart, cartFile);
    });
  }
}
