import { Sequelize } from "sequelize";
import sequelize from "../utils/database.js";
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
 *@type {ProductModel}
 */
const ProductMDL = sequelize.define("product", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  title: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  price: {
    type: Sequelize.DOUBLE,
    allowNull: false,
  },
  description: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  rating: {
    type: Sequelize.INTEGER,
    allowNull: true,
    default: 1,
  },
  imageUrl: {
    type: Sequelize.STRING,
    allowNull: false,
    default: "https://loremflickr.com/g/500/320/product,book?lock=5",
  },
  slug: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});
export default ProductMDL;
