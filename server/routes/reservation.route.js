const express = require("express");
const {
    reserve,
    reservations
} = require("../controllers/reservation.controller.js");

const router = express.Router();

router.post("/reserve", reserve);
router.get("/reservations", reservations);

module.exports = router;
