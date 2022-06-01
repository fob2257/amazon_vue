const mongoose = require("mongoose");
const brycpt = require("bcrypt");

const { Schema } = mongoose;
const rounds = process.env.SALT_ROUNDS || 10;

const UserSchema = new Schema(
  {
    name: {
      type: String,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    address: {
      type: Schema.Types.ObjectId,
      ref: "Address",
    },
  },
  { timestamps: true }
);

UserSchema.pre("save", async function (next) {
  const user = this;

  if (user.isModified("password") || user.isNew) {
    try {
      const salt = await brycpt.genSalt(rounds);
      const hashedPassword = await brycpt.hash(user.password, salt);

      user.password = hashedPassword;
    } catch (error) {
      return next(error);
    }
  }

  next();
});

UserSchema.methods.comparePassword = function (password) {
  const user = this;

  return brycpt.compare(password, user.password);
};

module.exports = mongoose.model("User", UserSchema);
