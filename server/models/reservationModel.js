const mongoose = require("mongoose");

const reservationSchema = new mongoose.Schema({
  date: { type: Date, required: true },
  timestart: { type: String, required: true },
  timeend: { type: String, required: true },
  name: { type: String, required: true },
  phone: { type: String, required: true },
  pax: { type: Number, required: true },
  table_id: { type: String, required: true },
  status: { type: String, required: true },
  restaurant_id: { type: Number, required: true },
});

// const Reservation = mongoose.model("Reservation", reservationSchema);

// module.exports = Reservation;
