import { createServer } from "node:http";
// Template engine : === Moteur de template
import express from "express";
import adminrouter from "./routes/admin.js";
import shopRouter from "./routes/shop.js";
import { loadFile, rootDir } from "./utils/utils.js";
import path from "node:path";
import ejsLayouts from "express-ejs-layouts";
const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(rootDir, "public")));
app.set("view engine", "ejs");
app.use(ejsLayouts);
app.set("layout", "layouts/layout");
app.set("views", rootDir + "views");
app.use("/images", express.static(path.join(rootDir, "public/img")));

app.use("/admin", adminrouter);

app.use(shopRouter);
app.use((req, res) => {
  return res.status(404).render("pages/404", { title: "Page Not found" });
});

const port = process.env.PORT || 3500;

/** @type {*http.Server} */
const server = createServer(app);
server.listen(port, () => console.log("Running server at " + port));
