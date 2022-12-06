import { Sequelize } from "sequelize";
import sequelize from "../utils/database.js";
/**
 * @typedef {object} CartModel La carte model de l'UTILISATEUR
 * @property {number} id l'identifiant de la carte
 *
 */
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
