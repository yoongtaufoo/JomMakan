const mongoose = require("mongoose");

const favWorkshopSchema = new mongoose.Schema({
  workshopName: { type: String, required: true, unique:false},
  workshopDescription: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  address: { type: String, required: true },
  time: { type: String, required: true },
  date: { type: Date, required: true },
  availableSlot: { type: Number, required: true },
  photoLink: { type: String },
  workshop_id: { type: mongoose.Schema.Types.ObjectId, required: true },
  user_id: { type: mongoose.Schema.Types.ObjectId , required:true},

});

const favWorkshop = mongoose.model("favWorkshop", favWorkshopSchema);

module.exports = favWorkshop;
