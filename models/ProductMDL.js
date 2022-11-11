import { ObjectId } from "mongodb";
import ErrorsCTRL from "../controllers/ErrorsCTRL.js";
import MDL from "./MDL.js";
/**
 * Le produit à vendre
 * @typedef {object} Product
 * @property {number} [id=Date.now()] L'identifiant de l'article
 * @property {string} title Titre de l'article
 * @property {string} slug Le slug pour l'URL descriptif de l'article
 * @property {number} price Le prix de l'article
 * @property {string} description description de l'article
 * @property {string} [imageUrl="https://loremflickr.com/g/500/320/product,book?lock=5"] image de l'article
 * @property {number} rating La note de l'article
 */

/**
 * Le produit à vendre
 * @typedef {object} ProductModel
 * @property {number} [id=Date.now()] L'identifiant de l'article
 * @property {string} title Titre de l'article
 * @property {string} slug Le slug pour l'URL descriptif de l'article
 * @property {number} price Le prix de l'article
 * @property {string} description description de l'article
 * @property {string} [imageUrl="https://loremflickr.com/g/500/320/product,book?lock=5"] image de l'article
 * @property {number} rating La note de l'article
 * @property {string} slug L'URL vers l'article
 */

/**
 * Represente le produit à vendre lui-meme
 */
export default class ProductMDL extends MDL {
  /**
   * Creates an instance of ProductMDL.
   * @author NdekoCode
   * @param {Product} product
   * @memberof ProductMDL
   */ static collection = "products";
  constructor(product) {
    super("products");
    this.title = product.title;
    this.price = parseFloat(product.price);
    this.slug = product.slug;
    this.description = product.description;
    this.rating = parseInt(product.rating);
    this.imageUrl = product.imageUrl;
    if (product.id) {
      this._id = new ObjectId(product.id);
    }
  }

  async save() {
    try {
      if (this._id) {
        // update product
        await ProductMDL.query.updateOne(
          { _id: new ObjectId(this._id) },
          { $set: this }
        );
      } else {
        await ProductMDL.query.insertOne(this);
      }
    } catch (error) {
      return console.log(error.message);
    }
  }

  static async fetchAll() {
    try {
      const products = await ProductMDL.makeQueryOn("products")
        .find()
        .toArray();
      return products;
    } catch (err) {
      return console.log(err);
    }
  }
  static async findOneBy(params) {
    try {
      const product = await ProductMDL.makeQueryOn("products")
        .find(params)
        .next();
      return product;
    } catch (err) {
      return console.log(err);
    }
  }
  static async findById(id) {
    try {
      const product = await ProductMDL.makeQueryOn("products")
        .find({
          _id: new ObjectId(id),
        })
        .next();
      return product;
    } catch (err) {
      return console.log(err);
    }
  }
  static async deleteById(prodId) {
    try {
      return ProductMDL.makeQueryOn("products").deleteOne({
        _id: new ObjectId(prodId),
      });
    } catch (error) {
      return console.log(error);
    }
  }
}
