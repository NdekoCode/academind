import { indexRand, loadFile, numberRand, ratingRand } from "../utils/utils.js";
import { readFile, writeFile } from "node:fs";

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
 *@type {Product[]}
 */
export const products = [
  {
    id: Date.now(),
    title: "Une belle chaussure",
    slug: function () {
      return slugify(this.title);
    },
    imageUrl: `https://loremflickr.com/g/500/320/product,book?lock=${indexRand}`,
    price: numberRand,
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    rating: ratingRand,
  },
];
/**
 * Represente le produit à vendre lui-meme
 */
export default class ProductFileMDL {
  /**
   * Creates an instance of ProductFileMDL.
   * @author NdekoCode
   * @param {Product} product
   * @memberof ProductFileMDL
   */
  constructor(product) {
    this.id = Date.now();
    this.title = product.title;
    this.price = product.price;
    this.slug = product.slug;
    this.description = product.description;
    this.rating = product.rating;
    this.imageUrl = product.imageUrl;
  }

  save() {
    ProductFileMDL.insertProductsInFile(this);
  }

  static getProductFromFile(cb, file = "products.json") {
    readFile(loadFile("data/" + file), (err, content) => {
      if (err) {
        cb([]);
        return [];
      } else {
        cb(JSON.parse(content));
        return JSON.parse(content);
      }
    });
  }
  static insertProductsInFile(newProduct, file = "products.json") {
    ProductFileMDL.getProductFromFile((products) => {
      products.push(newProduct);
      writeFile(
        loadFile("data/" + file),
        JSON.stringify(products, null, 2),
        (err) => console.log(err)
      );
    });
  }

  /**
   *
   * @returns {Product[]}
   */
  static fetchAll(cb) {
    return ProductFileMDL.getProductFromFile(cb);
  }
  static fetchOneBy({ key, value }, cb) {
    ProductFileMDL.getProductFromFile((prods) => {
      const product = prods.find((item) => item[key] === value);

      return cb(product);
    });
  }
  static findById(id, cb) {
    ProductFileMDL.getProductFromFile((products) => {
      const product = products.find((item) => id === item.id);
      return cb(product);
    });
  }
}
