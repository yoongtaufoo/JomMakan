const jwt = require("jsonwebtoken");
const User  = require("../models/userModel");
const Reservation = require("../models/reservationModel");

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

  try {
    const authHeader = req.headers.authorization; // Get token
    const token = JSON.parse(authHeader);

    const userId = token.user._id; // Get the userId from the decoded token

    // Create a new user ans dave to db
    const newReservation = new Reservation({
      date,
      timestart,
      timeend,
      name,
      phone,
      pax,
      table_id,
      status,
      restaurant_id,
      user_id: userId,
    });
    await newReservation.save();

    res.status(201).json({ message: "Reservation created successfully" });
  } catch (err) {
    console.error("Error creating reservation:", err);
    res.status(500).json({ message: "Failed to create reservation" });
  }
};

// Get reservations
const myreservations = async (req, res) => {
  try {
    const authHeader = req.headers.authorization; // Get token
    const token = JSON.parse(authHeader);

    const userId = token.user._id; // Get the userId from the decoded token

    const reservations = await Reservation.find({ user_id: userId }); // Find reservations with user_id = userId

    reservations.sort((a, b) => new Date(a.date) - new Date(b.date)); // Sort reservations by date

    // Update status based on current date
    const currentDate = new Date();
    reservations.forEach(async (reservation) => {
      if (new Date(reservation.date) < currentDate && reservation.status!=="D") {
        reservation.status = "C"; // Past reservations will have status "C" meaning "Completed"
        await reservation.save(); // Save the changes
      }
    });

    res.json(reservations); // Send sorted reservations array as response
    
  } catch (err) {
    console.error("Error fetching reservation:", err);
    res.status(500).json({ message: "Failed to fetch reservations" });
  }
};

// Cancel reservation
const cancel = async (req, res) => {
  const { reservationId } = req.params; // Get reservationId

  try {
    const reservation = await Reservation.findById(reservationId); // Find the reservation by reservationId

    if (!reservation) {
      return res.status(404).json({ message: "Reservation not found" });
    }

    reservation.status = "D"; // Update the status of the reservation to "Deleted"

    await reservation.save(); // Save the changes

    res.json({ message: "Reservation cancelled successfully" });
  } catch (error) {
    console.error("Error cancelling reservation:", error);
    res.status(500).json({ message: "Failed to cancel reservation" });
  }
};

const findReservationsByDateAndId = async (req, res) => {
  const { restaurantId, date } = req.query; // Get restaurantId and date

  const dateObject = new Date(date); // Convert date string to Date object

  const isoDateString = dateObject.toISOString(); // Get ISO string representation of the date with milliseconds

  const isodate = isoDateString.replace("Z", "+00:00"); // Append "+00:00" to the ISO string to indicate the UTC timezone

  try {
    const reservations = await Reservation.find({
      restaurant_id: restaurantId,
      date: isodate,
      //2024-05-13T00:00:00.000+00:00
    });
    console.log(reservations);
    res.json(reservations);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch restaurants" });
  }
};

module.exports = {
  reserve,
  myreservations,
  cancel,
  findReservationsByDateAndId
};
