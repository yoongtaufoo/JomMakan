const express = require("express");
const {
  workshops,
  workshopDetails,
  saveWorkshop,
  myFavouriteWorkshop,
  deleteFavWorkshop,
  getFavWorkshopById,
} = require("../controllers/workshop.controller");

const router = express.Router();

router.get("/workshops", workshops);
router.get("/:_id", workshopDetails);
router.get("/favworkshops", myFavouriteWorkshop);
router.delete("/favworkshops/:_id", deleteFavWorkshop);
router.get("/favworkshops/:_id", getFavWorkshopById);
router.post("/:workshopId/addFavWorkshop", saveWorkshop);

module.exports = router;
