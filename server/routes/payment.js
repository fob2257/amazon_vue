const router = require("express").Router();
const moment = require("moment");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const Order = require("../models/orders");
const verifyToken = require("../middlewares/verifyToken");

const SHIPMENT_OPTIONS = {
  normal: { price: 2.99, days: 7 },
  fast: { price: 4.99, days: 3 },
};

const getShipmentPrice = (shipment) => {
  const { days, price } = SHIPMENT_OPTIONS[shipment] || SHIPMENT_OPTIONS.normal;

  const estimated = moment().add(days, "d").format("dddd MMMM Do");

  return { estimated, price };
};

router.get("/shipment", (req, res) =>
  res.json({ success: true, shipmentOptions: SHIPMENT_OPTIONS })
);

router.post("/shipment", (req, res) => {
  const shipment = getShipmentPrice(req.body.shipment);

  res.json({ success: true, shipment });
});

router.post("/payment", verifyToken, async (req, res) => {
  try {
    const { email, _id: ownerId } = req.decoded;
    const { totalPrice, cart, estimatedDelivery } = req.body;

    const customer = await stripe.customers.create({ email });

    const source = await stripe.customers.createSource(customer.id, {
      source: "tok_visa",
    });

    const amount = Math.round(totalPrice * 100);
    const charge = await stripe.charges.create({
      amount,
      currency: "USD",
      customer: source.customer,
    });

    const order = new Order({
      owner: ownerId,
      estimatedDelivery,
    });

    for (const product of cart) {
      order.products.push({
        product: product._id,
        quantity: parseInt(product.quantity),
        price: product.price,
      });
    }

    await order.save();

    console.log({ amount, customer, source, charge });

    res.json({ success: true, order });
  } catch (err) {
    console.error(err);

    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;
