const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();

const Register = require("./../user/model");

const BookingForm = require("./model");
const auth = require("./../../middleware/auth");
// const mongoose = require("mongoose");
router.post("/booking", auth, async (req, res) => {
  const { Email } = req.body;
  try {
    // Check if the email is already registered
    const existingUser = await Register.findOne({ email: Email });
    if (existingUser) {
      // Create a new booking form with the logged-in user's email
      const newBookingForm = new BookingForm({
        Origin: req.body.Origin,
        Destination: req.body.Destination,
        Email: req.body.Email,
        BookingDate: req.body.BookingDate,
        BookingEndingDate: req.body.BookingEndingDate,
      });
      await newBookingForm.save();
      res.status(200).json({ message: "Booked successfully" });
    }
  } catch (error) {
    console.log("Error booking:", error);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
