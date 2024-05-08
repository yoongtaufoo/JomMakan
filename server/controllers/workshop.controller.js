const Workshop = require("../models/workshopModel");

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
