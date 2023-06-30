const mongoose = require("mongoose");

const BookingForm = mongoose.model("BookingForm", {
  Origin: { type: String },
  Destination: { type: String },
  Email: { type: String },
  BookingDate: { type: Date },
  BookingEndingDate: { type: Date },
});

module.exports = BookingForm;
