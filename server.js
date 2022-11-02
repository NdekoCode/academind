import { createServer } from "node:http";
import express from "express";
const app = express();
const port = process.env.PORT || 3500;
/** @type {*http.Server} */
const server = createServer(app);
server.listen(port, () => console.log("Running server at " + port));

console.log("Lol");
