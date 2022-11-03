import { indexRand, numberRand, ratingRand } from "../utils/utils.js";

/**
 * Le produit à vendre
 * @typedef {object} Product
 * @property {string} title Titre de l'article
 * @property {number} price Le prix de l'article
 * @property {string} description description de l'article
 * @property {string} imageUrl image de l'article
 * @property {number} rating La note de l'article
 */

/**
 *@type {Product[]}
 */
export const products = [
  {
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
  constructor(title) {
    const index = indexRand + 1;
    this.product = {
      title,
      price: numberRand,
      imageUrl: `https://loremflickr.com/g/500/320/product,book?lock=${index}`,
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
      rating: ratingRand,
    };
  }

  save() {
    products.push(this);
  }

  /**
   *
   * @returns {Product[]}
   */
  static fetchAll() {
    return products;
  }
}
