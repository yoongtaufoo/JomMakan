
const Restaurant = require("../models/restaurantModel.js")
const favRestaurant = require("../models/favRestaurantModel.js")
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
  }


  // const restaurantDetails = async(req, res) =>{
  //   try{
  //     const restaurant = await Restaurant.findById({"_id": req.params._id})
  //     if (!restaurant) {
  //       return res.status(404).json({ message: "Restaurant not found" });
  //     }

  //     const authHeader = req.headers.authorization; // Get token
  //     const token = JSON.parse(authHeader);
  
  //     const userId = token.user._id;
  //     const isSaved = await favRestaurant.exists({ user_id: userId, restaurant_id: req.params._id });

  //   // Include the isSaved flag in the response
  //   res.json({ restaurant, isSaved });
  //     // res.json(restaurant)
  //   }catch(error){
  //     console.error(error)
  //     res.status(500).json({message: "Internal server error"})
  //   }
  // }

  const restaurantDetails = async (req, res) => {
    try {
      const restaurant = await Restaurant.findById(req.params._id);
      if (!restaurant) {
        return res.status(404).json({ message: "Restaurant not found" });
      }
  
      // const token = req.headers.authorization; // Get the token from the authorization header
      const authHeader = req.headers.authorization; // Get token
      if (!authHeader) {
        console.log("No token provided");
        return res.json({ restaurant }); // Return restaurant details without isSaved flag
      }
      const token = JSON.parse(authHeader)
      console.log("Authorization Header:", token);
  
      if (!token) {
        console.log("No token provided");
        return res.json({ restaurant }); // Return restaurant details without isSaved flag
      }
  
      // const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
      // const userId = decodedToken.user._id;
      const userId = token.user._id
  
      const savedRestaurant = await favRestaurant.findOne({ user_id: userId, restaurant_id: req.params._id });
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
  

// const checkFavourites = async (req, res) => {
//   try {
//     const restaurantId = req.params._id;
//     const token = req.headers.authorization;

//     if (!token) {
//       return res.status(401).json({ message: "Unauthorized" });
//     }

//     const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
//     const userId = decodedToken.user._id;

//     // Find if the restaurant is saved in the user's favorite list
//     const savedRestaurant = await FavRestaurant.findOne({ user_id: userId, restaurant_id: restaurantId });
//     console.log(savedRestaurant); // Logs the document or null
//     const isSaved = !!savedRestaurant;
//     console.log(isSaved); // Logs true or false

//     return res.json({ isSaved });
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({ message: "Internal server error" });
//   }
// }

  

  


// POST reservation
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
    restaurant_id
    
  } = req.body;

  try {
    const authHeader = req.headers.authorization; // Get token
    const token = JSON.parse(authHeader);

    const userId = token.user._id; // Get the userId from the decoded token
    console.log(userId)

    // Create a new user ans dave to db
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
      // restaurant_id: mongoose.Types.ObjectId(restaurant_id), // Ensure this is an ObjectId
      // user_id: mongoose.Types.ObjectId(userId)
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
    // const saved = await favRestaurant.find({ user_id: mongoose.Types.ObjectId(userId) });
    console.log(saved)

    res.json(saved); // Send sorted reservations array as response
    
  } catch (err) {
    console.error("Error fetching favourite restaurant:", err);
    res.status(500).json({ message: "Failed to fetch favourite restaurant" });
  }
};

const deleteFavRestaurant = async (req, res) => {
  try {

    
    // const  id  = req.params.id;

    // Delete the favorite restaurant
    const deleted = await favRestaurant.findByIdAndDelete({"_id": req.params._id});
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
    // const  _id  = req.params._id;
    // const token = req.headers.authorization;
    // const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    // const userId = decodedToken.user._id;

    const authHeader = req.headers.authorization; // Get token
    const token = JSON.parse(authHeader);

    const userId = token.user._id;

    const restaurant = await favRestaurant.findOne({ "restaurant_id": req.params._id, user_id: userId });
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
  // fetchFavRestaurants,
  // addFavouriteRestaurants
  saveRestaurant,
  myFavouriteRestaurant ,
  // cancel,
  deleteFavRestaurant,
  getFavRestaurantById,
  // checkFavourites
  // checkIsSaved
  
 
};
