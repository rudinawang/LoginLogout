require("dotenv").config();
const mongoose = require("mongoose");

const MONGODB_URI = process.env.MONGODB_URI;

const connectToDB = async () => {
  try {
    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("DB Connected");
  } catch (error) {
    console.log(error);
  }
};

connectToDB();

// mongoose.connect(
//   "mongodb+srv://rudnawang07:Rudra143@auth.7iammql.mongodb.net/?retryWrites=true&w=majority"
// );

// mongoose.connection.on("error", (err) => {
//   console.log("Connection failed to Database");
// });

// mongoose.connection.on("connected", (connected) => {
//   console.log("Connected Successfully With Database");
// });
