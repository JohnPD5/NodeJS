const express = require("express");
const path = require("path");

const port = 5000;
const server = express();

// Set the template engine
server.set("view engine", "pug");
// Set the path of templates
server.set("views", path.join(__dirname, "templates"));
// Set the path of static files
server.use("/public", express.static(path.join(__dirname, "public")));

server.get("/", (req, res) => {
  res.render("home");
})

server.listen(port, () => console.log(`Server running at http://localhost:${port}`));