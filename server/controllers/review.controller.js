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
      // likeCount,
      likedBy,
    } = req.body;

    console.log(req.body);

    const newReview = new Review({
      user_id: userId,
      restaurant_id,
      userName,
      rating,
      timePosted,
      reviewDescription,
      media,
      agreeToTerms,
      // likeCount:0,
      likedBy,
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
// const uploadMedia = async (req, res, next) => {
//   try {
//     const { userId } = req.params;
//     const currentUser = await User.findOne({ _id: userId });

//     // console.log(currentUser);

//     //build the data object
//     let data = { public_id: "", url: "" };

//     //modify image conditionnally
//     if (req.body.image !== "") {
//       //   const ImgId = currentUser.image.public_id;
//       const ImgId = currentUser?.image?.public_id;

//       if (ImgId) {
//         await cloudinary.uploader.destroy(ImgId);
//       }

//       const newImage = await cloudinary.uploader.upload(req.body.image, {
//         folder: "uploadMedia",
//         // width: 1000,
//         // crop: "scale",
//       });

//       data = {
//         public_id: newImage.public_id,
//         url: newImage.secure_url,
//       };
//     }

//     // Save the updated user
//     await currentUser.save();

//     res.status(200).json({
//       success: true,
//     });
//   } catch (error) {
//     console.log(error);
//     next(error);
//   }
// };

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
    const userId = req.user.id;
    console.log(userId);
    const { _id } = req.params;
    console.log(_id);

    // Find the review by its ID
    const review = await Review.findOne({ _id });
    console.log("Review found:", review);

    // Check if the user has already liked the review
    const likedIndex = review.likedBy.indexOf(userId);

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
  const reviewId = req.params._id;

  const { rating, reviewDescription, media, agreeToTerms } = req.body;

  try {
    const review = await Review.findById(reviewId);

    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }

    review.rating = rating;
    review.reviewDescription = reviewDescription;
    review.media = media;
    review.agreeToTerms = agreeToTerms;
    review.timePosted = new Date();

    await review.save();

    res.status(200).json({ message: "Review updated successfully", review });
  } catch (error) {
    res.status(500).json({ message: "Error updating review", error });
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
