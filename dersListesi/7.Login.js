// ! 1 - ilk once USER modelimizi olusturduk. User.js

const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const User = mongoose.model("User", UserSchema);
module.exports = User;

// ! 2  -  sonra routumuzu olustrudk  pageController.js burasi

exports.getRegisterPage = (req, res) => {
  res.render("register", {
    page_name: "register",
  });
};

// ! 3 - sonra routmuzu yazdk          pageRoute.js burasi
router.route("/register").get(pageController.getRegisterPage); // 6:08 den itibaren izle istersen  https://app.patika.dev/courses/nodejs/RegisterAndBcrypt

// todo: ARTIK BURDAN SONRA ASIL ISLEM BASLIYOR  authentication islemleri .

// ! 4 - ilk once authController.js  dosyasi olusturduk ve sunu yazdik

const User = require("../models/User");

exports.createUser = async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json({
      status: "success",
      user,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error,
    });
  }
};

// ! 5 - sonra userRoute.js olusturduk oraya route islemerini yazicaz

const express = require("express");
const authController = require("../controllers/authController");

const router = express.Router();

router.route("/signup").post(authController.createUser);  // https://localhost:3000/users/signup

module.exports = router;

// ! 6 - sonra app.js de bunlari cagirdik .
const userRoute = require('./routes/userRoute');
app.use('/users', userRoute);

// ! 7 sonra register sayfamizdan register yaptik. mongodbye obje gonderdik

{
    "status": "success",
    "user": {
        "_id": "63cba7b936d462248c8bbace",
        "name": "Suleyman",
        "email": "tashkentCity@mail.ru",
        "password": "ttz23787888",
        "__v": 0
    }
}
// ! 8 - sonra npm i bcrypt@5.0.1 bcrypt paketini indirdik cubku kullanicilarin sifrelerini gizlemek icin lazim  Библиотека, которая поможет вам хешировать пароли. ve bize gelen verileri kaydetmenden once sifreleri gizlememiz lazim onun icinde birtane pre middlware yaziyoruz.
// ? user.js icinde models dosyanin.

const bcrypt = require("bcrypt");
UserSchema.pre("save", function (next) {
    const user = this;
    bcrypt.hash(user.password, 10, (error, hash) => {
      user.password = hash;
      next();
    });
  });