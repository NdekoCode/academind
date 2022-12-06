import CartMDL from "../models/CartMDL.js";
import ProductMDL from "../models/ProductMDL.js";
import { activeLink } from "../utils/utils.js";
import ErrorsCTRL from "./ErrorsCTRL.js";
export default class ShopCTRL {
  /**
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
      .then(([rows, fieldData]) => {
        console.log(rows);
        return res.render("pages/shop/product-list", {
          pageTitle: "My products",
          prods: rows,
          path: "/products",
          hasProducts: rows.length > 0,
          activeLink,
        });
      })
      .catch((err) => console.log(err));
  }

  getIndex(req, res, _) {
    return ProductMDL.fetchAll()
      .then(([rows, fieldData]) => {
        console.log(rows);
        return res.render("pages/shop/product-list", {
          pageTitle: "Ours products",
          prods: rows,
          path: "/",
          hasProducts: rows.length > 0,
          activeLink,
        });
      })
      .catch((err) => console.log(err));
  }
  async getProduct(req, res, _) {
    // On va verifier le produit qui correctement au slug du qui se trouve dans l'URL
    const params = { key: "slug", value: req.params.productTitle };
    const [product] = await ProductMDL.fetchOneBy(params);
    console.log(product);
    if (!product) {
      return new ErrorsCTRL().getError404(req, res);
    }
    return res.render("pages/shop/product-detail", {
      pageTitle: product[0].title,
      prod: product[0],
      path: "/products",
      activeLink,
    });
  }

  getCart(req, res, _) {
    const cartMDL = new CartMDL();

    return res.render("pages/shop/cart", {
      path: "/cart",
      pageTitle: "Your cart",
      activeLink,
      products: [],
    });
  }
  postCart(req, res, _) {
    const prodId = parseInt(req.body.productId);
    console.log(prodId);

    return res.redirect("/cart");
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
