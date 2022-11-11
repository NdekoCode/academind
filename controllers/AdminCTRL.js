import ProductMDL from "../models/ProductMDL.js";
import slugify from "slugify";
import { activeLink } from "../utils/utils.js";
import ErrorsCTRL from "./ErrorsCTRL.js";
import Product from "../data/Product.js";
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
      slug: slugify(req.body.title, { lower: true }),
    };
    const prodMDL = new ProductMDL(product);
    prodMDL
      .save()
      .then(() => {
        console.log("Created product");
        return res.status(201).redirect("/");
      })
      .catch((err) => console.log(err));
  }
  async getProducts(req, res, _) {
    ProductMDL.fetchAll()
      .then((products) => {
        products = products.map((p) => new Product(p));
        return res.render("pages/admin/products", {
          pageTitle: "administration products",
          prods: products,
          path: "/admin/products",
          hasProducts: products.length > 0,
          activeLink,
          layout: "layouts/admin",
        });
      })
      .catch((err) => console.log(err));
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
    const prodId = req.params.productId;
    ProductMDL.findById(prodId).then((product) => {
      if (!product) return new ErrorsCTRL().getError404(req, res);
      return res.render("pages/admin/edit-product", {
        pageTitle: "Edit a product",
        path: "/products",
        layout: "layouts/insert",
        editing: editMode,
        prodId,
        product: product,
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
  /* postEditProduct(req, res, _) {
    const prodId = parseInt(req.body.productId);
    const updateProduct = {
      id: prodId,
      ...req.body,
      slug: slugify(req.body.title, { lower: true }),
    };

    // getProducts : est une methode créer par sequelize lorsque l'on a fait un ProductMDL.belongsTo(UserMDL) à fin de récuperer tous les produits appartenant à cet utilisateur
    req.user
      .getProducts({
        where: {
          id: prodId,
        },
      })
      .then((product) => {
        if (product[0]) {
          product[0].update(updateProduct);
          return res.status(201).redirect("/admin/products");
        }
        return new ErrorsCTRL().getError404(req, res);
      })
      .catch(() => {
        return new ErrorsCTRL().error500(req, res);
      });
  } */

  /*  postDeleteProduct(req, res, next) {
    const prodId = parseInt(req.body.productId);
    req.user
      .getProducts({ where: { id: prodId } })
      .then((product) => {
        if (product[0]) {
          product[0].destroy();
          return res.status(201).redirect("/admin/products");
        }
        return new ErrorsCTRL().getError404(req, res);
      })
      .catch((err) => console.log(err));
  } */
}
