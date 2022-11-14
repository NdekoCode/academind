import dotenv from "dotenv";
dotenv.config();
import express from "express";
import { connect } from "mongoose";
import session from "express-session";
// Template engine : === Moteur de templateimport express from "express";
import authRouter from "./routes/auth.routes.js";
import adminRouter from "./routes/admin.routes.js";
import shopRouter from "./routes/shop.routes.js";
import { rootDir } from "./utils/utils.js";
import path from "node:path";
import ejsLayouts from "express-ejs-layouts";
import ErrorsCTRL from "./controllers/ErrorsCTRL.js";
// import fakeData from "./utils/fakeData.js";
// import mongoConnect from "./utils/database.js";
import fakeData from "./utils/fakeData.js";
import UserMDL from "./models/UserMDL.js";
const app = express();
app.use(
  session({
    // Le mot secret pour hasher la session mais en production ça doit etre une très longue chaine de caractère
    secret: "Ndekocode",
    // Ca veut dire que notre session ne sera pas enregistrer pour chaque requete de l'utilisateur et donc il le sera une seule fois, c'est bien pour les performances.
    resave: false,
    //  Assure que la session ne sera de nouveau enregistrer que lorsqu'il aura de changement et pas autrement
    saveUninitialized: false,
    // On peut aussi ajouter d'autres paramètres comme: cookie:{maxAge: dateinMillisecond,expires}
  })
);
// On fait la configuration des fichiers static: Pour le styles, les scripts et les images lors des upload
// On definit les configuration des notre moteur de template et des views
app.set("view engine", "ejs");
app.use(ejsLayouts);
app.set("views", rootDir + "views");
app.set("layout", "layouts/layout");
app.use(express.static(path.join(rootDir, "public")));
app.use("/images", express.static(path.join(rootDir, "public/img")));
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
      next();
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
      console.log("Running server at " + PORT);
      console.log("Connection to the database is establish successfully");
    });
  })
  .catch((err) => {
    console.log("Connection to the database failed", err.message);
  });
