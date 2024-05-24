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
      mediaUrl,
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
      mediaUrl,
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

const uploadMediaReview = async (req, res, next) => {
  try {
    // Check if media file exists in the request
    if (!req.file) {
      return res
        .status(400)
        .json({ success: false, message: "No file uploaded" });
    }

    // Upload media to Cloudinary
    const uploadedMedia = await cloudinary.uploader.upload(req.file.path, {
      folder: "mediaUpload",
    });

    // Construct media URL from Cloudinary response
    const mediaUrl = uploadedMedia.secure_url;
    console.log(mediaUrl);
    // Return the media URL in the response
    res.status(200).json({
      success: true,
      message: "Media uploaded successfully",
      mediaUrl: mediaUrl,
    });
  } catch (error) {
    console.log(error);
    next(error);
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
    console.log(_id);
    const review = await Review.findByIdAndDelete(_id);
    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }
    res.json({ message: "Review deleted successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const likeReview = async (req, res) => {
  try {
    const storedUser = JSON.parse(localStorage.getItem("JomMakanUser"));
    const userId = storedUser.user.id;
    const reviewId = req.params._id;
    const review = await Review.findById(reviewId);

    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }
    console.log(review.likes);
    // Check if the user has already liked the review
    const likeIndex = review.likedBy.indexOf(userId);
    if (likeIndex === -1) {
      // If the user hasn't liked the review, add like
      review.likedBy.push(userId);
      review.likes += 1;
    } else {
      // If the user has already liked the review, remove like
      review.likedBy.splice(likeIndex, 1);
      review.likes -= 1;
    }

    // Save changes to the database
    await review.save();

    res.json({ likes: review.likes });
  } catch (error) {
    console.error("Error liking review:", error);
  }
};


module.exports = {
  review,
  reviews,
  // editReview,
  deleteReview,
  getReview,
  // uploadMediaReview,
  likeReview,
};
