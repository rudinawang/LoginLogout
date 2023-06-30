const express = require("express");
const bodyParser = require("body-parser"); // takes and sends data in bson format
const cors = require("cors");
const router = express.Router();
const mongoose = require("mongoose");
const AdminRegistration = require("./model");
const Contact = require("./../contact/model");
const BookingForm = require("./../bookingForm/model");

router.post("/adminDashboard", async (req, res) => {
  try {
    const newUser = new AdminRegistration({
      Image: req.body.Image,
      Image1: req.body.Image1,
      Image2: req.body.Image2,
      Image3: req.body.Image3,
      Image4: req.body.Image4,
      BusNumber: req.body.BusNumber,
      BusType: req.body.BusType,
      SeatNumber: req.body.SeatNumber,
    });
    await newUser.save();

    res.status(200).json({ message: "Registered successfully" });
  } catch (error) {
    console.error("Error Registration:", error);
    res.status(500).send("Internal Server Error");
  }
});
// get All data from Contact
router.get("/adminDashboard", async (req, res) => {
  try {
    const contacts = await Contact.find();
    const bookingForm = await BookingForm.find();
    res.status(200).json({ contacts, bookingForm });
  } catch (error) {
    console.error("Error getting datas", error);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
