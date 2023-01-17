const express = require("express");
const pageRoute = require("./routes/pageRoute");

const app = express();
// template Engine
app.set("view engine", "ejs");

// middleware
app.use(express.static("public")); // static dosyalarimiz publick klasorunun icinde olucak demek.

// routes
app.use("/", pageRoute);

const port = 3000;
app.listen(port, (req, res) => {
  console.log(`this site started on port ${port} `);
});
