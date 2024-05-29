//const authenticateToken = require("../authenticateToken")
const express = require("express");
const {
    workshops,
    workshopDetails,
    addFavouriteWorkshops,
    removeFavouriteWorkshops
} = require("../controllers/workshop.controller");


const router = express.Router();

router.get("/workshops", workshops);
//router.get("/workshop/:_id", workshopDetails); 
router.get("/:_id", workshopDetails); 
router.post("/:workshopId/addFavWorkshop", addFavouriteWorkshops);
router.delete("/:workshopId/removeFavWorkshop", removeFavouriteWorkshops);

module.exports = router;

/*
// routes/workshop.route.js
const express = require("express");
const router = express.Router();
const workshopController = require("../controllers/workshop.controller");

// Create a new workshop
router.post("/", workshopController.createWorkshop);

// Get all workshops
router.get("/", workshopController.getAllWorkshops);

// Get a single workshop by ID
router.get("/:id", workshopController.getWorkshopById);

// Update a workshop by ID
router.put("/:id", workshopController.updateWorkshop);

// Delete a workshop by ID
router.delete("/:id", workshopController.deleteWorkshop);

// Route to add a new workshop
router.post("/add", workshopController.addWorkshop);

module.exports = router;
*/
