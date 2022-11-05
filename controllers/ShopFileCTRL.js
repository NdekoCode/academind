import ProductFileMDL from "../models/ProductFileMDL.js";
import { activeLink } from "../utils/utils.js";

export default class ProductFileCTRL {
  /**
   * @description Recupère tous les produits et les envois à la vues
   * @author NdekoCode
   * @param {IncomingMessage} req L'objet requete
   * @param {ServerResponse} res L'objet reponse
   * @param {Function} next La methode pour passer au middleware suivant
   * @return {HTML}
   * @memberof ProductFileCTRL
   */
  async getProducts(_, res, next) {
    return ProductFileMDL.fetchAll((product) => {
      return res.render("pages/shop/product-list", {
        pageTitle: "My products",
        prods: product,
        path: "/products",
        hasProducts: product.length > 0,
        activeShop: true,
        productCSS: true,
        activeLink,
      });
    });
  }
  getIndex(req, res, _) {
    return ProductFileMDL.fetchAll((product) => {
      return res.render("pages/shop/index", {
        pageTitle: "Ours products",
        prods: product,
        path: "/",
        hasProducts: product.length > 0,
        activeShop: true,
        productCSS: true,
        activeLink,
      });
    });
  }

  getCart(req, res, _) {
    return res.render("pages/shop/cart", {
      path: "/cart",
      pageTitle: "Your cart",
      activeLink,
    });
  }
  getCheckout(req, res, _) {
    return res.render("pages/shop/checkout", {
      pageTitle: "Checkout",
      path: "/checkout",
      activeLink,
    });
  }

  getOrders(req, res, _) {
    return res.render("pages/shop/orders", {
      pageTitle: "Your Orders",
      path: "/orders",
      activeLink,
    });
  }
}
