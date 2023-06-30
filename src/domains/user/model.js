const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const jwt = require("jsonwebtoken");
require("dotenv").config();

const UserSchema = new Schema({
  name: { type: String, required: true, maxlength: 50 },
  email: { type: String, required: true },
  address: { type: String },
  phone: { type: Number },
  gender: { type: String },
  password: { type: String, required: true },
  confirmPassword: { type: String, required: true },
  tokens: [
    {
      token: {
        type: String,
        required: true,
      },
    },
  ],
  verified: { type: Boolean, default: false },
});

// generate token
UserSchema.methods.generateToken = async function () {
  try {
    const token = jwt.sign(
      { _id: this._id.toString() },
      process.env.JWT_SECRET
    );
    this.tokens = this.tokens.concat({ token: token });
    await this.save();
    return token;
  } catch (error) {
    // res.send("the error part" + error);
    console.log("the error part" + error);
  }
};
// End of generating token

const User = mongoose.model("User", UserSchema);

module.exports = User;
