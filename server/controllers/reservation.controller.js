const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

// POST reservation
const reserve = async (req, res) => {
  const {
    date,
    timestart,
    timeend,
    name,
    phone,
    pax,
    table_id,
    status,
    restaurant_id,
  } = req.body;
  console.log("Creating a new reservation...");
  try {
    console.log(req.headers.authorization);
    const authHeader = req.headers.authorization;
  const token = JSON.parse(authHeader);
    console.log("token",token)
  // Decode the token

  // Access the userId from the decoded token
  const userId = token.user._id;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Add the new reservation to the user's reservations array
    user.reservations.push({
      date,
      timestart,
      timeend,
      name,
      phone,
      pax,
      table_id,
      status,
      restaurant_id,
    });

    // Save the updated user object with the new reservation
    await user.save();

    res.status(201).json({ message: "Reservation created successfully" });
  } catch (err) {
    console.error("Error creating reservation:", err);
    res.status(500).json({ message: "Failed to create reservation" });
  }
};

//get reservations
const reservations = async (req, res) => {
  try {

    // res.setHeader("Content-Type", "application/json");

    console.log( "header", req.headers.authorization);
    const authHeader = req.headers.authorization;
    const token = JSON.parse(authHeader);
    console.log("token", authHeader);
    // Decode the token

    // Access the userId from the decoded token
    const userId = token.user._id;
    console.log("userid",userId)
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    //
    console.log("reservations:", user.reservations);
    res.json(user.reservations)

    // res.status(201).json({ message: "Reservations fetched successfully" });
  } catch (err) {
    console.error("Error fetching reservation:", err);
    res.status(500).json({ message: "Failed to fetch reservations" });
  }
};

module.exports = {
  reserve,
  reservations,

};
