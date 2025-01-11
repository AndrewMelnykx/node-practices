import { createServer } from "http";
import dotenv from "dotenv";
dotenv.config();

const PORT = process.env.PORT || 8000;

const users = [
  { id: 1, name: "Jane" },
  { id: 2, name: "Jim" },
  { id: 3, name: "John" },
];
//Logger middleware
const logger = (req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
};

//JSON middleware
const jsonMiddleware = (req, res, next) => {
  res.setHeader("Content-Type", "application/json");
  next();
};

//Route handler for GET /api/users

const getUserHandler = (req, res) => {
  res.write(JSON.stringify(users));
  res.end();
};

//Route handler for GET /api/users/:id

const getUserByIdHandler = (req, res) => {
  const id = parseInt(req.url.split("/")[3]);
  const user = users.find((user) => user.id === id);
  if (user) {
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify(user));
  } else {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "User not found" }));
  }
};
//notFound handler

const notFoundHandler = (req, res) => {
  res.writeHead(404, { "Content-Type": "application/json" });
  res.end(JSON.stringify({ message: "Route not found" }));
};

//Route handler for POST request /api/users

const createUserHandler = (req, res) => {
  let body = "";
  //List for the data
  req.on("data", (chunk) => {
    body += chunk.toString();
  });
  +req.on("end", () => {
    try {
      const newUser = JSON.parse(body); // This will throw an error if the JSON is invalid
      users.push(newUser);
      res.statusCode = 201;
      res.end(JSON.stringify(newUser));
    } catch (error) {
      res.writeHead(400); // Bad Request
      res.end(JSON.stringify({ message: "Invalid JSON format" }));
    }
  });
};

// const server = createServer((req, res) => {
//   logger(req, res, () => {
//     if (req.url === "/api/users" && req.method === "GET") {
//       res.setHeader("Content-Type", "application/json");
//       res.end(JSON.stringify(users));
//     } else if (
//       req.url.match(/\/api\/users\/([0-9]+)/) &&
//       req.method === "GET"
//     ) {
//     } else {
//       res.writeHead(404, { "Content-Type": "application/json" });
//       res.end(JSON.stringify({ message: "Route not found" }));
//     }
//   });
// });
const server = createServer((req, res) => {
  logger(req, res, () => {
    jsonMiddleware(req, res, () => {
      if (req.url === "/api/users" && req.method === "GET") {
        getUserHandler(req, res);
      } else if (
        req.url.match(/\/api\/users\/([0-9]+)/) &&
        req.method === "GET"
      ) {
        getUserByIdHandler(req, res);
      } else if (req.url === "/api/users" && req.method === "POST") {
        createUserHandler(req, res);
      } else {
        notFoundHandler(req, res);
      }
    });
  });
});

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
