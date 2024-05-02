const express = require("express");
const {
    reserve,
    getUpcomingReservations
    // reservations,
} = require("../controllers/reservation.controller.js");

const router = express.Router();

router.post("/reserve", reserve);
router.get("/reservations", getUpcomingReservations);
// router.post("/reservations", reservations);


module.exports = router;
