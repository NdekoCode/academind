import Product from "../data/Product.js";
// import CartMDL from "../models/CartMDL.js";
import ProductMDL from "../models/ProductMDL.js";
import { activeLink } from "../utils/utils.js";
import ErrorsCTRL from "./ErrorsCTRL.js";
export default class ShopCTRL {
  /**
   *
   * @description Recupère tous les produits et les envois à la vues
   * @author NdekoCode
   * @param {IncomingMessage} req L'objet requete
   * @param {ServerResponse} res L'objet reponse
   * @param {Function} next La methode pour passer au middleware suivant
   * @return {HTML}
   * @memberof ShopCTRL
   */
  getProducts(_, res, next) {
    return ProductMDL.find()
      .then((products) => {
        products = products.map((p) => new Product(p));
        return res.render("pages/shop/product-list", {
          pageTitle: "My products",
          prods: products,
          path: "/products",
          hasProducts: products.length > 0,
          activeLink,
        });
      })
      .catch((err) => console.log(err));
  }

  getIndex(req, res, _) {
    return ProductMDL.find()
      .then((products) => {
        products = products.map((p) => new Product(p));
        return res.render("pages/shop/product-list", {
          pageTitle: "Ours products",
          prods: products,
          path: "/",
          hasProducts: products.length > 0,
          activeLink,
        });
      })
      .catch((err) => console.log(err));
  }
  async getProduct(req, res, _) {
    // On va verifier le produit qui correctement au slug du qui se trouve dans l'URL
    const params = { slug: req.params.productTitle };
    const product = await ProductMDL.findOneBy(params);
    if (!product) {
      return new ErrorsCTRL().getError404(req, res);
    }
    return res.render("pages/shop/product-detail", {
      pageTitle: product.title,
      prod: new Product(product),
      path: "/products",
      activeLink,
    });
  }

  getCart(req, res, _) {
    req.user
      .getCart()
      .then((products) => {
        return res.render("pages/shop/cart", {
          path: "/cart",
          pageTitle: "Your cart",
          activeLink,
          products: products,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }
  async postCart(req, res, _) {
    try {
      const prodId = req.body.productId;
      const product = await ProductMDL.findById(prodId);
      if (product) {
        req.user.addToCart(product);
        return res.redirect("/cart");
      }
      return new ErrorsCTRL().getError404(req, res);
    } catch (error) {
      return console.log(error);
    }
  }
  async postCartDelete(req, res, _) {
    try {
      const prodId = req.body.productId;
      await req.user.deleteItemFromCart(prodId);

      return res.redirect("/cart");
    } catch (error) {
      console.log(error);
    }
  }

  async getOrders(req, res, _) {
    try {
      // On veut recuper les commandes de l'utilisateurs mais aussi les produits qui sont dans la commande
      const orders = await req.user.getOrders();
      console.log(orders);
      return res.render("pages/shop/orders", {
        pageTitle: "Your Orders",
        path: "/orders",
        orders,
        activeLink,
      });
    } catch (error) {
      return console.log(error);
    }
  }
  /**
   * Pour ajouter une commande
   * @param {IncommingRequest} req
   * @param {ServerResponse} res
   * @param {Function} next
   * @returns
   */
  async postOrder(req, res, next) {
    try {
      // On fait la commande
      await req.user.addOrder();
      return res.redirect("/orders");
    } catch (error) {
      return console.log(error);
    }
  }
}
