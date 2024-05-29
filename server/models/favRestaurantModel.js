const mongoose = require("mongoose");

const favRestaurantSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  location: { type: String, required: true },
  address: { type: String, required: true },
  phone: {type:String, required: true},
  openinghours: {type:String, required: true},
  cuisine: {type:String, required:true},
  image: {type: String, required: true},
  foodImage: {type: [String], required: true},
  status: { type: String, required: true },
  restaurant_id: { type: mongoose.Schema.Types.ObjectId, required: true },
  user_id: { type: mongoose.Schema.Types.ObjectId , required:true},
});

const Reservation = mongoose.model("favRestaurant", favRestaurantSchema);

module.exports = Reservation;