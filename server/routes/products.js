const router = require("express").Router();

const Product = require("../models/product");

router.post("/products", async (req, res) => {
  const { title, description, photo, price, stockQuantity } = req.body;

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
