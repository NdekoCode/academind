import dotenv from "dotenv";
import express from "express";
import { connect } from "mongoose";
dotenv.config();
// Template engine : === Moteur de templateimport express from "express";
import mongoStore from "connect-mongo";
import ejsLayouts from "express-ejs-layouts";
import session from "express-session";
import path from "node:path";
import ErrorsCTRL from "./controllers/ErrorsCTRL.js";
import adminRouter from "./routes/admin.routes.js";
import authRouter from "./routes/auth.routes.js";
import shopRouter from "./routes/shop.routes.js";
import { rootDir } from "./utils/utils.js";

// import fakeData from "./utils/fakeData.js";
// import mongoConnect from "./utils/database.js";
import UserMDL from "./models/UserMDL.js";
/* const MongodbStore = new mongoStore(session);
const store = new MongodbStore({
  uri: "mongodb+srv://node-discovery:7oTDxpZxx5DmF3R7@mycluster.q6bzft9.mongodb.net/node-complete-shop",
  collection: "mySessions",
}); */
const app = express();

// On fait la configuration des fichiers static: Pour le styles, les scripts et les images lors des upload
// On definit les configuration des notre moteur de template et des views
app.set("view engine", "ejs");
app.use(ejsLayouts);
app.set("views", rootDir + "views");
app.set("layout", "layouts/layout");
app.use(express.static(path.join(rootDir, "public")));
app.use("/images", express.static(path.join(rootDir, "public/img")));
app.use(
  session({
    store: mongoStore.create({ mongoUrl: process.env.DB_URL }),
    secret: process.env.SECRET_WORD_SESSION,
    // La session ne sera pas enregistrer pour chaque requete
    resave: false,
    // Nous rassure que une session ne sera pas enregister si ce n'est pas nécessaire
    // ne créez pas de session jusqu'à ce que quelque chose soit stocké
    saveUninitialized: false,
  })
);
// await fakeData();
// On definit la configuration pour que les requetes de l'utilisateur soit transmises dans le corps de la requete
app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
  console.log(req.isLoggedIn);
  UserMDL.findById("6371167715fd4e0cd219c160")
    .then((user) => {
      req.user = new UserMDL(user);
      next();
    })
    .catch((err) => {
      console.log(err);
      next(err);
    });
});
app.use(authRouter);
// Nos routes et nos middleware
app.use("/admin", adminRouter);
app.use(shopRouter);
const errorsCTRL = new ErrorsCTRL();
// Le middleware par defaut pour les requetes 404
app.use(errorsCTRL.getError404);
// Notre port
const PORT = process.env.PORT || 3500;
app.set("port", PORT);

connect(process.env.DB_URL)
  .then(() => {
    // Ainsi on ne va se connecter à la base de donnée qu'une seule fois, au moment où le serveur est lancer: => !GOOD PATTERN
    // fakeData();
    app.listen(PORT, () => {
      console.log("Running server at http://localhost:" + PORT);
      console.log("Connection to the database is establish successfully");
    });
  })
  .catch((err) => {
    console.log("Connection to the database failed", err.message);
  });
