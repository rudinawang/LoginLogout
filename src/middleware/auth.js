const express = require("express");

const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const User = require("./../domains/user/model");
require("dotenv").config();

const verifyToken = async (req, res, next) => {
  // verify token

  try {
    const token = req.cookies.jwt;
    console.log(token);

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    console.log(decodedToken);
    const user = await User.findOne({ _id: decodedToken._id });

    console.log(user.email);

    req.token = token;
    req.user = user;

    next();
  } catch (error) {
    return res.status(401).send(error);
  }

  // proceed with request
};

module.exports = verifyToken;
