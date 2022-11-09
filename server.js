// Template engine : === Moteur de template
import express from "express";
import adminrouter from "./routes/adminRT.js";
import shopRouter from "./routes/shopRT.js";
import { rootDir } from "./utils/utils.js";
import sequelize from "./utils/database.js";
import path from "node:path";

import ejsLayouts from "express-ejs-layouts";
import ErrorsCTRL from "./controllers/ErrorsCTRL.js";
import fakeData from "./utils/fakeData.js";
import ProductMDL from "./models/ProductMDL.js";
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
  UserMDL.findByPk(1).then((user) => {
    req.user = user;
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
ProductMDL.belongsTo(UserMDL, {
  constraints: true,
  onDelete: "CASCADE",
});
UserMDL.hasMany(ProductMDL);
// { force: true }
sequelize
  .sync()
  .then((result) => {
    /** @type {*http.Server} */
    // fakeData();
    return UserMDL.findByPk(1);
  })
  .then((user) => {
    if (!user) {
      return UserMDL.create({
        username: "Ndekocode",
        email: "arickbulakali@gmail.com",
        firstname: "Arick",
        lastname: "Bulakali",
        password: "Ndekocode",
        address: `Goma / Virunga No. 078`,
        slug: slugify("Ndekocode", { lower: true }),
      });
    }
    return user;
  })
  .then((user) => {
    console.log(user.dataValues);
    app.listen(PORT, () => {
      console.log("Running server at " + PORT);
    });
  })
  .catch((err) => {
    console.log(err);
  });
