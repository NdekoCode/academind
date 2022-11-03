import { createServer } from "node:http";
// Template engine : === Moteur de template
import express from "express";
import adminrouter from "./routes/admin.js";
import shopRouter from "./routes/shop.js";
import { rootDir } from "./utils/utils.js";
import path from "node:path";
import ejsLayouts from "express-ejs-layouts";

const app = express();
app.use(express.urlencoded({ extended: false }));

// On definit les configuration des notre moteur de template et des views
app.set("view engine", "ejs");
app.use(ejsLayouts);
app.set("layout", "layouts/layout");
app.set("views", rootDir + "views");

// On fait la configuration des fichiers static: Pour le styles, les scripts et les images lors des upload
app.use(express.static(path.join(rootDir, "public")));
app.use("/images", express.static(path.join(rootDir, "public/img")));

// Nos routes et nos middleware
app.use("/admin", adminrouter);
app.use(shopRouter);

// Le middleware par defaut pour les requetes 404
app.use((req, res) => {
  return res.status(404).render("pages/404", { title: "Page Not found" });
});

// Notre port
const port = process.env.PORT || 3500;

/** @type {*http.Server} */
const server = createServer(app);
server.listen(port, () => {
  console.log("Running server at " + port);
});
