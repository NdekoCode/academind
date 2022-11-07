import { read, readFile, writeFile } from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { loadFile } from "../utils/utils.js";
import MDL from "./MDL.js";
import ProductFileMDL from "./ProductMDL.js";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const cartFile = loadFile("data/cart.json");
const productFile = loadFile("data/products.json");
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
      CartMDL.insertFromFile(cart, cartFile);
    });
  }
  static deleteProduct(id, productPrice) {
    readFile(cartFile, { encoding: "utf-8" }, (err, fileContent) => {
      if (!err && fileContent) {
        const cart = JSON.parse(fileContent);
        const product = cart.products.find((p) => p.id === id);
        //  Si le produit existe
        if (product) {
          cart.totalPrice -= product.quantity * productPrice;
          cart.products = cart.products.filter((p) => p.id !== id);
          return writeFile(cartFile, JSON.stringify(cart, null, 2), (err) => {
            return console.log(err);
          });
        }
      }
      return console.log(err);
    });
  }
  getCart(cb) {
    readFile(cartFile, { encoding: "utf-8" }, (err, data) => {
      if (!err && data) {
        cb(JSON.parse(data));
      } else {
        cb({});
      }
    });
  }
  getProducts(cb) {
    this.getCart((cart) => {
      const cartProducts = [];
      ProductFileMDL.fetchAll((products) => {
        for (let product of products) {
          const productInCart = cart.products.find((p) => p.id === product.id);
          if (productInCart) {
            cartProducts.push({
              productData: product,
              quantity: productInCart.quantity,
            });
          }
        }
        cb(cartProducts);
      });
    });
  }
}
