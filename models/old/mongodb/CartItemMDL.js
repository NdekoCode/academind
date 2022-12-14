import Sequelize from "sequelize";
import sequelize from "../utils/database.js";
/** @type {Model} */
const CartItemMDL = sequelize.define("cartItem", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: true,
    primaryKey: true,
  },
  quantity: Sequelize.INTEGER,
});
export default CartItemMDL;
