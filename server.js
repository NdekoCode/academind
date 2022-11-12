// Template engine : === Moteur de templateimport express from "express";
import adminrouter from "./routes/adminRT.js";
import shopRouter from "./routes/shopRT.js";
import { rootDir } from "./utils/utils.js";
import path from "node:path";
import express from "express";
import ejsLayouts from "express-ejs-layouts";
import ErrorsCTRL from "./controllers/ErrorsCTRL.js";
// import fakeData from "./utils/fakeData.js";
import mongoConnect from "./utils/database.js";
import fakeData from "./utils/fakeData.js";
import UserMDL from "./models/UserMDL.js";
const app = express();
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
  UserMDL.findById("636e8a5cd34b1b05392d227d")
    .then((user) => {
      req.user = new UserMDL(user);
      next();
    })
    .catch((err) => {
      console.log(err);
      next();
    });
});
// Nos routes et nos middleware
app.use("/admin", adminrouter);
app.use(shopRouter);
const errorsCTRL = new ErrorsCTRL();
// Le middleware par defaut pour les requetes 404
app.use(errorsCTRL.getError404);
// Notre port
const PORT = process.env.PORT || 3500;
app.set("port", PORT);

mongoConnect(() => {
  // Ainsi on ne va se connecter à la base de donnée qu'une seule fois, au moment où le serveur est lancer: => !GOOD PATTERN
  // fakeData();
  app.listen(PORT, () => {
    console.log("Running server at " + PORT);
  });
});
