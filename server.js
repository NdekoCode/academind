import { createServer } from "node:http";
// Template engine : === Moteur de template
import express from "express";
import adminrouter from "./routes/adminRT.js";
import shopRouter from "./routes/shopRT.js";
import { rootDir } from "./utils/utils.js";
import path from "node:path";
import ejsLayouts from "express-ejs-layouts";
import ErrorsCTRL from "./controllers/ErrorsCTRL.js";

const app = express();
app.use(express.urlencoded({ extended: false }));

// On fait la configuration des fichiers static: Pour le styles, les scripts et les images lors des upload
app.use(express.static(path.join(rootDir, "public")));
app.use("/images", express.static(path.join(rootDir, "public/img")));

// On definit les configuration des notre moteur de template et des views
app.set("view engine", "ejs");
app.use(ejsLayouts);
app.set("views", rootDir + "views");
app.set("layout", "layouts/layout");

// Nos routes et nos middleware
app.use("/admin", adminrouter);
app.use(shopRouter);
const errorsCTRL = new ErrorsCTRL();
// Le middleware par defaut pour les requetes 404
app.use(errorsCTRL.getError404);

// Notre port
const port = process.env.PORT || 3500;

/** @type {*http.Server} */
const server = createServer(app);
server.listen(port, () => {
  console.log("Running server at " + port);
});
