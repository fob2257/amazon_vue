const router = require("express").Router();

const Product = require("../models/product");
const uploadPhoto = require("../middlewares/uploadPhoto");

router.post("/products", uploadPhoto.single("photo"), async (req, res) => {
  const { title, description, price, stockQuantity } = req.body;
  const { publicUrl: photo } = req.file;

  try {
    const product = new Product({
      title,
      description,
      photo,
      price,
      stockQuantity,
    });

    await product.save();
  } catch (err) {
    console.error(err);

    return res.status(500).json({ success: false });
  }

  res.json({ success: true });
});

module.exports = router;
