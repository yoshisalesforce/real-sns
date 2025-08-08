const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");

router.post("/register", async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 12);
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
    });
    const user = await newUser.save();
    return res.status(201).json(user);
  } catch (err) {
    return res.status(500).json(err);
  }
});

router.post("/login", async (req, res) => {
  try {
    const identifiedUser = await User.findOne({ email: req.body.email });
    if (!identifiedUser) return res.status(404).send("ユーザが見つかりません");
    const isValidPassword = await bcrypt.compare(
      req.body.password,
      identifiedUser.password
    );
    if (!isValidPassword) return res.status(400).send("パスワードが違います");
    return res.status(200).json(identifiedUser);
  } catch (err) {
    return res.status(500).json({
      errorMessage: err,
    });
  }
});

// router.get("/", (req, res) => {
//   res.send("auth router");
// });

module.exports = router;
