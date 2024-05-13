// const authenticateToken = require("../authenticateToken")
const express = require("express");
const {
    restaurants,
    restaurantDetails,
    // fetchFavRestaurants,
    addFavouriteRestaurants
} = require("../controllers/restaurant.controller");



const router = express.Router();

// router.use(authenticateToken)

router.get("/restaurants", restaurants);
router.get("/:_id", restaurantDetails);
// router.get("/favRestaurants", fetchFavRestaurants);
router.post("/:restaurantId/addFavRestaurant", addFavouriteRestaurants)

module.exports = router;