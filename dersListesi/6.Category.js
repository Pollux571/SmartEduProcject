// ! 1 - Ilk once Category.js de category Schemamizi olsuturduk
const mongoose = require("mongoose");
const slugify = require("slugify");
const Schema = mongoose.Schema;

const CategorySchema = new Schema({
  name: {
    type: String,
    unique: true,
    required: true,
  },
  slug: {
    type: String,
    unique: true,
  },
});

CategorySchema.pre("validate", function (next) {
  this.slug = slugify(this.name, {
    lower: true,
    strict: true,
  });
  next();
});

const Category = mongoose.model("Category", CategorySchema);
module.exports = Category;

// ! 2 - sonra Course.js Course schemamiza categorimize sunu ekledik
/*
category:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'Category'
  }
  */

const CourseSchema = new Schema({
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
  },
});

// ! 3 - sonra controllerini yazdik
const Category = require("../models/Category");

exports.createCategory = async (req, res) => {
  try {
    const category = await Category.create(req.body);

    res.status(201).json({
      status: "success",
      category,
    });
  } catch (error) {
    res.status(404).json({
      status: "fail",
      error,
    });
  }
};

// ! 4 - sonra routeni yazdik burasi post route
const express = require("express");
const categoryController = require("../controllers/categoryController");

const router = express.Router();

router.route("/").post(categoryController.createCategory);   // http://localhost:3000/categories

module.exports = router;

// ! 5 - app.js dosyamiza import ettik
const express = require("express");
const mongoose = require("mongoose");
const categoryRoute = require('./routes/categoryRoute');

const app = express();

// DB connect
mongoose.connect('mongodb://127.0.0.1:27017/smartedu-db', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
});
// template Engine
app.set("view engine", "ejs");

// middleware
app.use(express.static("public")); // static dosyalarimiz publick klasorunun icinde olucak demek.
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

// routes

app.use("/categories", categoryRoute);

const port = 3000;
app.listen(port, (req, res) => {
  console.log(`this site started on port ${port} `);
});

// ! 6 - Postmande post medotu ile sunu gonderik test amacli
// http://localhost:3000/courses
{
    "name":"Java 101",
    "description":"Java 101 description",
    "category":"63c992e3d3c0dc334ce3e4f6"
}

// ! 7 - Postmanden gelen veriler ulsamak icin sunlari gonderdik burasi  courseController.js
const Category = require("../models/Category");
exports.getAllCourses = async (req, res) => {
    try {

    const categorySlug = req.query.categories;                       //! ---------
    const category = await Category.findOne({ slug: categorySlug }); //! ---------
    let filter = {};                        //! ---------
    if (categorySlug) {                    //! ---------
      filter = { category: category._id }; //! ---------
    }                                      //! ---------

        const courses = await Course.find();
        const categories = await Category.find();  // ! -------

        res.status(200).render("courses", {
          page_name: "courses",
          courses,
          categories        // ! ------
        });
      } catch (error) {
        res.status(404).json({
          status: "fail",
          error,
        });
      }
    };
