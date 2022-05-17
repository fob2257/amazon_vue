const router = require("express").Router();

const Product = require("../models/product");
const uploadPhoto = require("../middlewares/uploadPhoto");

router.get("/products", async (req, res) => {
  try {
    const products = await Product.find().populate(["owner", "category"]);

    res.json({ success: true, products });
  } catch (err) {
    console.error(err);

    res.status(500).json({ success: false, message: err.message });
  }
});

router.post("/products", uploadPhoto.single("photo"), async (req, res) => {
  const {
    title,
    description,
    price,
    stockQuantity,
    categoryId: category,
    ownerId: owner,
  } = req.body;
  const photo = req?.file?.publicUrl;

  try {
    const product = new Product({
      title,
      description,
      photo,
      price,
      stockQuantity,
      category,
      owner,
    });

    await product.save();
  } catch (err) {
    console.error(err);

    return res.status(500).json({ success: false });
  }

  res.json({ success: true });
});

router.get("/products/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);

    res.json({ success: true, product });
  } catch (err) {
    console.error(err);

    res.status(500).json({ success: false, message: err.message });
  }
});

router.put("/products/:id", uploadPhoto.single("photo"), async (req, res) => {
  try {
    const { id } = req.params;
    const {
      title,
      description,
      price,
      stockQuantity,
      categoryId: category,
      ownerId: owner,
    } = req.body;
    const photo = req?.file?.publicUrl;

    const updateObj = {
      title,
      description,
      photo,
      price,
      stockQuantity,
      category,
      owner,
    };

    Object.keys(updateObj).forEach((key) => {
      if (updateObj[key] === undefined) {
        delete updateObj[key];
      }
    });

    const product = await Product.findByIdAndUpdate(
      id,
      { $set: updateObj },
      { upsert: true, new: true }
    );

    res.json({ success: true, product });
  } catch (err) {
    console.error(err);

    res.status(500).json({ success: false, message: err.message });
  }
});

router.delete("/products/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndDelete(id);

    res.json({ success: true, product });
  } catch (err) {
    console.error(err);

    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;
