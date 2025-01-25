const { Router } = require("express");
const adminMiddleware = require("../middlewares/admin");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config"); // Import JWT_SECRET from config
const router = Router();
const { Admin, Course, User } = require("../db");

router.post("/signup", async (req, res) => {
  const { username, password } = req.body;

  await Admin.create({
    username,
    password,
  });

  res.json({
    message: "Admin created successfully",
  });
});

router.post("/signin", async (req, res) => {
  const { username, password } = req.body;

  const user = await Admin.findOne({
    username,
    password,
  });

  if (user) {
    const token = jwt.sign({ username }, JWT_SECRET); // Sign token with the secret key

    res.json({
      token,
    });
  } else {
    res.status(401).json({
      message: "Incorrect username or password",
    });
  }
});

router.post("/courses", adminMiddleware, async (req, res) => {
  const { title, description, imageLink, price } = req.body;

  const newCourse = await Course.create({
    title,
    description,
    imageLink,
    price,
  });

  res.json({
    msg: "Course created successfully",
    courseId: newCourse._id,
  });
});

router.get("/courses", async (req, res) => {
  const response = await Course.find({});
  res.json({
    courses: response,
  });
});

module.exports = router;
