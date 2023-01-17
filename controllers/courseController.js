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
