const router = require("express").Router();
const moment = require("moment");

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

module.exports = router;
