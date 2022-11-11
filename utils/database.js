import dotenv from "dotenv";
dotenv.config();
import { MongoClient } from "mongodb";
let _db;
export default function mongoConnect(cb) {
  MongoClient.connect(process.env.DB_URL)
    .then((client) => {
      _db = client.db(); // Permet de se connecter à la base de donnée et lui passer aussi le nom de la base de donnée sur lequel on souhaite se connecter, nous on veut utiliser celle dans l'URL donc on ne lui passe rien
      cb();
      console.log("Connection to the database is establish successfully");
    })
    .catch((error) => {
      console.log("Connection to the database failed", error.message);
      throw error;
    });
}
/**
 * Va nous permettre d'avoir qu'une seule connexion à la base de donnéé grace au Mongodb connection pooling
 * @returns {Pooling}
 */
export function getDB() {
  if (_db) {
    return _db;
  }
  throw "No database Found";
}
