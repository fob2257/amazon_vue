const router = require("express").Router();

const Order = require("../models/order");
const verifyToken = require("../middlewares/verifyToken");

router.get("/orders", verifyToken, async (req, res) => {
  const owner = req?.decoded?.id;

  try {
    const orders = await Order.find({ owner })
      .populate("owner", ["-password", "-address"])
      .deepPopulate("products.product.owner");

    res.json({ success: true, orders });
  } catch (err) {
    console.error(err);

    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;
