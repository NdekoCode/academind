import Sequelize from "sequelize";
import slugify from "slugify";
import sequelize from "../utils/database.js";
const UserMDL = sequelize.define("user", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  username: Sequelize.STRING,
  email: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  firstname: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  lastname: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  address: Sequelize.STRING,
  slug: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});
export default UserMDL;
