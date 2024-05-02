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
    table,
    status,
    restaurant,
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
      table,
      status,
      restaurant,
    });

    // Save the updated user object with the new reservation
    await user.save();

    res.status(201).json({ message: "Reservation created successfully" });
  } catch (err) {
    console.error("Error creating reservation:", err);
    res.status(500).json({ message: "Failed to create reservation" });
  }
};

//get upcoming reservations
const getUpcomingReservations = async (req, res) => {
  try {
    // Query the database for users with reservations having status "U"
    const UpcomingReservations = await User.find({
      "reservations.status": "U",
    });

    // Extract reservations with status "U" from each user
    const reservations = UpcomingReservations.reduce((acc, user) => {
      const userReservations = user.reservations.filter(
        (reservation) => reservation.status === "U"
      );
      console.log(acc.concat(userReservations));
      return acc.concat(userReservations);
    }, []);

    // Return the retrieved reservations
    res.status(200).json(reservations);
  } catch (error) {
    console.error("Error fetching reservations:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  reserve,
  getUpcomingReservations,

};
