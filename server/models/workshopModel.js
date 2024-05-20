const mongoose = require("mongoose");

const workshopSchema = new mongoose.Schema({
  workshopName: { type: String, required: true, unique: true },
  workshopDescription: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  address: { type: String, required: true },
  time: { type: String, required: true },
  date: { type: Date, required: true },
  availableSlot: { type: Number, required: true },
  photoLink: { type: String } ,// Assuming the photo will be stored as a URL
  registered:{type: Array} // List of users that registered
});

const Workshop = mongoose.model("Workshop", workshopSchema);

module.exports = Workshop;
