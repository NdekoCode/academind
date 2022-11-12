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
    return ProductMDL.fetchAll()
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
    return ProductMDL.findAll({ order: [["createdAt", "DESC"]] })
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
  /* async postCartDelete(req, res, _) {
    try {
      const prodId = parseInt(req.body.productId);
      const cart = await req.user.getCart();
      const products = await cart.getProducts({ where: { id: prodId } });
      if (products && products.length > 0) {
        const product = products[0];
        await product.cartItem.destroy();
        return res.redirect("/cart");
      }
    } catch (error) {
      console.log(error);
    }
  } */

  async getOrders(req, res, _) {
    try {
      // On veut recuper les commandes de l'utilisateurs mais aussi les produits qui sont dans la commande
      const orders = await req.user.getOrders({ include: ["products"] });
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
  /*  async postOrder(req, res, next) {
    try {
      // On récupère le panier
      const cart = await req.user.getCart();
      // On recupère les produits qui se trouve dans le panier
      const products = await cart.getProducts();
      // L'utilisateur va créer une commande
      const order = await req.user.createOrder();
      // Puis à cette commande que l'utilisateur a créer on va y ajouter des produit dans la table orderItem
      await order.addProducts(
        products.map((product) => {
          product.orderItem = { quantity: product.cartItem.quantity };
          return product;
        })
      );
      // Une fois la commande passer on supprime les produits dans le panier
      await cart.setProducts(null);
      return res.redirect("/orders");
    } catch (error) {
      return console.log(error);
    }
  } */
}
