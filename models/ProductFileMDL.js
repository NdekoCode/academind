import { writeFile } from "node:fs";
import { indexRand, loadFile, numberRand, ratingRand } from "../utils/utils.js";
import MDLFile from "./MDLFile.js";

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
export default class ProductFileMDL extends MDLFile {
  /**
   * Creates an instance of ProductFileMDL.
   * @author NdekoCode
   * @param {Product} product
   * @memberof ProductFileMDL
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
      const product = products.find((item) => {
        return item.id === id;
      });
      return cb(product);
    });
  }

  save() {
    this.insertProductsInFile(this);
  }

  static deleteById(id) {
    console.log(id);
    this.getProductFromFile((products) => {
      const newProduct = products.filter((item) => item.id !== id);
      writeFile(
        loadFile("data/products.json"),
        JSON.stringify(newProduct, null, 2),
        (err) => console.log(err)
      );
    });
  }
  insertProductsInFile(newProduct, file = "products.json") {
    ProductFileMDL.getProductFromFile((products) => {
      if (this.id) {
        const existingProductIndex = products.findIndex(
          (prod) => prod.id === this.id
        );
        const updatedProducts = [...products];
        updatedProducts[existingProductIndex] = this;
        writeFile(
          loadFile("data/" + file),
          JSON.stringify(updatedProducts, null, 2),
          (err) => console.log(err)
        );
      } else {
        newProduct.id = Date.now();
        products.push(newProduct);
        writeFile(
          loadFile("data/" + file),
          JSON.stringify(products, null, 2),
          (err) => console.log(err)
        );
      }
    });
  }
}
