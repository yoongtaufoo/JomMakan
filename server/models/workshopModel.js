const mongoose = require("mongoose");

const workshopSchema = new mongoose.Schema({
  workshopName: { type: String, required: true, unique: true },
  workshopDescription: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  address: { type: String, required: true },
  time: { type: String, required: true },
  date: { type: String, required: true },
  availableSlot: { type: Number, required: true },
  photo: { type: String } // Assuming the photo will be stored as a URL
});

const Workshop = mongoose.model("Workshop", workshopSchema);

module.exports = Workshop;
