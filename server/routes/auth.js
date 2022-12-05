const router = require("express").Router();
const jwt = require("jsonwebtoken");

const User = require("../models/user");
const verifyToken = require("../middlewares/verifyToken");

router.post("/auth/signup", async (req, res) => {
  const { name, email, password } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .json({ success: false, message: "Enter email and password" });
  }

  try {
    const user = new User({
      name,
      email,
      password,
    });

    await user.save();

    const token = jwt.sign(
      { id: user.id, name, email },
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
  const { email } = req.decoded;

  try {
    const user = await User.findOne({ email })
      .populate(["address"])
      .select(["-password"]);

    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "User not found" });
    }

    res.json({ success: true, user });
  } catch (err) {
    console.error(err);

    res.status(500).json({ success: false, message: err.message });
  }
});

router.put("/auth", verifyToken, async (req, res) => {
  try {
    let user = await User.findOne({ email: req.decoded.email });

    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "User not found" });
    }

    const { name, email, password } = req.body;

    if (name) user.name = name;
    if (email) user.email = email;
    if (password) user.password = password;

    await user.save();
    user = await User.findById(user.id)
      .populate(["address"])
      .select(["-password"]);

    res.json({ success: true, user });
  } catch (err) {
    console.error(err);

    res.status(500).json({ success: false, message: err.message });
  }
});

router.post("/auth/signin", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .json({ success: false, message: "Enter email and password" });
  }

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "User not found" });
    }

    const passwordChecks = await user.comparePassword(password);

    if (!passwordChecks) {
      return res
        .status(400)
        .json({ success: false, message: "Credentials are incorrect" });
    }

    const token = jwt.sign(
      { id: user.id, name: user.name, email },
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
