const mongoose = require("mongoose");

const { Schema } = mongoose;

const AddressSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    fullName: { type: String },
    streetAddress: { type: String },
    city: { type: String },
    state: { type: String },
    country: { type: String },
    zipCode: { type: Number },
    phoneNumber: { type: String },
    deliverInstructions: { type: String },
    securityCode: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Address", AddressSchema);
