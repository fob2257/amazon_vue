const mongoose = require("mongoose");
const { Schema } = mongoose;

const CategorySchema = new Schema(
  {
    type: {
      type: String,
      unique: true,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Category", CategorySchema);
