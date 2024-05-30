const Review = require("../models/reviewModel.js");
const Restaurant = require("../models/restaurantModel.js");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const cloudinary = require("../utils/cloudinary");
const multer = require("multer");

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
      image,
      reviewDescription,
      agreeToTerms,
    } = req.body;

    if (!req.file) {
      throw new Error("No file uploaded");
    }

    const imageData = req.file.path;

    const newImage = await cloudinary.uploader.upload(imageData, {
      folder: "mediaUpload",
    });

    // Create new review
    const newReview = new Review({
      user_id: userId,
      restaurant_id,
      userName,
      rating,
      media: {
        public_id: newImage.public_id,
        url: newImage.secure_url,
      },
      timePosted,
      reviewDescription,
      agreeToTerms,
    });

    // Save review to database
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

const shareReview = async (req, res) => {
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
      // likeCount,
      likedBy,
    } = req.body;

    const restaurant = await Restaurant.findById(restaurant_id);

    const reviewData = {
      restaurantName: restaurant.name,
      restaurant_id: _id,
      rating,
      reviewDescription,
    };

    res.json(reviewData);
  } catch (error) {
    res.status(500).send(error.message);
  }
};
const getReview = async (req, res) => {
  try {
    // const { _id } = req.params;
    // const authHeader = req.headers.authorization;
    // const token = JSON.parse(authHeader);
    // const userId = token.user._id;
    const restaurantId = req.params._id;
    console.log(restaurantId);
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
  const { _id } = req.params;
  console.log(_id);
  try {
    const review = await Review.findOneAndDelete({ _id });
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
    // const userId = req.user.id;
    // console.log("user: " + req.user);
    // console.log(userId);
    const { _id, userId } = req.body;
    console.log(_id, userId);
    // Find the review by its ID
    const review = await Review.findOne({ _id });
    console.log("Review found:", review);
    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }
    const likedIndex = review.likedBy.indexOf(userId);
    console.log("likedIndex: " + likedIndex);
    if (likedIndex !== -1) {
      // User has already liked the review, remove the like
      review.likedBy.splice(likedIndex, 1);
    } else {
      // User has not liked the review, add the like
      review.likedBy.push(userId);
    }

    // Save the updated review
    await review.save();

    // Send response
    res.json({ message: "Review liked/unliked successfully", review });
  } catch (error) {
    console.error("Error liking review:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const updateReview = async (req, res) => {
  // const reviewId = req.params._id;
  // console.log(reviewId);
  // const { rating, reviewDescription, media, agreeToTerms } = req.body;

  // try {
  //   const review = await Review.findById(reviewId);

  //   if (!review) {
  //     return res.status(404).json({ message: "Review not found" });
  //   }

  // review.rating = rating;
  // review.reviewDescription = reviewDescription;
  // review.media = media;
  // review.agreeToTerms = agreeToTerms;
  // review.timePosted = new Date();
  // console.log(media);
  // await review.save();

  //   res.status(200).json({ message: "Review updated successfully", review });
  // } catch (error) {
  //   res.status(500).json({ message: "Error updating review", error });
  // }

  const reviewId = req.params._id;
  // console.log(reviewId);

  const review = await Review.findById(reviewId);

  if (!review) {
    return res.status(404).json({ message: "Review not found" });
  }

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
      image,
      reviewDescription,
      agreeToTerms,
    } = req.body;

    // if (!req.file) {
    //   throw new Error("No file uploaded");
    // }

    const imageData = req.file.path;

    // const imageData = image;
    console.log("imageData: ", imageData);
    console.log("req.file: ", req.file);

    // const imageData = req.file?.path || req.body.image; // Check for file path or image URL
    if (!imageData) {
      return res.status(400).json({ message: "Image data is required" });
    }
    console.log("imageData: ", imageData);

    const newImage = await cloudinary.uploader.upload(imageData, {
      folder: "mediaUpload",
    });

    review.rating = rating;
    review.reviewDescription = reviewDescription;
    review.media = {
      public_id: newImage.public_id,
      url: newImage.secure_url,
    };
    review.agreeToTerms = agreeToTerms;
    review.timePosted = new Date();
    // console.log(media);

    // save current review
    await review.save();

    res.status(201).json({ message: "Review updated successfully" });
  } catch (err) {
    console.error("Error updating review:", err);
    res.status(500).json({ message: "Failed to update review" });
  }
};

module.exports = {
  review,
  reviews,
  deleteReview,
  getReview,
  likeReview,
  updateReview,
  shareReview,
};
