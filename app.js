const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const pageRoute = require("./routes/pageRoute");
const courseRoute = require("./routes/courseRoute");
const categoryRoute = require("./routes/categoryRoute");
const userRoute = require("./routes/userRoute");

const app = express();

// DB connect
mongoose.connect("mongodb://127.0.0.1:27017/smartedu-db", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
});
// template Engine
app.set("view engine", "ejs");

// global Variable
// ? global degisken olusturmak
global.userIN = null; // global burda bir nesne userIN burda degisken null false esittir

// middleware
app.use(express.static("public")); // static dosyalarimiz publick klasorunun icinde olucak demek.
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(
  session({
    secret: "my_keyboard_cat",
    resave: false,
    saveUninitialized: true,
    // cookie:{secure:true}  1.17 den versiyondan sonra kullanmaya gerek yok kaldirildi
  })
);

// routes
app.use("*", (req, res, next) => {
  userIN = req.session.userID;
  next();
});
app.use("/", pageRoute);
app.use("/courses", courseRoute);
app.use("/categories", categoryRoute);
app.use("/users", userRoute);

const port = 3000;
app.listen(port, (req, res) => {
  console.log(`this site started on port ${port} `);
});
