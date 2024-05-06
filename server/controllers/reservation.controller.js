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
    // Get token
    const authHeader = req.headers.authorization;
    const token = JSON.parse(authHeader);

    // Get the userId from the decoded token
    const userId = token.user._id;

    //Find user by userId
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

// //get reservations
// const reservations = async (req, res) => {
//   try {
//     // Get token
//     const authHeader = req.headers.authorization;
//     const token = JSON.parse(authHeader);

//     // Get the userId from the decoded token
//     const userId = token.user._id;
//     const user = await User.findById(userId);

//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     // console.log("reservations:", user.reservations);

//     // Send user.reservations array as response
//     res.json(user.reservations)

//   } catch (err) {
//     console.error("Error fetching reservation:", err);
//     res.status(500).json({ message: "Failed to fetch reservations" });
//   }
// };

//get reservations
const reservations = async (req, res) => {
  try {
    // Get token
    const authHeader = req.headers.authorization;
    const token = JSON.parse(authHeader);

    // Get the userId from the decoded token
    const userId = token.user._id;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Sort reservations by date
    user.reservations.sort((a, b) => new Date(a.date) - new Date(b.date));

    // Send sorted user.reservations array as response
    res.json(user.reservations);

  } catch (err) {
    console.error("Error fetching reservation:", err);
    res.status(500).json({ message: "Failed to fetch reservations" });
  }
};


const cancel = async (req, res) => {
  const { reservationId } = req.params;

  try {
    // Find the reservation by ID in your database
    const userWithReservation = await User.findOne({ "reservations._id": reservationId });

    if (!userWithReservation) {
      return res.status(404).json({ message: "Reservation not found" });
    }

    // Find the reservation within the user's reservations array
    const reservation = userWithReservation.reservations.find(r => r._id == reservationId);

    if (!reservation) {
      return res.status(404).json({ message: "Reservation not found" });
    }

    // Update the status of the reservation to "Cancelled"
    reservation.status = "C";

    // Save the updated user document
    await userWithReservation.save();

    res.json({ message: "Reservation cancelled successfully" });
  } catch (error) {
    console.error("Error cancelling reservation:", error);
    res.status(500).json({ message: "Failed to cancel reservation" });
  }
};

module.exports = {
  reserve,
  reservations,
  cancel,
};
