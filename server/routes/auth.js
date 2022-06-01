const router = require("express").Router();
const jwt = require("jsonwebtoken");

const User = require("../models/user");
const verifyToken = require("../middlewares/verifyToken");

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

router.get("/auth", verifyToken, async (req, res) => {
  try {
    const user = await User.findOne({ email: req.decoded.email });

    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "User not found" });
    }

    user.password = undefined;

    res.json({ success: true, user });
  } catch (err) {
    console.error(err);

    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;
