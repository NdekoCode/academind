import dotenv from "dotenv";
dotenv.config();
import Sequelize from "sequelize";
const paramsConnexion = [
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
];
const sequelize = new Sequelize(...paramsConnexion, {
  dialect: "mysql",
  host: process.env.DB_HOST,
});
export default sequelize;
