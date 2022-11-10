import { Sequelize } from "sequelize";
import sequelize from "../utils/database.js";
/** @type {Model} */
const OrderItemMDL = sequelize.define("orderItem", {
  id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  address: Sequelize.STRING,
});
export default OrderItemMDL;
