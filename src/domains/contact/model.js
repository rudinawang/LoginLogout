const { ObjectId } = require("mongodb");
const mongoose = require("mongoose");

const Contact = mongoose.model("Contact", {
  Name: { type: String, required: true },
  Email: {
    type: String,
    required: true,
    validate: {
      validator: function (value) {
        return /\S+@\S+\.\S+/.test(value);
      },
      message: "Invalid email format",
    },
  },
  Message: { type: String, required: true },
});

module.exports = Contact;
