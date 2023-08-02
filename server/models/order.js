const mongoose = require("mongoose");
const deepPopulate = require("mongoose-deep-populate")(mongoose);

const { Schema } = mongoose;

const OrderSchema = new Schema(
  {
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    products: [
      {
        product: { type: Schema.Types.ObjectId, ref: "Product" },
        quantity: { type: Number },
        price: { type: Number },
      },
    ],
    estimatedDelivery: { type: String },
    shipmentPrice: { type: Number },
    totalPrice: { type: Number },
  },
  { timestamps: true }
);

OrderSchema.plugin(deepPopulate);

module.exports = mongoose.model("Order", OrderSchema);
