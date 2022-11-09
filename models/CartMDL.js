import Sequelize, { define } from "sequelize";
import sequelize from "../utils/database.js";

const CartMDL = define("cart", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
});
export default CartMDL;
