const Restaurant = require("../models/restaurantModel.js");
const favRestaurant = require("../models/favRestaurantModel.js");
// const User = require("../models/userModel");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

const restaurants = async (req, res) => {
  try {
    const restaurants = await Restaurant.find(); // Query all restaurants
    res.json(restaurants); // Send JSON response
  } catch (error) {
    console.error("Error fetching restaurants:", error);
    res.status(500).json({ error: "Internal server error" }); // Send error response
  }
};

const restaurantDetails = async (req, res) => {
  try {
    const restaurant = await Restaurant.findById(req.params._id);
    if (!restaurant) {
      return res.status(404).json({ message: "Restaurant not found" });
    }

    const authHeader = req.headers.authorization; // Get token
    if (!authHeader) {
      // console.log("No token provided");
      return res.json({ restaurant }); // Return restaurant details without isSaved flag
    }
    const token = JSON.parse(authHeader);
    console.log("Authorization Header:", token);

    if (!token) {
      // console.log("No token provided");
      return res.json({ restaurant }); // Return restaurant details without isSaved flag
    }

    const userId = token.user._id;

    const savedRestaurant = await favRestaurant.findOne({
      user_id: userId,
      restaurant_id: req.params._id,
    });
    const isSaved = !!savedRestaurant;

    console.log("isSaved:", isSaved);
    console.log("Restaurant:", restaurant);

    // Include the isSaved flag in the response
    return res.json({ restaurant, isSaved });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// POST add favourite restaurant
const saveRestaurant = async (req, res) => {
  const {
    name,
    description,
    location,
    address,
    phone,
    openinghours,
    cuisine,
    image,
    foodImage,
    status,
    restaurant_id,
  } = req.body;

  try {
    const authHeader = req.headers.authorization; // Get token
    const token = JSON.parse(authHeader);

    const userId = token.user._id; // Get the userId from the decoded token
    console.log(userId);

    // Create a new favourite restaurant to db
    const newFavRestaurant = new favRestaurant({
      name,
      description,
      location,
      address,
      phone,
      openinghours,
      cuisine,
      image,
      foodImage,
      status,
      restaurant_id,
      user_id: userId,
    });
    await newFavRestaurant.save();

    res.status(201).json({ message: "Restaurant created successfully" });
  } catch (err) {
    console.error("Error creating restaurant:", err);
    res.status(500).json({ message: "Failed to create restaurant" });
  }
};

// Get fav restaurants
const myFavouriteRestaurant = async (req, res) => {
  try {
    const authHeader = req.headers.authorization; // Get token
    const token = JSON.parse(authHeader);

    const userId = token.user._id; // Get the userId from the decoded token

    const saved = await favRestaurant.find({ user_id: userId }); // Find reservations with user_id = userId
    console.log(saved);

    res.json(saved); // Send sorted reservations array as response
  } catch (err) {
    console.error("Error fetching favourite restaurant:", err);
    res.status(500).json({ message: "Failed to fetch favourite restaurant" });
  }
};

// Delete the favorite restaurant
const deleteFavRestaurant = async (req, res) => {
  try {
    const deleted = await favRestaurant.findByIdAndDelete({
      _id: req.params._id,
    });
    if (!deleted) {
      return res.status(404).json({ message: "Favorite restaurant not found" });
    }

    res.json({ message: "Favorite restaurant removed successfully" }); // Send a success message as response
  } catch (err) {
    console.error("Error deleting favourite restaurant:", err);
    res.status(500).json({ message: "Failed to delete favourite restaurant" });
  }
};

const getFavRestaurantById = async (req, res) => {
  try {
    const authHeader = req.headers.authorization; // Get token
    const token = JSON.parse(authHeader);

    const userId = token.user._id;

    const restaurant = await favRestaurant.findOne({
      restaurant_id: req.params._id,
      user_id: userId,
    });
    if (!restaurant) {
      return res.status(404).json({ message: "Favorite restaurant not found" });
    }
    return res.status(200).json(restaurant);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  restaurants,
  restaurantDetails,
  saveRestaurant,
  myFavouriteRestaurant,
  deleteFavRestaurant,
  getFavRestaurantById,
};
