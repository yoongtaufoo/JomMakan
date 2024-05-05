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

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  location: { type: String, required: true },
  // birthday: { type: Date, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  reservations: [reservationSchema],
  
});

const User = mongoose.model("Users", userSchema);

module.exports = User;
