const router = require("express").Router();
const jwt = require("jsonwebtoken");

const User = require("../models/user");

router.post("/auth/signup", async (req, res) => {
  const { name, email, password } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .json({ success: false, message: "Enter email or password" });
  }

  try {
    const user = new User({
      name,
      email,
      password,
    });

    await user.save();

    const token = jwt.sign(
      { id: user._id, name, email },
      process.env.JWT_PRIVATE_KEY,
      {
        expiresIn: "8h",
      }
    );

    res.json({ success: true, token });
  } catch (err) {
    console.error(err);

    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;
