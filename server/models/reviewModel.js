const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, required: true },
  restaurant_id: { type: mongoose.Schema.Types.ObjectId, required: true },
  userName: { type: String, required: true },
  rating: { type: Number, required: true },
  media: {
    public_id: {
      type: String,
    },
    url: {
      type: String,
    },
  },
  timePosted: { type: Date, required: true },
  reviewDescription: { type: String, required: true },
  agreeToTerms: { type: Boolean, required: true },
  likedBy: {
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  },
});

const Review = mongoose.model("reviews", reviewSchema);

module.exports = Review;
