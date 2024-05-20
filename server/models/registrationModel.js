const mongoose = require("mongoose");

const registrationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  pax: { type: Number, required: true },
  status: { type: String, required: true },
  workshop_id: { type: mongoose.Schema.Types.ObjectId, required: true },
  user_id: { type: mongoose.Schema.Types.ObjectId , required:true},
});

const Registration = mongoose.model("Registration", registrationSchema);

module.exports = Registration;



