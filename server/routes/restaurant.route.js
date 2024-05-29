// const authenticateToken = require("../authenticateToken")
const express = require("express");
const {
    restaurants,
    restaurantDetails,
    saveRestaurant,
    myFavouriteRestaurant,
    deleteFavRestaurant,
    getFavRestaurantById,
} = require("../controllers/restaurant.controller");



const router = express.Router();

// router.use(authenticateToken)

router.get("/restaurants", restaurants);
router.get("/favrestaurants", myFavouriteRestaurant );
router.delete("/favrestaurants/:_id", deleteFavRestaurant); 
router.get("/favrestaurants/:_id", getFavRestaurantById);
router.get("/:_id", restaurantDetails);
router.post("/:restaurantId/addFavRestaurant", saveRestaurant)



module.exports = router;