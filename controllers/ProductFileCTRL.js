import ProductFileMDL from "../models/ProductFileMDL.js";
import { activeLink } from "../utils/utils.js";

export default class ProductFileCTRL {
  /**
   * @description Recupère tous les produits et les envois à la vues
   * @author NdekoCode
   * @param {IncomingMessage} req L'objet requete
   * @param {ServerResponse} res L'objet reponse
   * @param {callback} next La methode pour passer au middleware suivant
   * @return {HTML}
   * @memberof ProductFileCTRL
   */
  async getProducts(_, res) {
    return ProductFileMDL.fetchAll((product) => {
      return res.render("pages/shop/product-list", {
        pageTitle: "My products",
        prods: product,
        path: "/",
        hasProducts: product.length > 0,
        activeShop: true,
        productCSS: true,
        activeLink,
      });
    });
  }
}
