import { createServer } from "node:http";
import { requestHandle } from "./routes.js";
const port = process.env.PORT || 3500;
/** @type {*http.Server} */
const server = createServer(requestHandle);
server.listen(port, () => console.log("Running server at " + port));

console.log("Lol");
