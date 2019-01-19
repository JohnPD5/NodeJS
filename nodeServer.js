const http = require("http");
const fs = require("fs");
const path = require("path");

const port = 5000;

const server = http.createServer((req, res) => {
  let stream = fs.createReadStream(path.join(__dirname, req.url));
  stream.on("error", () => {
    res.writeHead(404);
    res.end();
  })
  res.writeHead(200, {"Content-Type": "text/html"});
  stream.pipe(res);
});

server.listen(port, () => console.log(`Server running at http://localhost:${port}`));