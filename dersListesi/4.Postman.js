// ! 1-  modules yazmak icin ilk once  mongoose indiririz npm i mongoose olarak. sonra connectrine yapariz database ile app.jsde burasi
const mongoose = require("mongoose");

mongoose
  .connect('"mongodb://127.0.0.1:27017/smartedu-db', {
    useNewUrlParser: true,
    useUnifiedTopology: true, /
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => {
console.log("db connected sucesfully");
  });

// ! 2- sonra module yazariz ve burdaki properteilere  verileri gondeririz models klasorun icinde bir js dosyasina

const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const CourseSchema = new Schema({
  name: {
    type: String,
    unique: true,
    required: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// ? Syntax =>> const Blog = mongoose.model(modelName(Blog), ourSchemaName)
const Course = mongoose.model("Course", CourseSchema);
module.exports = Course;

// ! 3- simdide course controllerimizi olusturucaz.
const Course = require("../models/Course");

exports.createCourse = async (req, res) => {
  const course = await Course.create(req.body);

  try {
    res.status(201).json({
      status: "success",
      course,
    });
  } catch {
    res.status(404).json({
      status: "fail",
      error,
    });
  }
};

// ! 4 - route olusturduk bunun icin
const express = require("express");
const courseController = require("../controllers/courseController");

const router = express.Router();


router.route("/").post(courseController.createCourse);

module.exports = router;

// ! 5 - adimda onlari app.js import ettik
const courseRoute = require("./routes/courseRoute");
app.use("/courses", courseRoute);

// ! 6 - adim
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// ! 7 - adim postmanden  http://localhost:3000/courses suraya sunu gonder post metod olarak
{
    "name":"Python for Beginner",
    "description":"Python description"

}