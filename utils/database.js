import dotenv from "dotenv";
dotenv.config();
import mongodb, { MongoClient } from "mongodb";
export default function mongoConnect(cb) {
  MongoClient.connect(process.env.DB_URL)
    .then((client) => {
      cb(client);
      console.log("Connection to the database is establish successfully");
    })
    .catch((error) => {
      console.log("Connection to the database failed", error.message);
    });
}
