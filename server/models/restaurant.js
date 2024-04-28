const mongoose = require("mongoose");

const tableSchema = new mongoose.Schema({
    id: { type: Number, unique: true, required: true },
    status: { type: String, required: true },
    pax: { type: Number, required: true },
});

const restaurantSchema = new mongoose.Schema({
    id: { type: Number, unique: true, required: true },
    name: { type: String, required: true },
    image: { type: String },
    description: { type: String },
    location: { type: String, required: true},
    address: { type: String, required: true},
    phone: { type: String, required: true},
    openingHours: { type: String, required: true},
    cuisine: { type: String, required: true},
    resPhotos: { type: [String], required: true},
    review: { type: String, required: true},
    tables: { type: [tableSchema], required: true},
    favorite: { type: Boolean},
});

const Restaurant = mongoose.model("Restaurant", restaurantSchema);

module.exports = Restaurant;