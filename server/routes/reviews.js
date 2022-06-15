const router = require("express").Router();

const Review = require("../models/review");
const Product = require("../models/product");
const verifyToken = require("../middlewares/verifyToken");
const uploadPhoto = require("../middlewares/uploadPhoto");

router.get("/reviews", async (req, res) => {
  const { productId } = req.query;

  try {
    const reviews = await Review.find({ product: productId })
      .populate("product")
      .populate("user", "-password");

    res.json({ success: true, reviews });
  } catch (err) {
    console.error(err);

    res.status(500).json({ success: false, message: err.message });
  }
});

router.post(
  "/reviews",
  [verifyToken, uploadPhoto.single("photo")],
  async (req, res) => {
    const { headline, body, rating, productId: product } = req.body;
    const photo = req?.file?.publicUrl;
    const user = req?.decoded?.id;

    try {
      const review = new Review({
        headline,
        body,
        rating,
        photo,
        product,
        user,
      });

      await Product.updateOne({ $push: { rating: review.id } });

      await review.save();
      // await Product.findByIdAndUpdate(product, {
      //   $push: { rating: review.id },
      // });
    } catch (err) {
      console.error(err);

      return res.status(500).json({ success: false, message: err.message });
    }

    res.json({ success: true });
  }
);

module.exports = router;
