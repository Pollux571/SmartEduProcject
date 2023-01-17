// ! 1-rince adim bir dosya actik controllers diye onun icine pageController.js e bunu yazdik

exports.getIndexPage = (req, res) => {
  res.status(200).render("index", {
    page_name: "index",
  });
};

exports.getAboutPage = (req, res) => {
  res.render("about", {
    page_name: "about",
  });
};

// ! 2 ci adim page routes dosyasi actik ve icnde pageRoute.js icine bunu yazdik

const express = require("express");
const pageController = require("../controllers/pageController"); // export ediyoruz.

const router = express.Router();

router.route("/").get(pageController.getIndexPage);
router.route("/about").get(pageController.getAboutPage);

module.exports = router;

// ! 3 ci adim get requestleri kisalltik app.js dosyamiz burasi ana dosya
const express = require("express");
const pageRoute = require("./routes/pageRoute");

const app = express();
// template Engine
app.set("view engine", "ejs");

// middleware
app.use(express.static("public"));

// routes
app.use("/", pageRoute); // ! buralar kisaldi gordugunuz gibi ve app.use kullaniyoruz artik butun sayfalar burdan gidebiliyoruz,cunku pageRouteden her seyi cekiyoruz


const port = 3000;
app.listen(port, (req, res) => {
  console.log(`this site started on port ${port} `);
});
