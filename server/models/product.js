const mongoose = require("mongoose");
const { Schema } = mongoose;

const ProductSchema = new Schema(
  {
    category: {
      type: Schema.Types.ObjectId,
      ref: "Category",
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "Owner",
    },
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
    rating: {
      type: [Number],
    },
  },
  { timestamps: true }

);

module.exports = mongoose.model("Product", ProductSchema);
