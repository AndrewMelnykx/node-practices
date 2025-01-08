import http from "http";
const PORT = 8000;

const server = http.createServer((req, res) => {
  res.write("Hello world!");
  res.end();
});

server.listen(PORT, () => {
  console.log(`Sever running on port ${PORT}`);
});
