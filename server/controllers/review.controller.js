const Review = require("../models/reviewModel.js");
const Restaurant = require("../models/restaurantModel.js");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const review = async (req, res) => {
    try{
    const authHeader = req.headers.authorization; // Get token
    const token = JSON.parse(authHeader);
    const userId = token.user._id;
    const {
      restaurant_id,
    //   userName,
      rating,
      timePosted,
      reviewDescription,
      mediaUrl,
      agreeToTerms,
      likeCount,
      shareCount
  } = req.body;
  
    const newReview = new Review({
      user_id:userId,
      restaurant_id,
    //   userName,
      rating,
      timePosted,
      reviewDescription,
      mediaUrl,
      agreeToTerms,
      likeCount,
      shareCount
    });
    await newReview.save();

    res.status(201).json({ message: "Review submitted successfully" });
  } catch (err) {
    console.error("Error creating review:", err);
    res.status(500).json({ message: "Failed to create review" });
  }
};

// Get reservations
const myreview = async (req, res) => {
  try {
    const authHeader = req.headers.authorization; // Get token
    const token = JSON.parse(authHeader);

    const userId = token.user._id; // Get the userId from the decoded token

    const reviews = await Review.find({ user_id: userId }); // Find reservations with user_id = userId


    reviews.forEach(async (review) => {
        await review.save(); // Save the changes
    });

    res.json(reviews); // Send sorted reservations array as response
    
  } catch (err) {
    console.error("Error fetching reviews:", err);
    res.status(500).json({ message: "Failed to fetch reviews" });
  }
};

// const addReview = async (req, res) => {
//     try {
//         console.log(_id);
//         const review = await Review.create(req.body);
//         res.json(review); 
//     } catch (error) {
//         console.error("Error adding reviews:", error);
//         res.status(500).json({ error: "Internal server error" }); 
//     }
// };

const editReview = async (req, res) => {
    try {
        const { _id } = req.params; 
        const review = await Review.findByIdAndUpdate(_id, req.body, { new: true });
        if (!review) {
            return res.status(404).json({ message: 'Review not found' });
        }
        res.json({ message: 'Review updated successfully', review });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const deleteReview = async (req, res) => {
    try {
        const { _id } = req.params; 
        const review = await Review.findByIdAndDelete(_id);
        if (!review) {
            return res.status(404).json({ message: 'Review not found' });
        }
        res.json({ message: 'Review deleted successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const getReview = async (req, res) => {
    try {
        const { restaurantId } = req.params; 
        const reviews = await Review.find({ restaurant_id: restaurantId });
        res.json(reviews);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = {
    review,
    myreview,
    editReview,
    deleteReview,
    getReview
};
