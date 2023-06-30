const express = require("express");

const router = express.Router();

//const mongoType = require('mongoose').Types;

const Contact = require("./model");

router.post("/contact", async (req, res) => {
  try {
    // Create a new user
    const contact = new Contact({
      Name: req.body.Name,
      Email: req.body.Email,
      Message: req.body.Message,
    });
    await contact.save();
    res.status(200).json({ message: "Message Sent!!" });
  } catch (error) {
    console.error("Error during Messaging:", error);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
