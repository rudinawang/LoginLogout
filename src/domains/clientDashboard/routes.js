const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
// const Login = require('../Models/Login.js');
const Register = require("./../user/model");
const BookingForm = require("./../bookingForm/model");
const ClientDashboard = require("./../clientDashboard/model");
const auth = require("./../../middleware/auth");

router.put("/", auth, async (req, res) => {
  try {
    if (mongoose.Types.ObjectId.isValid(req.user._id)) {
      const registeredUser = await Register.findById(req.user._id);

      if (registeredUser) {
        const currentPassword = req.body.CurrentPassword;
        const newPassword = req.body.NewPassword;
        const confirmPassword = req.body.ConfirmPassword;
        const isPasswordMatched = await bcrypt.compare(
          currentPassword,
          registeredUser.password
        );
        if (isPasswordMatched && newPassword === confirmPassword) {
          const hashedPassword = await bcrypt.hash(newPassword, 10);

          // Update the Password and ConfirmPassword fields of the registered user
          registeredUser.password = hashedPassword;
          registeredUser.confirmPassword = hashedPassword;

          await registeredUser.save();

          //   await ClientDashboard.create({
          //     UserId: req.user._id,
          //     CurrentPassword: currentPassword,
          //     NewPassword: hashedPassword,
          //     ConfirmPassword: hashedPassword,
          //   });

          res.status(200).json({ message: "Password changed successfully!" });
        } else {
          res.status(400).send("Invalid Password");
        }
      } else {
        res.status(404).send("User not found");
      }
    } else {
      res.status(400).send("Invalid id format: " + req.user._id);
    }
  } catch (error) {
    console.error("Error during password change:", error);
    res.status(500).send("Internal Server Error");
  }
});

// Get all data for the currently logged-in user
router.get("/clientDashed", auth, async (req, res) => {
  try {
    if (mongoose.Types.ObjectId.isValid(req.user._id)) {
      const registeredUser = await Register.findById(req.user._id);
      const bookingForm = await BookingForm.find({
        email: registeredUser.email,
      });

      if (registeredUser && bookingForm) {
        res.status(200).json({ registeredUser, bookingForm });
      } else {
        res.status(404).send("User not found");
      }
    } else {
      res.status(400).send("Invalid id format: " + req.user._id);
    }
  } catch (error) {
    console.error("Error getting data", error);
    res.status(500).send("Internal Server Error");
  }
});
module.exports = router;
