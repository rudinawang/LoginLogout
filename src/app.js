//mongodb
require("./config/db");
const express = require("express");
// const bodyParser = express.json;
const bodyParser = require("body-parser");
const cors = require("cors");
const routes = require("./routes");

// create Server app

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("index");
});

app.use(cors());
// app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api/v1", routes);

module.exports = app;
