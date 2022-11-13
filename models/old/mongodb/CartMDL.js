import { Sequelize } from "sequelize";
import sequelize from "../utils/database.js";

/** @type {  Model} */
const CartMDL = sequelize.define("cart", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
});
export default CartMDL;
