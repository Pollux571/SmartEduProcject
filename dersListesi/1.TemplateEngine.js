// ! https://app.patika.dev/courses/nodejs/LinkUpdates

// ? ilk adim
const express = require("express");
const app = express();

// Template Engine
// ? ikinci adim
app.set("view engine", "ejs");

// Routes
// ? ucuncu adim
app.get("/", (req, res) => {
  // renderi ejsi indirdiken sonra kullandik ve index.html ide  index.ejs yaptik. renderde ve res.send('index') ikiside calisiyor
  res.status(200).render("index");
});

app.get("/about", (req, res) => {
  // renderi ejsi indirdiken sonra kullandik ve about.html  ide  about.ejs yaptik. sonra renderledik ona kadar send kullaniyorduk
  // ! res.send("about");
  res.render("about");
});

const port = 3000;
app.listen(port, (req, res) => {
  console.log(`this site started on port ${port} `);
});
