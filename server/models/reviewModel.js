const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, required: true },
    restaurant_id: { type: mongoose.Schema.Types.ObjectId, required: true },
    // userName: { type: String, required: true },
    rating: { type: Number, required: true },
    timePosted: { type: Date, required: true },
    reviewDescription: { type: String, required: true },
    mediaUrl: { type: String },
    agreeToTerms: { type: Boolean, required: true },
    likeCount: { type: Number, default: 0 },
    shareCount: { type: Number, default: 0 }
    
});

const Review = mongoose.model("reviews", reviewSchema);

module.exports = Review;