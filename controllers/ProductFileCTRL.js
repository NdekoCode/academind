import ProductFileMDL, { products } from "../models/ProductFileMDL.js";
import { activeLink } from "../utils/utils.js";

export default class ProductFileCTRL {
  /**
   * @description Nous amène vers le formulaire d'ajout d l'article
   * @author NdekoCode
   * @param {IncomingMessage} req L'objet requete
   * @param {ServerResponse} res L'objet reponse
   * @param {callback} next La methode pour passer au middleware suivant
   * @return {HTML}
   * @memberof ProductFileCTRL
   */
  getAddProduct(req, res, next) {
    return res.render("pages/add-product", {
      pageTitle: "Add a product",
      path: "/admin/add-product",
      hasProducts: products.length > 0,
      activeShop: true,
      productCSS: true,
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
   * @memberof ProductFileCTRL
   */
  postAddProduct(req, res, next) {
    const productMDL = new ProductFileMDL(req.body.title);
    productMDL.save();
    return res.redirect("/");
  }
  /**
   * @description Recupère tous les produits et les envois à la vues
   * @author NdekoCode
   * @param {IncomingMessage} req L'objet requete
   * @param {ServerResponse} res L'objet reponse
   * @param {callback} next La methode pour passer au middleware suivant
   * @return {HTML}
   * @memberof ProductFileCTRL
   */
  getProducts(req, res, next) {
    const products = ProductFileMDL.fetchAll();
    return res.render("pages/shop", {
      pageTitle: "My products",
      prods: products,
      path: "/",
      hasProducts: products.length > 0,
      activeShop: true,
      productCSS: true,
      activeLink,
    });
  }
}
