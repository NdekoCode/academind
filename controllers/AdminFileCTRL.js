import ProductFileMDL from "../models/ProductFileMDL.js";

import { activeLink } from "../utils/utils.js";
export default class AdminFileCTRL {
  /**
   * @description Nous amène vers le formulaire d'ajout d l'article
   * @author NdekoCode
   * @param {IncomingMessage} req L'objet requete
   * @param {ServerResponse} res L'objet reponse
   * @param {callback} next La methode pour passer au middleware suivant
   * @return {HTML}
   * @memberof ProductFileCTRL
   */
  getAddProduct(_, res) {
    return res.render("pages/admin/add-product", {
      pageTitle: "Add a product",
      path: "/admin/add-product",
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
  postAddProduct(req, res, _) {
    const productMDL = new ProductFileMDL(req.body.title);
    productMDL.save();
    res.redirect("/");
  }
}
