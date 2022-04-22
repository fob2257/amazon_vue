const mongoose = require("mongoose");
const { Schema } = mongoose;

const OwnerSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    about: {
      type: String,
    },
    photo: {
      type: String,
    },
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);

module.exports = mongoose.model("Owner", OwnerSchema);
