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
import CartMDL from "./models/CartMDL.js";
import CartItemMDL from "./models/CartItemMDL.js";
import slugify from "slugify";
import OrderItem from "./models/OrderItemMDL.js";
import OrderMDL from "./models/OrderMDL.js";
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

// ---------- MANY TO ONE --------------
// Un produit appartient à plusieurs utilisateurs
ProductMDL.belongsTo(UserMDL, {
  constraints: true,
  onDelete: "CASCADE",
});
// Un utilisateur peut avoir plusieurs produit
UserMDL.hasMany(ProductMDL);
//----------END MANY TO ONE --------------

// ---------- ONE TO MANY----------------
// Un utilisateur ne peut avoir qu'un seul panier
UserMDL.hasOne(CartMDL);

// Un panier appartient à plusieurs utilisateur
CartMDL.belongsTo(UserMDL);
// ----------END ONE TO MANY --------------

// --------- MANY TO MANY ---------------
// Une carte a plusieurs produit
CartMDL.belongsToMany(ProductMDL, { through: CartItemMDL });

// Un produit a plusieurs panier selon les utilisateur
ProductMDL.belongsToMany(CartMDL, { through: CartItemMDL });
// ---------- END MANY TO MANY ---------------

// --------- MANY TO ONE ---------------
// Une commande appartient à plusieurs utilisateurs car une commande peut etre faite par plusieurs utilisateur
OrderMDL.belongsTo(UserMDL);

// Un utilisateur a plusieurs commande:
UserMDL.hasMany(OrderMDL);
// --------- END MANY TO ONE ---------------

// --------- MANY TO MANY ---------------
// Une commande appartient à plusieurs produits càd une produit peut avoir plusieurs commande et un produit a plusieur commande : through represente la table pivot
OrderMDL.belongsToMany(ProductMDL, { through: OrderItem });

// { force: true }
sequelize
  // .sync({ force: true })
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
