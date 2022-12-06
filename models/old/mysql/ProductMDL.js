import CartMDL from "./CartMDL.js";
import slugify from "slugify";
import db from "../utils/database.js";
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
 * Represente le produit à vendre lui-meme
 */
export default class ProductMDL extends MDL {
  /**
   * Creates an instance of ProductMDL.
   * @author NdekoCode
   * @param {Product} product
   * @memberof ProductMDL
   */
  constructor(product) {
    super();
    this.id = product.id;
    this.title = product.title;
    this.price = parseFloat(product.price);
    this.slug = product.slug;
    this.description = product.description;
    this.rating = parseInt(product.rating);
    this.imageUrl = product.imageUrl;
  }

  /**
   *
   * @returns {Product[]}
   */
  static async fetchAll() {
    return db.execute("SELECT * FROM products");
  }
  static async fetchOneBy({ key, value }) {
    return db.execute(`SELECT * FROM products WHERE ${key}=?`, [value]);
  }
  static findById(id) {
    return db.execute(`SELECT * FROM products WHERE id=?`, [id]);
  }
  update() {
    return db.execute(
      "UPDATE products SET title=?,description=?,price=?,imageUrl=?,rating=?,slug=? WHERE id=?",
      [
        this.title,
        this.description,
        this.price,
        this.imageUrl,
        this.rating,
        slugify(this.title, { lower: true }),
        this.id,
      ]
    );
  }
  save() {
    return db.execute(
      "INSERT INTO products(title,description,price,imageUrl,rating,slug) VALUES(?,?,?,?,?,?)",
      [
        this.title,
        this.description,
        this.price,
        this.imageUrl,
        this.rating,
        slugify(this.title, { lower: true }),
      ]
    );
  }

  static deleteById(id) {
    return ProductMDL.findById(id)
      .then(([data]) => {
        if (data) {
          return db.execute("DELETE FROM products WHERE id=?", [data[0].id]);
        }
      })
      .catch((err) => console.log(err));
  }
}
