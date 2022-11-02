import { createServer } from "node:http";
// Template engine : === Moteur de template
import express from "express";
import adminrouter from "./routes/admin.js";
import shopRouter from "./routes/shop.js";
import { loadFile } from "./utils/utils.js";
const app = express();
app.use(express.urlencoded({ extended: false }));

app.use("/admin", adminrouter);

app.use(shopRouter);
app.use((req, res) => {
  return res.status(404).sendFile(loadFile("views/404.html"));
});

const port = process.env.PORT || 3500;

/** @type {*http.Server} */
const server = createServer(app);
server.listen(port, () => console.log("Running server at " + port));
