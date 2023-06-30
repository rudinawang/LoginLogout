const mongoose = require("mongoose");

const AdminRegistration = mongoose.model("AdminRegistration", {
  Image: { type: String, required: true },
  Image1: { type: String },
  Image2: { type: String },
  Image3: { type: String },
  Image4: { type: String },
  BusNumber: { type: Number, required: true },
  BusType: { type: String, required: true },
  SeatNumber: { type: Number, required: true },
});
module.exports = AdminRegistration;
