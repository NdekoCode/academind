import ProductFileMDL from "../models/ProductFileMDL.js";

import { activeLink } from "../utils/utils.js";
export default class AdminFileCTRL {
  /**
   * @description Nous amène vers le formulaire d'ajout d l'article
   * @author NdekoCode
   * @param {IncomingMessage} req L'objet requete
   * @param {ServerResponse} res L'objet reponse
   * @param {Function} next La methode pour passer au middleware suivant
   * @return {HTML}
   * @memberof AdminFileCTRL
   */
  getAddProduct(_, res) {
    return res.render("pages/admin/add-product", {
      pageTitle: "Add a product",
      path: "/admin/add-product",
      layout: "layouts/insert",
      activeLink,
    });
  }
  /**
   * @description Enregistre le produit entrer dans le formulaire
   * @author NdekoCode
   * @param {IncomingMessage} req L'objet requete
   * @param {ServerResponse} res L'objet reponse
   * @param {callback} next La methode pour passer au middleware suivant
   * @return {HTML}
   * @memberof AdminFileCTRL
   */
  postAddProduct(req, res, _) {
    const product = { ...req.body };
    const productMDL = new ProductFileMDL(product);
    productMDL.save();
    res.redirect("/");
  }
  getProducts(req, res, _) {
    return ProductFileMDL.fetchAll((product) => {
      return res.render("pages/admin/products", {
        pageTitle: "administration products",
        prods: product,
        path: "/admin/products",
        hasProducts: product.length > 0,
        activeShop: true,
        productCSS: true,
        activeLink,
      });
    });
  }
}
