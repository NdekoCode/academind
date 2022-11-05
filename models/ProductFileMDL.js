import { indexRand, loadFile, numberRand, ratingRand } from "../utils/utils.js";
import { readFile, writeFile } from "node:fs";

/**
 * Le produit à vendre
 * @typedef {object} Product
 * @property {number} [id=Date.now()] L'identifiant de l'article
 * @property {string} title Titre de l'article
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
    this.description = product.description;
    this.rating = product.rating;
    this.imageUrl = product.imageUrl;
  }

  save() {
    ProductFileMDL.insertProductsInFile(this);
  }

  static getProductFromFile(cb) {
    readFile(loadFile("data/products.json"), (err, content) => {
      if (err) {
        cb([]);
      } else {
        cb(JSON.parse(content));
      }
    });
  }
  static insertProductsInFile(newProduct) {
    ProductFileMDL.getProductFromFile((products) => {
      products.push(newProduct);
      writeFile(
        loadFile("data/products.json"),
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
}
