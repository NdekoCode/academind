import { createServer } from "node:http";
import express from "express";
import adminrouter from "./routes/admin.js";
import shopRouter from "./routes/shop.js";
const app = express();

app.use(express.urlencoded({ extended: false }));

app.use(adminrouter);

app.use(shopRouter);

const port = process.env.PORT || 3500;

/** @type {*http.Server} */
const server = createServer(app);
server.listen(port, () => console.log("Running server at " + port));
