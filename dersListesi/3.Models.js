// ! 1-  modules yazmak icin ilk once  mongoose indiririz npm i mongoose olarak. sonra connectrine yapariz database ile app.jsde burasi
const mongoose = require("mongoose");

mongoose
  .connect('"mongodb://127.0.0.1:27017/smartedu-db', {
    useNewUrlParser: true,
    useUnifiedTopology: true, // bunlar deprecate hatalarini onlemek icin
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => {
    // ? then yazmamizin sebebi mongoose.connect bize bir promise doner o yuzden yazmak sart degil biz oylesine yazdik
    console.log("db connected sucesfully");
  });

// ! 2- sonra module yazariz ve burdaki properteilere  verileri gondeririz models klasorun icinde bir js dosyasina

const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const CourseSchema = new Schema({
  name: {
    type: String,
    unique: true, // zorunl olucak demek
    required: true, // zorunlu olucak demek
  },
  description: {
    type: String,
    required: true,
    trim: true, // Mesala biz burda diyelim kurs tanimini girdik ve diyelim yazimizda bosluklar var onden ver arkdan. bu bosluklari kaldirmamizi saglar trim:true
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
      course, // burasi bize course doner yukardaki body olani sorguladigimiz
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

// http://localhost:3000/courses
// router.route("/") sadece (/) olsada bir sey olmazdi cunku app jsde app.use("/courses", courseRoute); course route caigiriyor.
router.route("/courses").post(courseController.createCourse);

module.exports = router;

// ! 5 - adimda onlari app.js import ettik
const courseRoute = require("./routes/courseRoute");
app.use("/courses", courseRoute);
