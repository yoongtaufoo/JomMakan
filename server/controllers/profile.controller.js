const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const getProfile = async (req, res) => {
  try {
    const authHeader = req.headers.authorization; // Get from jsx headers
    const token = JSON.parse(authHeader);

    const userId = token.user._id; // Get the userId

    const user = await User.findOne({ _id: userId }); // Find user with user_id = userId

    // console.log("find one user: " + user);

    res.json(user); // Send sorted reservations array as response
  } catch (err) {
    console.error("Error fetching user profile:", err);
    res.status(500).json({ message: "Failed to fetch user profile" });
  }
};

const updateProfile = async (req, res) => {
  try {
    const authHeader = req.headers.authorization; // Get from jsx headers
    const token = JSON.parse(authHeader);

    const userId = token.user._id; // Get the userId

    const { username, location, email } = req.body;

    // Check if the email or username already exists
    const existingUser = await User.findOne({
      $and: [{ _id: { $ne: userId } }, { $or: [{ email }, { username }] }],
    });
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

    // Find the user by ID
    const user = await User.findOne({ _id: userId });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update user fields
    user.username = username || user.username;
    user.location = location || user.location;
    // user.birthday = birthday || user.birthday;
    user.email = email || user.email;

    // Hash the password if it is being updated
    // if (password) {
    //   const salt = await bcrypt.genSalt(10);
    //   user.password = await bcrypt.hash(password, salt);
    // }

    // Save the updated user
    await user.save();

    res.json({ message: "Profile updated successfully" });
  } catch (err) {
    console.error("Error updating user profile:", err);
    res.status(500).json({ message: "Failed to update user profile" });
  }
};

module.exports = {
  getProfile,
  updateProfile,
};
