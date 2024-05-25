const Review = require("../models/reviewModel.js");
const Restaurant = require("../models/restaurantModel.js");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const cloudinary = require("../utils/cloudinary");

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
      media,
      agreeToTerms,
      likeCount,
      likedBy
    } = req.body;

    const newReview = new Review({
      user_id: userId,
      restaurant_id,
      userName,
      rating,
      timePosted,
      reviewDescription,
      media,
      agreeToTerms,
      likeCount,
      likedBy
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
    reviews.sort((a, b) => new Date(b.timePosted) - new Date(a.timePosted));

    res.json(reviews);
  } catch (err) {
    console.error("Error fetching reviews:", err);
    res.status(500).json({ message: "Failed to fetch reviews" });
  }
};


const deleteReview = async (req, res) => {
  const { reviewId } = req.params;

  try {
    const review = await Review.findByIdAndDelete(reviewId);

    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }

    res.json({ message: "Review deleted successfully" });
  } catch (error) {
    console.error("Error deleting review:", error);
    res.status(500).json({ message: "Failed to delete review" });
  }
};



const likeReview = async (req, res) => {
  try {
    const userId = req.user.id;
    const reviewId = req.params._id;
    console.log(reviewId);
    const review = await Review.findOne({ _id: reviewId });

    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }

    if (review.likedBy.includes(userId)) {
      review.likedBy.pop(userId);
      review.likeCount -= 1;
    } else {
      review.likedBy.push(userId);
      review.likeCount += 1;
    }

    await review.save();
    res.json({ message: "Review liked/unliked successfully", review });
  } catch (error) {
    console.error("Error liking review:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};




module.exports = {
  review,
  reviews,
  // editReview,
  deleteReview,
  getReview,
  likeReview,
};
