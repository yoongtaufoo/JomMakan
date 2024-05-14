const Workshop = require("../models/workshopModel.js");
const {User} = require("../models/userModel");
const jwt = require("jsonwebtoken");

const workshops = async (req, res) => {
  try{
    const workshops = await Workshop.find(); //Query all workshops
    res.json(workshops); //Send JSON response
  } catch(error){
    console.error("Error fetching restaurants: ", error);
    res.status(500).json({error: "Internal server error" }); //Send error response
  }
}

const workshopDetails = async (req, res) => {
  try{
    const workshop = await Workshop.findById({"_id": req.params._id})
    if (!workshop){
      return res.status(404).json({message: "Workshop not found"});
    } 
    res.json(workshop)
  } catch(error){
    console.error(error)
    res.status(500).json({message: "Internal server error"})
  }
}

const addFavouriteWorkshops = async (req, res) => {
  const favWorkshopId = req.params.workshopId;
  console.log(req.params)
  console.log(req.params.value)
  console.log(req.params.workshopId)
  console.log("Request body:", req.body);
    console.log("Saving workshop...");
    if(!favWorkshopId){
      return res.status(400).json({message: "favWorkshopId is missing in the request body"});
    }

    try{
      //Get token
      const authHeader = req.headers.authorization;
      const token = JSON.parse(authHeader);

      //Get the userId from the decoded token
      const userId = token.user._id;
      console.log(userId)

      //Find user by userId
      const user = await User.findById(userId);

      if (!user){
        return res.status(404).json({message: "User not found"});
      }
      
      //Add the new reservation to the user's reservations array
      user.favWorkshops.push({
        favWorkshopId: favWorkshopId
      });

      //Save the updated user object with the new reservation
      await user.save();
      
      res.status(201).json({message: "Workshop saved successfully"});
    } catch (err) {
      console.error("Error saving workshop: ", err);
      res.status(500).json({message: "Failed to save workshop"});
    }
}

module.exports = {
  workshops,
  workshopDetails,
  addFavouriteWorkshops
};
/*
// Create a new workshop
exports.createWorkshop = async (req, res) => {
  try {
    const workshop = await Workshop.create(req.body);
    res.status(201).json({ success: true, data: workshop });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

// Get all workshops
exports.getAllWorkshops = async (req, res) => {
  try {
    const workshops = await Workshop.find();
    res.status(200).json({ success: true, data: workshops });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// Get a single workshop by ID
exports.getWorkshopById = async (req, res) => {
  try {
    const workshop = await Workshop.findById(req.params.id);
    if (!workshop) {
      return res.status(404).json({ success: false, error: "Workshop not found" });
    }
    res.status(200).json({ success: true, data: workshop });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// Update a workshop by ID
exports.updateWorkshop = async (req, res) => {
  try {
    const workshop = await Workshop.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!workshop) {
      return res.status(404).json({ success: false, error: "Workshop not found" });
    }
    res.status(200).json({ success: true, data: workshop });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// Delete a workshop by ID
exports.deleteWorkshop = async (req, res) => {
  try {
    const workshop = await Workshop.findByIdAndDelete(req.params.id);
    if (!workshop) {
      return res.status(404).json({ success: false, error: "Workshop not found" });
    }
    res.status(200).json({ success: true, data: {} });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// Function to add a new workshop
exports.addWorkshop = async (req, res) => {
  try {
    const workshop = new Workshop(req.body);
    await workshop.save();
    res.status(201).send("Workshop added successfully");
  } catch (error) {
    res.status(400).send(error.message);
  }
};
*/