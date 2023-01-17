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

// Syntax =>>  const Blog = mongoose.model(modelName(Blog), ourSchemaName)
const Course = mongoose.model("Course", CourseSchema);
module.exports = Course;
