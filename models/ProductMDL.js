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
  async save() {
    try {
      // collection() permet de dire quelle est la collection à laquelle on doit se connecter et faire des opération dessus, si cette collection n'existe pas elle sera créer
      await this.db.collection("products").insertOne(this);
    } catch (error) {
      return console.log(error);
    }
  }
}
