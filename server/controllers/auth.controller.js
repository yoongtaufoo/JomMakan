const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User } = require("../models/userModel");
const zxcvbn = require("zxcvbn");

// POST register users
const register = async (req, res) => {
  const { username, location, email, password, password2 } = req.body;

  try {
    // Check password strength
    const passwordStrength = zxcvbn(password).score;
    console.log(passwordStrength);
    if (passwordStrength < 3) {
      return res.status(400).json({
        message: "Password strength must be at least 'Good' to sign up.",
      });
    }

    // Check retype password
    if (password !== password2) {
      return res.status(400).json({
        message: "Passwords do not match.",
      });
    }

    // Check if the email or username already exists
    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      let errorMessage = "";
      if (existingUser.email === email && existingUser.username === username) {
        errorMessage = "Email and Username already exists";
      } else if (existingUser.email === email) {
        errorMessage = "Email already exists";
      } else {
        errorMessage = "Username already exists";
      }
      return res.status(400).json({ message: errorMessage });
    }

    // Generate a salt
    const salt = await bcrypt.genSalt(10);

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create a new user ans dave to db
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
    // Check if the user exists
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Email is not registered." });
    }

    // Check password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid)
      return res.status(400).json({ message: "Wrong Password." });

    // Generate cookie token and send to the user

    // res.setHeader("Set-Cookie", "test=" + "myValue").json("success")
    const age = 1000 * 60 * 60 * 24 * 7; // expired in one week (in millisecond)
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: age,
    });

    // console.log(user);

    res
      .cookie("token", token, {
        httpOnly: true,
        secure: true,
        maxAge: age,
      })
      .status(200)
      .json({
        token,
        user: { _id: user._id, username: user.username, email: user.email },
      });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to login." });
  }
};

// Log out
const logout = (req, res) => {
  res.clearCookie("token").status(200).json({ message: "Logout Successful." });
};

module.exports = {
  register,
  login,
  logout,
};
