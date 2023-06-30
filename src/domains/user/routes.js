const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
require("dotenv").config();
const { createNewUser, authenticateUser } = require("./controller");

const auth = require("./../../middleware/auth");
const User = require("./model");

const {
  sendVerificationOTPEmail,
} = require("./../email_verification/controller");
const { HostAddress } = require("mongodb");
router.use(express.json());

router.use(cookieParser());
router.use(express.urlencoded({ extended: false }));

// User Authorization
router.get("/private_data", auth, async (req, res) => {
  // const token = req.cookies.jwt;
  // res.status(200).json(req.user);
  // console.log(`Email:  ${req.user.email}`);
  res.status(200).json({ message: "User is Authorized to a Private_Page" });
});

// User Signin
router.post("/login", async (req, res) => {
  try {
    // Check if the user is the admin
    if (
      req.body.email === "admin@gmail.com" &&
      req.body.password === "admin@123"
    ) {
      const token = jwt.sign({ email: req.body.email, role: "admin" }, "91299");
      res.status(200).json({ token, message: "you are logged in as admin" });
      return;
    } else {
      let { email, password } = req.body;
      email = email.trim();
      password = password.trim();

      if (!(email && password)) {
        throw Error("Empty Credential supplied");
      }

      const authenticatedUser = await authenticateUser({ email, password });

      const token = await authenticatedUser.generateToken();
      console.log("this is token :" + token);

      res
        .status(200)
        .cookie("jwt", token, {
          expires: new Date(Date.now() + 700000),
          httpOnly: true,
        })
        .json({ token, message: "user logged in !!" });
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
});

//  User Signup
router.post("/signup", async (req, res) => {
  try {
    console.log(req.body);

    let { name, email, address, phone, gender, password, confirmPassword } =
      req.body;
    name = name.trim();
    email = email.trim();
    address = address.trim();
    phone = phone.trim();
    gender = gender.trim();
    password = password.trim();
    confirmPassword = confirmPassword.trim();

    if (!(name && email && password)) {
      throw Error("Empty input fields!");
    } else if (!/^[a-zA-Z]*$/.test(name)) {
      throw Error("Invalid name entered");
    } else if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
      throw Error("Invalid email entered");
    } else if (password.length < 8) {
      throw Error("Password is too short!");
    } else {
      // good credentials, create new user
      const newUser = await createNewUser({
        name,
        email,
        address,
        phone,
        gender,
        password,
        confirmPassword,
      });

      // Token Generating
      const token = await newUser.generateToken();
      console.log("this is token:" + token);

      res.cookie("jwt", token, {
        expires: new Date(Date.now() + 900000),
        httpOnly: true,
      });

      await sendVerificationOTPEmail(email);
      res.status(200).json(newUser);
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
});

//logout user
router.get("/logout", auth, async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter((currElement) => {
      return currElement.token != req.token;
    });
    res.clearCookie("jwt").json({ message: "user logged out successfully" });
    console.log("logout Successfully");
    await req.user.save();
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
