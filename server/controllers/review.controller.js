const Review = require("../models/reviewModel.js");
const Restaurant = require("../models/restaurantModel.js");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const cloudinary = require("../utils/cloudinary");
const multer = require("multer");

const review = async (req, res) => {
  try {
    const authHeader = req.headers.authorization; 
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
    const { _id, userId } = req.body;
    const review = await Review.findOne({ _id });

    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }
    const likedIndex = review.likedBy.indexOf(userId);
    if (likedIndex !== -1) {
      review.likedBy.splice(likedIndex, 1);
    } else {
      review.likedBy.push(userId);
    }

    await review.save();
    res.json({ message: "Review liked/unliked successfully", review });
  } catch (error) {
    console.error("Error liking review:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const updateReview = async (req, res) => {
  const reviewId = req.params._id;

  try {
    const review = await Review.findById(reviewId);

    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }

    const { rating, reviewDescription, image, agreeToTerms } = req.body;

    const imageData = req.file.path;
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

    await review.save();

    res.status(200).json({ message: "Review updated successfully" });
  } catch (error) {
    console.error("Error updating review:", error);
    res.status(500).json({ message: "Failed to update review" });
  }
};


// const updateAverageRating = async (req, res) => {
//   const { _id } = req.params; // Get restaurant ID from URL parameters
//   const { averageRating } = req.body; // Get averageRating from request body
//   console.log(_id);
//   console.log(averageRating);
//   try {
//     // Find the restaurant by ID and update its averageRating
//     const restaurant = await Restaurant.findByIdAndUpdate(
//       _id,
//       { averageRating },
//       { new: true }
//     );

//     // Respond with the updated restaurant object
//     res.json({ message: "Average rating updated successfully", restaurant });
//   } catch (error) {
//     console.error("Error updating average rating:", error);
//     res.status(500).json({ message: "Error updating average rating" });
//   }
// };
const edit = async (req, res) => {
  try {
    const reviewId = req.params.reviewId;
    const reviewData = await Review.findById(reviewId); // Example using Mongoose
    // If review data is found, send it as a response
    if (reviewData) {
      res.status(200).json(reviewData);
    } else {
      // If review data is not found, return a 404 error
      res.status(404).json({ message: "Review not found" });
    }
  } catch (error) {
    // If an error occurs, return a 500 error
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
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
  // updateAverageRating,
  edit,
};
