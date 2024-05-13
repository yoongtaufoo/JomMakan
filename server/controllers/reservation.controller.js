const jwt = require("jsonwebtoken");
const { User } = require("../models/userModel");
const { Reservation } = require("../models/userModel");
// const Reservation = require("../models/reservationModel");

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

//get reservations
const myreservations = async (req, res) => {
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

    // Update status based on current date
    const currentDate = new Date();
    user.reservations.forEach(async (reservation) => {
      if (new Date(reservation.date) < currentDate) {
        reservation.status = "C";
        // Save the updated reservation to the database
        await reservation.save();
      }
    });

    // Send sorted user.reservations array as response
    res.json(user.reservations);
  } catch (err) {
    console.error("Error fetching reservation:", err);
    res.status(500).json({ message: "Failed to fetch reservations" });
  }
};

// Cancel reservation
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

    // Update the status of the reservation to "Done"
    reservation.status = "D";

    // Save the updated user document
    await userWithReservation.save();

    res.json({ message: "Reservation cancelled successfully" });
  } catch (error) {
    console.error("Error cancelling reservation:", error);
    res.status(500).json({ message: "Failed to cancel reservation" });
  }
};

const findReservationsByDate = async (req, res) => {
  const { restaurantId, date } = req.query;
  // Convert date string to Date object
  const dateObject = new Date(date);
  // Get ISO string representation of the date with milliseconds
  const isoDateString = dateObject.toISOString();
  // Append "+00:00" to the ISO string to indicate the UTC timezone
  const isodate = isoDateString.replace("Z", "+00:00");

  // Convert ISO date string to Unix timestamp (milliseconds since Unix epoch)
  // const formatteddate = new Date(date).getTime();
  // const isoDateString = new Date(date).toISOString();
  // console.log(isodate);
  // console.log(restaurantId);
  try {
    const reservations = await Reservation.find({
      restaurant_id: restaurantId,
      // date: formatteddate,
      date: { $gte: new Date(date) },
      //2024-05-13T00:00:00.000+00:00
    });
    console.log(reservations);
    res.json(reservations);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  reserve,
  myreservations,
  cancel,
  findReservationsByDate
};
