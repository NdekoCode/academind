import Sequelize from "sequelize";
import sequelize from "../utils/database.js";
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
