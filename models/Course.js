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

// Syntax =>>  const Blog = mongoose.model(modelName(Blog), ourSchemaName)
const Course = mongoose.model("Course", CourseSchema);
module.exports = Course;
