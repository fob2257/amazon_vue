const mongoose = require("mongoose");
const User = require("./user");

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

AddressSchema.pre("save", async function (next) {
  const address = this;

  if (address.isNew) {
    try {
      await User.findByIdAndUpdate(address.user, {
        $push: { addresses: address.id },
      });
    } catch (error) {
      return next(error);
    }
  }

  next();
});

module.exports = mongoose.model("Address", AddressSchema);
