import Product from "../data/Product.js";
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
    return ProductMDL.findAll()
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
    const product = await ProductMDL.findOne({ where: params });
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

  async getCart(req, res, _) {
    try {
      const cart = await req.user.getCart();
      const products = await cart.getProducts();
      return res.render("pages/shop/cart", {
        path: "/cart",
        pageTitle: "Your cart",
        activeLink,
        products,
      });
    } catch (err) {
      console.log(err);
    }
  }
  async postCart(req, res, _) {
    const prodId = parseInt(req.body.productId);
    let product;
    let newQuantity = 1;
    try {
      const cart = await req.user.getCart();
      const products = await cart.getProducts({ where: { id: prodId } });
      if (products && products.length > 0) {
        product = products[0];
      }
      if (product) {
        const oldQuantity = product.cartItem.quantity;
        newQuantity = oldQuantity + 1;
        // ...
      }
      const postProduct = await ProductMDL.findByPk(prodId);
      console.log(postProduct);
      // addProduct est une methode magique qui est ajouter avec la relation que nous avont definit entre la carte (Panier) et les produit
      await cart.addProduct(postProduct, {
        // Si le produit existe déjà dans la carte alors on va juste augmenter la quantité
        through: { quantity: newQuantity },
      });

      return res.redirect("/cart");
    } catch (err) {
      console.log(err);
    }
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
  async postCartDelete(req, res, _) {
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
  }
}
