const router = require("express").Router();
const User = require("../models/User");

router.post("/register", async (req, res) => {
  try {
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    });
    const user = await newUser.save();
    return res.status(201).json(user);
  } catch (err) {
    return res.status(500).json(err);
  }
});

// router.get("/", (req, res) => {
//   res.send("auth router");
// });

module.exports = router;
