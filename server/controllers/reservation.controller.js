const jwt = require("jsonwebtoken");
const Reservation = require("../models/reservationModel");

// POST reserve
const reserve = async (req, res) => {
  const { date, timestart, timeend, name, phone, pax, table, status, restaurant } =
    req.body;
  console.log("hewlp lol")
  try {
    // CREATE A NEW RESERVATION AND SAVE TO DB
    const newReservation = new Reservation({
      date,
      timestart,
      timeend,
      name,
      phone,
      pax,
      table,
      status,
      // userid,
      restaurant
    });
    await newReservation.save();
    res.status(201).json({ message: "Reserved successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to reserve!" });
  }
};

module.exports = {
  reserve,
  // getAllReservations,
};

