const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
  // review_id: { type: mongoose.Schema.Types.ObjectId, required: true },
  user_id: { type: mongoose.Schema.Types.ObjectId, required: true },
  restaurant_id: { type: mongoose.Schema.Types.ObjectId, required: true },
  userName: { type: String, required: true },
  rating: { type: Number, required: true },
  media: { type: String, default: "" },
  timePosted: { type: Date, required: true },
  reviewDescription: { type: String, required: true },
  agreeToTerms: { type: Boolean, required: true },
  // likeCount: { type: Number, default: 0 },
  likedBy: {
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],  },
});

const Review = mongoose.model("reviews", reviewSchema);

module.exports = Review;