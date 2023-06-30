const { ObjectId } = require("mongodb");
const mongoose = require("mongoose");

const ClientDashboard = mongoose.model("ClientDashboard", {
  CurrentPassword: { type: String, required: true },
  NewPassword: { type: String, required: true },
  ConfirmPassword: { type: String, required: true },
});

module.exports = ClientDashboard;
