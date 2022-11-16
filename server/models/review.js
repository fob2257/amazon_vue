const mongoose = require("mongoose");

const Product = require("./product");

const { Schema } = mongoose;

const ReviewSchema = new Schema(
  {
    headline: {
      type: String,
    },
    body: {
      type: String,
    },
    rating: {
      type: Number,
    },
    photo: {
      type: String,
    },
    product: {
      type: Schema.Types.ObjectId,
      ref: "Product",
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

ReviewSchema.pre("save", async function (next) {
  const review = this;

  if (review.isNew) {
    try {
      await Product.findByIdAndUpdate(review.product, {
        $push: { reviews: review.id },
      });
    } catch (error) {
      return next(error);
    }
  }

  next();
});

module.exports = mongoose.model("Review", ReviewSchema);
