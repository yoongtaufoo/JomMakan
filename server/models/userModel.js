// const reservationSchema = require("./reservationModel");
const mongoose = require("mongoose");
const restaurantSchema = require("./restaurantModel");

const favRestaurantSchema = new mongoose.Schema({
  favRestaurantId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "restaurants",
    required: true,
  },
});

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  location: { type: String, required: true },
  // birthday: { type: Date, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  profilePic: {
    public_id: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
  favRestaurants: [favRestaurantSchema],
});

const User = mongoose.model("Users", userSchema);
// const Reservation = mongoose.model("Reservation", reservationSchema);

// module.exports = Reservation;
module.exports = User;
