const User = require("./model");
const jwt = require("jsonwebtoken");

const { hashData, verifyHashedData } = require("./../../util/hashData");
const createToken = require("./../../util/createToken");

const authenticateUser = async (data) => {
  // console.log(data);
  try {
    const { email, password } = data;
    const fetchedUser = await User.findOne({ email });
    if (!fetchedUser) {
      throw Error("Invalid credential entered");
    }
    if (!fetchedUser.verified) {
      throw Error("Email hasn't been verified yet. Check your inbox.");
    }

    const hashedPassword = fetchedUser.password;
    const passwordMatch = await verifyHashedData(password, hashedPassword);

    if (!passwordMatch) {
      throw Error("Invalid password entered!");
    }

    return fetchedUser;
  } catch (error) {
    throw error;
  }
};

const createNewUser = async (data) => {
  try {
    const { name, email, address, phone, gender, password, confirmPassword } =
      data;

    // Checking if user already exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      throw Error("User with the provided email already exists");
    }

    // hash password
    const hashedPassword = await hashData(password);
    const hashedPassword2 = await hashData(confirmPassword);
    const newUser = new User({
      name,
      email,
      address,
      phone,
      gender,
      password: hashedPassword,
      confirmPassword: hashedPassword2,
    });

    //save user
    const createdUser = await newUser.save();

    return createdUser;
  } catch (error) {
    throw error;
  }
};

// module.exports = { createNewUser, authenticateUser };
module.exports = { createNewUser, authenticateUser };
