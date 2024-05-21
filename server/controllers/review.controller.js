const Review = require("../models/reviewModel.js");
const Restaurant = require("../models/restaurantModel.js");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const review = async (req, res) => {
  try {
    const authHeader = req.headers.authorization; // Get token
    const token = JSON.parse(authHeader);
    const userId = token.user._id;
    const user = await User.findById(userId);
    const userName = user.username;
    
    const {
      restaurant_id,
      rating,
      timePosted,
      reviewDescription,
      mediaUrl,
      agreeToTerms,
      likeCount,
      shareCount,
    } = req.body;

    const newReview = new Review({
      user_id: userId,
      restaurant_id,
        userName,
      rating,
      timePosted,
      reviewDescription,
      mediaUrl,
      agreeToTerms,
      likeCount,
      shareCount,
    });
    await newReview.save();

    res.status(201).json({ message: "Review submitted successfully" });
  } catch (err) {
    console.error("Error creating review:", err);
    res.status(500).json({ message: "Failed to create review" });
  }
};
const reviews = async (req, res) => {
  try {
    const reviews = await Restaurant.find();
    res.json(reviews); // Send JSON response
  } catch (error) {
    console.error("Error fetching reviews:", error);
    res.status(500).json({ error: "Internal server error" }); // Send error response
  }
};
const getReview = async (req, res) => {
  try {
    // const { _id } = req.params;
    // const authHeader = req.headers.authorization;
    // const token = JSON.parse(authHeader);
    // const userId = token.user._id;
    const restaurantId = req.params._id;
    const reviews = await Review.find({ restaurant_id: restaurantId });
    // console.log(reviews);
    if (!reviews) {
      return res.status(404).json({ message: "Review not found" });
    }
    res.json(reviews); // Send sorted reservations array as response
  } catch (err) {
    console.error("Error fetching reviews:", err);
    res.status(500).json({ message: "Failed to fetch reviews" });
  }
};

const editReview = async (req, res) => {
  try {
    const { _id } = req.params;
    const review = await Review.findByIdAndUpdate(_id, req.body, { new: true });
    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }
    res.json({ message: "Review updated successfully", review });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteReview = async (req, res) => {
  try {
    const { _id } = req.params;
    const review = await Review.findByIdAndDelete(_id);
    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }
    res.json({ message: "Review deleted successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  review,
  reviews,
  editReview,
  deleteReview,
  getReview,
};
