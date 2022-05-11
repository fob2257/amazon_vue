const router = require("express").Router();

const Owner = require("../models/owner");
const uploadPhoto = require("../middlewares/uploadPhoto");

router.get("/owners", async (req, res) => {
  try {
    const owners = await Owner.find();

    res.json({ success: true, owners });
  } catch (err) {
    console.error(err);

    res.status(500).json({ success: false, message: err.message });
  }
});

router.post("/owners", uploadPhoto.single("photo"), async (req, res) => {
  const { name, about } = req.body;
  const { publicUrl: photo } = req.file;

  try {
    const owner = new Owner({ name, about, photo });

    await owner.save();
  } catch (err) {
    console.error(err);

    return res.status(500).json({ success: false, message: err.message });
  }

  res.json({ success: true });
});

module.exports = router;
