const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

// POST register users
const register = async (req, res) => {
  const { username, location, email, password } = req.body;

  try {
    // Ensure password is not empty
    if (!password) {
      return res.status(400).json({ message: "Password is required" });
    }
    // Generate a salt
    const salt = await bcrypt.genSalt(10);

    // HASH THE PASSWORD
    const hashedPassword = await bcrypt.hash(password, salt);
    console.log(hashedPassword);

    // CREATE A NEW USER AND SAVE TO DB
    const newUser = new User({
      username,
      location,
      email,
      password: hashedPassword,
    });
    await newUser.save();
    res.status(201).json({ message: "User created successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to create user!" });
  }
};

// POST Log in user
const login = async (req, res) => {
  try {
    // CHECK IF THE USER EXISTS
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // CHECK IF THE PASSWORD IS CORRECT
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid)
      return res.status(400).json({ message: "Invalid Credentials!" });

    // GENERATE COOKIE TOKEN AND SEND TO THE USER

    // res.setHeader("Set-Cookie", "test=" + "myValue").json("success")
    const age = 1000 * 60 * 60 * 24 * 7; // expired in one week (in millisecond)
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: age,
    });

    // get all userInfo except password
    const { password: userPassword, ...userInfo } = user;

    // const { _id, username } = user._doc;

    // add the token to the user object
    const userWithToken = { ...userInfo, token };
    // const userWithToken = { token, _id, username, email };

    res
      .cookie("token", token, {
        httpOnly: true,
        // secure:true,
        maxAge: age,
      })
      .status(200)
      .json(userWithToken);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to login!" });
  }
};

// LOG OUT USER
const logout = (req, res) => {
  res.clearCookie("token").status(200).json({ message: "Logout Successful" });
};

module.exports = {
  register,
  login,
  logout,
};
