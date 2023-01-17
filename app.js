const express = require("express");
const app = express();

// template Engine
app.set("view engine", "ejs");

// middleware
app.use(express.static("public")); // static dosyalarimiz publick klasorunun icinde olucak demek.

const port = 3000;

app.get("/", (req, res) => {
  res.status(200).render("index", {
    page_name: "index",
  }); // renderi ejsi indirdiken sonra kullandik index.ejs yaptik.
});

app.get("/about", (req, res) => {
  res.render("about", {
    page_name: "about",
  });
});

app.listen(port, (req, res) => {
  console.log(`this site started on port ${port} `);
});
