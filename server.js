import { createServer } from "node:http";
import fs from "node:fs";
import { fileURLToPath } from "url";
import path from "path";
import { readFile, writeFile } from "node:fs/promises";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const messagesFile = path.join(__dirname, "messages.json");
const port = process.env.PORT || 3500;
/** @type {*http.Server} */
const server = createServer(async (req, res) => {
  const url = new URL(req.url, `http://${req.headers.host}`);
  if (url.pathname === "/") {
    res.setHeader("Content-Type", "text/html");
    const file = fs.readFileSync("hello.txt");
    const mainPage = `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>My firtst page</title>
    </head>
    <body>
        <p>Content ${file.toString()}</p>
        <form action="/message" method="POST">
            <input type="text" name="message" />
            <button type="submit">Valider</button>
        </form>
    </body>
    </html>`;
    res.write(mainPage);
    return res.end();
  } else if (url.pathname === "/message" && req.method === "POST") {
    let body = [];
    req.on("data", (chuck) => {
      body.push(chuck);
    });
    req.on("end", async () => {
      const data = Buffer.concat(body).toString();
      const message = data.split("=")[1];
      try {
        await writeFile(
          messagesFile,
          JSON.stringify(
            {
              id: Date.now(),
              message,
            },
            null,
            2
          )
        );
      } catch (e) {
        return consolelog(e);
      }
    });
    res.statusCode = 302;
    res.setHeader("Location", "/");
    return res.end();
  }
  return res.end();
});
server.listen(port, () => console.log("Running server at " + port));
