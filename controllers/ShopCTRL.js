import CartMDL from "../models/CartMDL.js";
import ProductMDL from "../models/ProductMDL.js";
import { activeLink } from "../utils/utils.js";
import ErrorsCTRL from "./ErrorsCTRL.js";
export default class ProductCTRL {
  /**
   * @description Recupère tous les produits et les envois à la vues
   * @author NdekoCode
   * @param {IncomingMessage} req L'objet requete
   * @param {ServerResponse} res L'objet reponse
   * @param {Function} next La methode pour passer au middleware suivant
   * @return {HTML}
   * @memberof ProductCTRL
   */
  getProducts(_, res, next) {
    return ProductMDL.fetchAll((product) => {
      return res.render("pages/shop/product-list", {
        pageTitle: "My products",
        prods: product,
        path: "/products",
        hasProducts: product.length > 0,
        activeLink,
      });
    });
  }
  getProduct(req, res, _) {
    // On va verifier le produit qui correctement au slug du qui se trouve dans l'URL
    const params = { key: "slug", value: req.params.productTitle };
    return ProductMDL.fetchOneBy(params, (product) => {
      if (!product) {
        return new ErrorsCTRL().getError404(req, res);
      }
      return res.render("pages/shop/product-detail", {
        pageTitle: product.title,
        prod: product,
        path: "/products",
        activeLink,
      });
    });
  }
  getIndex(req, res, _) {
    return ProductMDL.fetchAll((product) => {
      return res.render("pages/shop/index", {
        pageTitle: "Ours products",
        prods: product,
        path: "/",
        hasProducts: product.length > 0,
        activeLink,
      });
    });
  }

  getCart(req, res, _) {
    const cartMDL = new CartMDL();
    cartMDL.getProducts((products) => {
      return res.render("pages/shop/cart", {
        path: "/cart",
        pageTitle: "Your cart",
        activeLink,
        products,
      });
    });
  }
  postCart(req, res, _) {
    const prodId = parseInt(req.body.productId);
    ProductMDL.findById(prodId, (product) => {
      CartMDL.addProduct(prodId, product.price);
      return res.redirect("/cart");
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
  postCartDelete(req, res, _) {
    const prodId = parseInt(req.body.productId);
    ProductMDL.findById(prodId, (product) => {
      CartMDL.deleteProduct(prodId, product.price);
      return res.redirect("/cart");
    });
  }
}
