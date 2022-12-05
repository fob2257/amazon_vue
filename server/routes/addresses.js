const router = require("express").Router();
const axios = require("axios");

const Address = require("../models/address");
const User = require("../models/user");
const verifyToken = require("../middlewares/verifyToken");

router.get("/addresses", verifyToken, async (req, res) => {
  const user = req?.decoded?.id;

  try {
    const addresses = await Address.find({ user }).populate("user", [
      "-password",
      "-address",
    ]);

    res.json({ success: true, addresses });
  } catch (err) {
    console.error(err);

    res.status(500).json({ success: false, message: err.message });
  }
});

router.post("/addresses", verifyToken, async (req, res) => {
  const {
    fullName,
    streetAddress,
    city,
    state,
    country,
    zipCode,
    phoneNumber,
    deliverInstructions,
    securityCode,
  } = req.body;
  const user = req?.decoded?.id;

  try {
    const address = new Address({
      fullName,
      streetAddress,
      city,
      state,
      country,
      zipCode,
      phoneNumber,
      deliverInstructions,
      securityCode,
      user,
    });

    await address.save();
  } catch (err) {
    console.error(err);

    return res.status(500).json({ success: false, message: err.message });
  }

  res.json({ success: true });
});

router.get("/addresses/:id", verifyToken, async (req, res) => {
  try {
    const { id } = req.params;
    const user = req?.decoded?.id;
    const address = await Address.findOne({ id, user }).populate("user", [
      "-password",
      "-address",
    ]);

    res.json({ success: true, address });
  } catch (err) {
    console.error(err);

    res.status(500).json({ success: false, message: err.message });
  }
});

router.put("/addresses/:id", verifyToken, async (req, res) => {
  try {
    const { id } = req.params;
    const {
      fullName,
      streetAddress,
      city,
      state,
      country,
      zipCode,
      phoneNumber,
      deliverInstructions,
      securityCode,
    } = req.body;
    const user = req?.decoded?.id;

    const updateObj = {
      fullName,
      streetAddress,
      city,
      state,
      country,
      zipCode,
      phoneNumber,
      deliverInstructions,
      securityCode,
    };

    Object.keys(updateObj).forEach((key) => {
      if (updateObj[key] === undefined) {
        delete updateObj[key];
      }
    });

    const address = await Address.findOneAndUpdate(
      { id, user },
      { $set: updateObj },
      { new: true }
    );

    res.json({ success: true, address });
  } catch (err) {
    console.error(err);

    res.status(500).json({ success: false, message: err.message });
  }
});

router.put("/addresses/set/default", verifyToken, async (req, res) => {
  try {
    const { address } = req.body;
    const user = req?.decoded?.id;

    const userAddress = await Address.findOne({ _id: address, user });

    if (!userAddress) {
      return res
        .status(400)
        .json({ success: false, message: "Address not found" });
    }

    await User.findByIdAndUpdate(user, { $set: { address } }, { upsert: true });

    res.json({
      success: true,
      message: `Address: ${userAddress.fullName}, has been set as default!`,
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({ success: false, message: err.message });
  }
});

router.delete("/addresses/:id", verifyToken, async (req, res) => {
  try {
    const { id } = req.params;
    const user = req?.decoded?.id;
    const address = await Address.findOneAndDelete({ id, user });

    res.json({ success: true, address });
  } catch (err) {
    console.error(err);

    res.status(500).json({ success: false, message: err.message });
  }
});

router.get("/countries", async (req, res) => {
  try {
    const { data: countries } = await axios.get(
      "https://restcountries.com/v2/all?fields=alpha2Code,name"
    );

    res.json({ success: true, countries });
  } catch (err) {
    console.error(err);

    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;
