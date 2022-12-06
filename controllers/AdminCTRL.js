import slugify from "slugify";
import Product from "../data/Product.js";
import ProductMDL from "../models/ProductMDL.js";
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
  getAddProduct(req, res) {
    return res.render("pages/admin/edit-product", {
      pageTitle: "Add a product",
      path: "/admin/add-product",
      layout: "layouts/insert",
      activeLink,
      isAuthenticated: req.isLoggedIn,
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
      userId: req.user._id,
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
    ProductMDL.find()
      // .select("title price imageUrl _id rating")
      // .populate("userId", "user")
      .then((products) => {
        products = products.map((p) => new Product(p));
        return res.render("pages/admin/products", {
          pageTitle: "Administration products",
          prods: products,
          path: "/admin/products",
          hasProducts: products.length > 0,
          activeLink,
          layout: "layouts/admin",
          isAuthenticated: req.isLoggedIn,
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
  async getEditProduct(req, res) {
    const editMode = Boolean(req.query.edit);
    if (!editMode) return res.redirect("/");
    const prodId = req.params.productId;
    try {
      const product = await findById(prodId);
      if (!product) {
        return new ErrorsCTRL().getError404(req, res);
      }
      return res.render("pages/admin/edit-product", {
        pageTitle: "Edit a product",
        path: "/products",
        layout: "layouts/insert",
        editing: editMode,
        prodId,
        product: product,
        activeLink,
        isAuthenticated: req.isLoggedIn,
      });
    } catch (error) {
      return new ErrorsCTRL().error500(req, res);
    }
  }

  /**
   * @description Fait les modification d'un produit
   * @author NdekoCode
   * @param {IncomingMessage} req L'objet requete
   * @param {ServerResponse} res L'objet reponse
   * @return {HTML}
   * @memberof AdminCTRL
   */
  async postEditProduct(req, res, _) {
    const prodId = req.body.productId;
    const updateProduct = {
      ...req.body,
      slug: slugify(req.body.title, { lower: true }),
    };
    try {
      const product = await ProductMDL.findById(prodId);

      if (product) {
        return ProductMDL.updateOne({ _id: prodId }, updateProduct).then(() => {
          return res.status(201).redirect("/admin/products");
        });
      }

      return new ErrorsCTRL().getError404(req, res);
    } catch (error) {
      return new ErrorsCTRL().error500(req, res);
    }
  }

  async postDeleteProduct(req, res, next) {
    const prodId = req.body.productId;
    try {
      const product = await ProductMDL.findById(prodId);
      if (product) {
        await ProductMDL.deleteOne({ _id: prodId });
        return res.status(201).redirect("/admin/products");
      }
      return new ErrorsCTRL().getError404(req, res);
    } catch (error) {
      return new ErrorsCTRL().error500(req, res);
    }
  }
}
