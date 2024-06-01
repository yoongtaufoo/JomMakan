const Workshop = require("../models/workshopModel");
const favWorkshop = require("../models/favWorkshopModel.js")
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

const myFavouriteWorkshop = async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      console.log("Authorization token not provided");
      return res.status(401).json({ message: "Authorization token not provided" });
    }

    const token = authHeader.split(' ')[1]; // Extract token from "Bearer <token>"
    let decoded;
    try {
      decoded = jwt.verify(token, 'your_jwt_secret'); // Use your secret key
      console.log("Decoded token:", decoded);
    } catch (err) {
      console.log("Error decoding token:", err);
      return res.status(401).json({ message: "Invalid token" });
    }

    const userId = decoded.userId;
    console.log("Fetching saved workshops for user:", userId);

    const savedWorkshops = await FavWorkshop.find({ user_id: userId });
    console.log("Found saved workshops:", savedWorkshops);

    res.json(savedWorkshops);
  } catch (err) {
    console.error("Error fetching favourite workshops:", err);
    res.status(500).json({ message: "Failed to fetch favourite workshops" });
  }
};

const workshopDetails = async (req, res) => {
  try {
    const workshopId = req.params.id; // This is where we get the workshop ID from the URL
    console.log("Fetching details for workshop ID:", workshopId);

    const workshop = await Workshop.findById(workshopId);
    if (!workshop) {
      return res.status(404).json({ message: "Workshop not found" });
    }

    res.json(workshop);
  } catch (err) {
    console.error("Error fetching workshop details:", err);
    res.status(500).json({ message: "Failed to fetch workshop details" });
  }
};

const workshops = async (req, res) => {
  try {
    const workshops = await Workshop.find();
    res.json(workshops);
  } catch (error) {
    console.error("Error fetching workshops: ", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

/*
const workshopDetails = async (req, res) => {
  try {
    const workshop = await Workshop.findById(req.params._id);
    if (!workshop) {
      return res.status(404).json({ message: "Workshop not found" });
    }

    const authHeader = req.headers.authorization; //Get token
    if (!authHeader){
      console.log("No token provided");
      return res.json({ workshop }); //Return workshop details without isSaved flag
    }
    const token = JSON.parse(authHeader)
    console.log("Authorization Header:", token);

    if (!token){
      console.log("No token provided");
      return res.json({ workshop });// Return workshop details without isSaved flag
    }

    const userId = token.user._id
    const savedWorkshop = await favWorkshop.findOne({ user_id: userId, workshop_id: req.params._id });
    const isSaved = !!savedWorkshop;

    console.log("isSaved:", isSaved);
    console.log("Workshop:", workshop);

    //include the isSaved flag in the response
    return res.json({ workshop, isSaved });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
*/

// POST add favourite workshop
const saveWorkshop = async (req, res) => {
  const {
    workshopName,
    workshopDescription,
    phoneNumber,
    address,
    time,
    date,
    availableSlot,
    photoLink,
    workshop_id,  
  } = req.body;

  try {
    const authHeader = req.headers.authorization; // Get token
    const token = JSON.parse(authHeader);

    const userId = token.user._id; // Get the userId from the decoded token
    console.log(userId)

    // Create a new favourite restaurant to db
    const newFavWorkshop = new favWorkshop({
      workshopName,
      workshopDescription,
      phoneNumber,
      address,
      time,
      date,
      availableSlot,
      photoLink,
      workshop_id,
      user_id: userId,
    });
    await newFavWorkshop.save();

    res.status(201).json({ message: "Workshop created successfully" });
  } catch (err) {
    console.error("Error creating workshop:", err);
    res.status(500).json({ message: "Failed to create workshop" });
  }
};

/*
const myFavouriteWorkshop = async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      console.log("Authorization token not provided");
      return res.status(401).json({ message: "Authorization token not provided" });
    }

    const token = authHeader;
    let decoded;
    try {
      decoded = jwt.verify(token, 'your_jwt_secret'); // Use your secret key
      console.log("Decoded token:", decoded);
    } catch (err) {
      console.log("Error decoding token:", err);
      return res.status(401).json({ message: "Invalid token" });
    }

    const userId = decoded.userId;
    console.log("Fetching saved workshops for user:", userId);

    const savedWorkshops = await FavWorkshop.find({ user_id: userId });
    console.log("Found saved workshops:", savedWorkshops);

    res.json(savedWorkshops);
  } catch (err) {
    console.error("Error fetching favourite workshops:", err);
    res.status(500).json({ message: "Failed to fetch favourite workshops" });
  }
};

// Get fav workshop
const myFavouriteWorkshop = async (req, res) => {
  try {
    const authHeader = req.headers.authorization; // Get token
    const token = JSON.parse(authHeader);

    const userId = token.user._id; // Get the userId from the decoded token

    const saved = await favWorkshop.find({ user_id: userId }); // Find saved workshop with user_id = userId
    console.log(saved)

    res.json(saved); // Send sorted saved workshop array as response
    
  } catch (err) {
    console.error("Error fetching favourite workshop:", err);
    res.status(500).json({ message: "Failed to fetch favourite workshop" });
  }
};
*/

// Delete the favorite workshop
const deleteFavWorkshop = async (req, res) => {
  try {

    const deleted = await favWorkshop.findByIdAndDelete({"_id": req.params._id});
    if (!deleted) {
      return res.status(404).json({ message: "Favorite workshop not found" });
    }

    res.json({ message: "Favorite workshop removed successfully" }); // Send a success message as response
  } catch (err) {
    console.error("Error deleting favourite workshop:", err);
    res.status(500).json({ message: "Failed to delete favourite workshop" });
  }
};

const getFavWorkshopById = async (req, res) => {
  try {

    const authHeader = req.headers.authorization; // Get token
    const token = JSON.parse(authHeader);

    const userId = token.user._id;

    const workshop = await favWorkshop.findOne({ "workshop_id": req.params._id, user_id: userId });
    if (!workshop) {
      return res.status(404).json({ message: "Favorite workshop not found" });
    }
    return res.status(200).json(workshop);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }

};

const getSavedWorkshops = async (req, res) => {
  try {
    const userId = req.params.userId; // Extract user ID from request parameters
    console.log("Fetching saved workshops for user:", userId);

    // Query the database for workshops saved by the user
    const savedWorkshops = await FavWorkshop.find({ user_id: userId });
    console.log("Found saved workshops:", savedWorkshops);

    res.json(savedWorkshops); // Send the saved workshops as JSON response
  } catch (error) {
    console.error("Error fetching saved workshops:", error);
    res.status(500).json({ message: "Failed to fetch saved workshops" });
  }
};


module.exports = {
  workshops,
  workshopDetails,
  saveWorkshop,
  myFavouriteWorkshop,
  deleteFavWorkshop,
  getFavWorkshopById,
  getSavedWorkshops
};

