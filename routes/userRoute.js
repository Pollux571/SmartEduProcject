const express = require("express");
const authController = require("../controllers/authController");

const router = express.Router();

router.route("/signup").post(authController.createUser); // https://localhost:3000/users/signup
router.route("/login").post(authController.loginUser);
router.route("/logout").get(authController.logoutUser);
router.route("/dashboard").get(authController.getDashboardPage); // https://localhost:3000/users/dashboard
module.exports = router;
