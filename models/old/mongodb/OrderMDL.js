import { Sequelize } from "sequelize";
import sequelize from "../utils/database.js";
/** @type { Model} */
const OrderMDL = sequelize.define("order", {
  id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
});
export default OrderMDL;
