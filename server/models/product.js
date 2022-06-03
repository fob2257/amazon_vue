const mongoose = require("mongoose");
const { Schema } = mongoose;

const ProductSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    photo: {
      type: String,
    },
    price: {
      type: Number,
    },
    stockQuantity: {
      type: Number,
    },
    rating: [
      {
        type: Schema.Types.ObjectId,
        ref: "Review",
      },
    ],
    category: {
      type: Schema.Types.ObjectId,
      ref: "Category",
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "Owner",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", ProductSchema);
