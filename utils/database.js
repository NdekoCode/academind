import dotenv from "dotenv";
dotenv.config();
import mysql from "mysql2";
console.log();
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  database: process.env.DB_NAME,
  password: process.env.DB_PASS,
});
const db = pool.promise();
export default db;
