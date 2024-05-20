const Review = require("../models/reviewModel.js");
const Restaurant = require("../models/restaurantModel.js");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

const reviews = async (req, res) => {
    try {
      const review = await Review.find(); 
      res.json(review); 
    } catch (error) {
      console.error("Error fetching restaurants:", error);
      res.status(500).json({ error: "Internal server error" }); 
    }
  }

const editReview = async (req, res) => {
    try {
        const { id } = req.params;
        const review = await Review.findByIdAndUpdate(id, req.body, { new: true });
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
        const { id } = req.params;
        const review = await Review.findByIdAndDelete(id);
        if (!review) {
            return res.status(404).json({ message: 'Review not found' });
        }
        res.json({ message: 'Review deleted successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const getReviews = async (req, res) => {
    try {
        const { restaurantId } = req.params;
        const reviews = await Review.find({ restaurant_id: restaurantId });
        res.json(reviews);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};



module.exports = {
reviews, editReview, deleteReview, getReviews
 
};