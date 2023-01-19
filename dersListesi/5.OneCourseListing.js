// ! controlleri findById den findOne cevirdik
exports.getCourse = async (req, res) => {
  try {
    const course = await Course.findOne({ slug: req.params.slug });  // findByID >>> findOne yaptik, _idleride slug yaptik

    res.status(200).render("course", {
      page_name: "courses",
      course,
    });
  } catch (error) {
    res.status(404).json({
      status: "fail",
      error,
    });
  }
};

// ! route
router.route("/:id").get(courseController.getCourse);

// ? sonra course.ejs islemlerini yaptik

// ! slugify
// ? indir >>>>      npm i slugify@1.5.1
// ? sonra model olustur yada model varsa onun icine slug ekledik
const mongoose = require("mongoose");
const slugify = require("slugify");

const Schema = mongoose.Schema;
const CourseSchema = new Schema({
  slug: {
    type: String,
    unique: true,
  },
});

// ? sonra model middleware yaziyoruz

// normal fonksyion kullanmamizin sebebi this kavramina sahib olmasindan dolayi
CourseSchema.pre("validate", function (next) {
  this.slug = slugify(this.name, {  // this.name olmasinin sebebi sen bunun namediden slugu olustur demek
    lower: true, // kucuk harf olsun
    strict: true, // buda her hangi yazi karakterini birakip sadece stringleri okumayi sagliyor
  });
  next();
});
const Course = mongoose.model("Course", CourseSchema);
module.exports = Course;

// ! route guncelledik
const express = require("express");
const courseController = require("../controllers/courseController");

const router = express.Router();
router.route("/:slug").get(courseController.getCourse);  // _id iken slug yaptik

module.exports = router;
