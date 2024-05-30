// controllers/workshopController.js
const Workshop = require("../models/workshopModel");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

const workshops = async (req, res) => {
  try {
    // Get the current date
    const currentDate = new Date();

    // Find workshops with dates greater than the current date
    const upcomingWorkshops = await Workshop.find({ date: { $gt: currentDate } });

    // Respond with the filtered workshops
    res.json(upcomingWorkshops);
  } catch (error) {
    console.error("Error fetching workshops: ", error);
    res.status(500).json({ error: "Internal server error" });
  }
};


const workshopDetails = async (req, res) => {
  try {
    const workshop = await Workshop.findById(req.params._id);
    if (!workshop) {
      return res.status(404).json({ message: "Workshop not found" });
    }
    res.json(workshop);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const addFavouriteWorkshops = async (req, res) => {
  const { workshopId } = req.params;
  if (!workshopId) {
    return res.status(400).json({ message: "workshopId is missing in the request body" });
  }

  try {
    const token = req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.userId;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.favWorkshops.some(fav => fav.favWorkshopId.equals(workshopId))) {
      return res.status(400).json({ message: "Workshop is already in favorites" });
    }

    user.favWorkshops.push({ favWorkshopId: workshopId });
    await user.save();

    res.status(201).json({ message: "Workshop added to favorites" });
  } catch (err) {
    console.error("Error adding workshop to favorites: ", err);
    res.status(500).json({ message: "Failed to add workshop to favorites" });
  }
};

const removeFavouriteWorkshops = async (req, res) => {
  const { workshopId } = req.params;
  if (!workshopId) {
    return res.status(400).json({ message: "workshopId is missing in the request body" });
  }

  try {
    const token = req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.userId;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.favWorkshops = user.favWorkshops.filter(fav => !fav.favWorkshopId.equals(workshopId));
    await user.save();

    res.status(200).json({ message: "Workshop removed from favorites" });
  } catch (err) {
    console.error("Error removing workshop from favorites: ", err);
    res.status(500).json({ message: "Failed to remove workshop from favorites" });
  }
};

module.exports = {
  workshops,
  workshopDetails,
  addFavouriteWorkshops,
  removeFavouriteWorkshops
};
