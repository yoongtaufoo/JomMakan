const mongoose = require("mongoose");

const restaurantSchema = new mongoose.Schema({
  name: { type: String, required: true},
  description: { type: String, required: true },
  location: { type: String, required: true },
  address: { type: String, required: true },
  phone: {type:String, required: true},
  openinghours: {type:String, required: true},
  cuisine: {type:String, required:true},
  image: {type: String, required: true},
  foodImage: {type: [String], required: true}
  
});


const Restaurants = mongoose.model("restaurants", restaurantSchema);

module.exports = Restaurants;
