import ProductMDL from "../models/ProductMDL.js";
import slugify from "slugify";
import { activeLink } from "../utils/utils.js";
import ErrorsCTRL from "./ErrorsCTRL.js";
export default class AdminCTRL {
  /**
   * @description Nous amène vers le formulaire d'ajout d l'article
   * @author NdekoCode
   * @param {IncomingMessage} req L'objet requete
   * @param {ServerResponse} res L'objet reponse
   * @param {Function} next La methode pour passer au middleware suivant
   * @return {HTML}
   * @memberof AdminCTRL
   */
  getAddProduct(_, res) {
    return res.render("pages/admin/edit-product", {
      pageTitle: "Add a product",
      path: "/admin/add-product",
      layout: "layouts/insert",
      activeLink,
    });
  }
  /**
   * @description Formulaire de modification d'un produit
   * @author NdekoCode
   * @param {IncomingMessage} req L'objet requete
   * @param {ServerResponse} res L'objet reponse
   * @return {HTML}
   * @memberof AdminCTRL
   */
  getEditProduct(req, res) {
    const editMode = Boolean(req.query.edit);
    if (!editMode) return res.redirect("/");
    const prodId = parseInt(req.params.productId);
    ProductMDL.findById(prodId, (product) => {
      if (!product) return new ErrorsCTRL().getError404(req, res);
      return res.render("pages/admin/edit-product", {
        pageTitle: "Edit a product",
        path: "/products",
        layout: "layouts/insert",
        editing: editMode,
        prodId,
        product,
        activeLink,
      });
    });
  }

  /**
   * @description Fait les modification d'un produit
   * @author NdekoCode
   * @param {IncomingMessage} req L'objet requete
   * @param {ServerResponse} res L'objet reponse
   * @return {HTML}
   * @memberof AdminCTRL
   */
  postEditProduct(req, res, _) {
    const prodId = parseInt(req.body.productId);
    const updateProduct = {
      ...req.body,
      id: prodId,
      slug: slugify(req.body.title, { lower: true }),
    };
    const product = new ProductMDL(updateProduct);
    product.save();
    res.redirect("/admin/products");
  }
  /**
   * @description Enregistre le produit entrer dans le formulaire
   * @author NdekoCode
   * @param {IncomingMessage} req L'objet requete
   * @param {ServerResponse} res L'objet reponse
   * @param {callback} next La methode pour passer au middleware suivant
   * @return {HTML}
   * @memberof AdminCTRL
   */
  postAddProduct(req, res, _) {
    const product = {
      ...req.body,
      id: null,
      slug: slugify(req.body.title, { lower: true }),
    };
    const productMDL = new ProductMDL(product);
    productMDL.save();
    res.redirect("/");
  }
  getProducts(req, res, _) {
    return ProductMDL.fetchAll((product) => {
      return res.render("pages/admin/products", {
        pageTitle: "administration products",
        prods: product,
        path: "/admin/products",
        hasProducts: product.length > 0,
        activeShop: true,
        productCSS: true,
        activeLink,
        layout: "layouts/admin",
      });
    });
  }
  postDeleteProduct(req, res, next) {
    const prodId = parseInt(req.body.productId);
    ProductMDL.deleteById(prodId);
    res.redirect("/admin/products");
  }
}
