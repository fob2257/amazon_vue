const router = require("express").Router();

const Category = require("../models/category");

router.get("/categories", async (req, res) => {
  try {
    const categories = await Category.find();

    res.json({ success: true, categories });
  } catch (err) {
    console.error(err);

    res.status(500).json({ success: false, message: err.message });
  }
});

router.post("/categories", async (req, res) => {
  const { type } = req.body;

  try {
    const category = new Category({ type });

    await category.save();
  } catch (err) {
    console.error(err);

    return res.status(500).json({ success: false, message: err.message });
  }

  res.json({ success: true });
});

module.exports = router;
