import Product from "../data/Product.js";
import OrderMDL from "../models/OrderMDL.js";
// import CartMDL from "../models/CartMDL.js";
import ProductMDL from "../models/ProductMDL.js";
import UserMDL from "../models/UserMDL.js";
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
  getProducts(req, res, next) {
    return ProductMDL.find()
      .then((products) => {
        products = products.map((p) => new Product(p));
        return res.render("pages/shop/product-list", {
          pageTitle: "My products",
          prods: products,
          path: "/products",
          hasProducts: products.length > 0,
          activeLink,
          isAuthenticated: req.isLoggedIn,
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
          isAuthenticated: req.isLoggedIn,
        });
      })
      .catch((err) => console.log(err));
  }
  async getProduct(req, res, _) {
    // On va verifier le produit qui correctement au slug du qui se trouve dans l'URL
    const params = { slug: req.params.productTitle };
    const product = await ProductMDL.findOne(params);
    if (!product) {
      return new ErrorsCTRL().getError404(req, res);
    }
    return res.render("pages/shop/product-detail", {
      pageTitle: product.title,
      prod: new Product(product),
      path: "/products",
      activeLink,
      isAuthenticated: req.isLoggedIn,
    });
  }

  getCart(req, res, _) {
    // On recupère les produits dans le panier
    req.user
      .populate("cart.items.productId") // On aura un champ productId qui va contenir les produit
      .then((user) => {
        const products = user.cart.items;
        return res.render("pages/shop/cart", {
          path: "/cart",
          pageTitle: "Your cart",
          activeLink, // On envois les produits à la vues
          products: products,
          isAuthenticated: req.isLoggedIn,
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
        await req.user.addToCart(product);
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
      const orders = await OrderMDL.find({ "user.userId": req.user._id });
      console.log(orders);
      return res.render("pages/shop/orders", {
        pageTitle: "Your Orders",
        path: "/orders",
        orders,
        activeLink,
        isAuthenticated: req.isLoggedIn,
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
      // On recupère le produit dont l'utilisateur connecté est propriétaire
      const user = await req.user.populate("cart.items.productId");
      const products = user.cart.items.map((item) => ({
        // On veut recuperer les produit et non l'identifiant de la reference
        product: { ...item.productId._doc },
        quantity: item.quantity,
      }));
      const order = new OrderMDL({
        user: {
          username: req.user.username,
          userId: req.user._id,
        },
        products,
      });
      // On fait la commande
      await order.save();
      await req.user.clearCart();

      return res.redirect("/orders");
    } catch (error) {
      return console.log(error);
    }
  }
}
