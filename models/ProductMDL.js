import { ObjectId } from "mongodb";
import ErrorsCTRL from "../controllers/ErrorsCTRL.js";
import MDL from "./MDL.js";
/**
 * Represente le produit à vendre lui-meme
 */
export default class ProductMDL extends MDL {
  /**
   * Creates an instance of ProductMDL.
   * @author NdekoCode
   * @param {Product} product
   * @memberof ProductMDL
   */
  collection = "products";
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
      const products = await ProductMDL.makeQueryOn().find().toArray();
      return products;
    } catch (err) {
      return console.log(err);
    }
  }
  static async findOneBy(params) {
    try {
      const product = await ProductMDL.makeQueryOn().find(params).next();
      return product;
    } catch (err) {
      return console.log(err);
    }
  }
  static async findById(id) {
    try {
      const product = await ProductMDL.makeQueryOn()
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
      return ProductMDL.makeQueryOn().deleteOne({
        _id: new ObjectId(prodId),
      });
    } catch (error) {
      return console.log(error);
    }
  }
}
