const express = require("express");
const router = express.Router();

const userRoutes = require("./../domains/user");
const OTPRoutes = require("./../domains/otp");
const EmailVerificationRoutes = require("./../domains/email_verification");
const contact = require("./../domains/contact/routes");
const booking = require("./../domains/bookingForm/routes");
const adminRegistration = require("./../domains/adminRegistration/routes");
const clientDashboard = require("./../domains/clientDashboard/routes");

router.use("/user", userRoutes);
router.use("/otp", OTPRoutes);
router.use("/email_verification", EmailVerificationRoutes);
router.use("/contact", contact);
router.use("/book", booking);
router.use("/adminRegister", adminRegistration);
router.use("/clientDash", clientDashboard);

module.exports = router;
