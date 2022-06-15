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
    reviews: [
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
  { timestamps: true, toObject: { virtuals: true }, toJSON: { virtuals: true } }
);

ProductSchema.virtual("averageRating").get(function () {
  const totalReviews = this.reviews.length;

  if (totalReviews > 0) {
    const sum = this.reviews.reduce((total, { rating }) => total + rating, 0);

    return sum / totalReviews;
  }

  return 0;
});

module.exports = mongoose.model("Product", ProductSchema);
