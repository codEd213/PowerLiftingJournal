const mongoose = require("mongoose");

const bcrypt = require("bcrypt");
const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Username is required"],
    },
    email: {
      type: String,
      unique: true,
      required: [true, "Email is required"],
    },
    password: {
      type: String,
      required: [true, "password is required"],
      minlength: [8, "password must be less than 8 characters"],
    },
  },
  { timestamps: true }
);

UserSchema.virtual("confirmPassword")
  .get(() => this._confirmPassword)
  .set((value) => (this._confirmPassword = value));

UserSchema.pre("save", function (next) {
  if (this.password !== this._confirmPassword) {
    this.invalidate("confirmPassword", "Password must match!");
  }
  next();
});

UserSchema.pre("save", async function (next) {
  try {
    const hashedPassword = await bcrypt.hash(this.password, 10); //before saving,
    this.password = hashedPassword;
    next();
  } catch (e) {
    console.log("ERROR in hashing", e);
  }
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
