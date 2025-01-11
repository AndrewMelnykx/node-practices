import dotenv from "dotenv";
import http from "http";
import url from "url";
import path from "path";
dotenv.config();

import fs from "fs/promises";

const PORT = process.env.PORT;

//Get current path

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
console.log(__filename, __dirname);

const server = http.createServer(async (req, res) => {
  //   res.setHeader("Content-Type", "text/plain");
  //   res.write("<h1>Hello world!</h1>");
  //   res.statusCode = 404;
  //   res.writeHead(500, { "content-type": "application/json" });

  //   console.log(req.url);
  //   console.log(req.method);

  //Check oif GEt request

  try {
    if (req.method === "GET") {
      let filePath;
      if (req.url === "/") {
        filePath = path.join(__dirname, "public", "index.html");
      } else if (req.url === "/about") {
        filePath = path.join(__dirname, "public", "about.html");
      }
      const data = await fs.readFile(filePath);
      res.setHeader("Content-Type", "text/html");
      res.write(data);
      res.end();
    } else {
      throw new Error("Method not allowed");
    }
  } catch (error) {
    res.writeHead(500, { "Content-Type": "text/html" });
    res.end("Server error");
  }
});

server.listen(PORT, () => {
  console.log(`Sever running on port ${PORT}`);
});
