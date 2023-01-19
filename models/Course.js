const mongoose = require("mongoose");
const slugify = require("slugify");

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
  slug: {
    type: String,
    unique: true,
  },
});

// normal fonksyion kullanmamizin sebebi this kavramina sahib olmasindan dolayi
CourseSchema.pre("validate", function (next) {
  this.slug = slugify(this.name, {
    lower: true, // kucuk harf olsun
    strict: true, // buda her hangi yazi karakterini birakip sadece stringleri okumayi sagliyor
  });
  next();
});

// Syntax =>>  const Blog = mongoose.model(modelName(Blog), ourSchemaName)
const Course = mongoose.model("Course", CourseSchema);
module.exports = Course;
